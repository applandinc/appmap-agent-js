import Format from "./format.mjs";
import Exclude from "./exclude.mjs";

const { stringify } = JSON;
const _String = String;
const { isArray } = Array;
const _Map = Map;

const nameable = new _Map([
  ["ObjectExpression", "object"],
  ["ClassExpression", "class"],
  ["ClassDeclaration", "class"],
  ["FunctionExpression", "function"],
  ["FunctionDeclaration", "function"],
  ["ArrowFunctionExpression", "arrow"],
]);

export default (dependencies) => {
  const {
    util: { assert, incrementCounter, coalesce },
  } = dependencies;

  const { parseQualifiedName, stringifyQualifiedName } = Format(dependencies);
  const { createExclusion, isExcluded } = Exclude(dependencies);

  const getKeyName = (node) => {
    if (node.computed) {
      return "<computed>";
    }
    if (node.key.type === "Literal") {
      return stringify(_String(node.key.value));
    }
    return node.key.name;
  };

  const getEnvironmentName = (counter, lineage) => {
    if (lineage !== null) {
      if (
        lineage.head.type === "FunctionDeclaration" ||
        lineage.head.type === "ClassDeclaration"
      ) {
        return coalesce(lineage.head.id, "name", "default");
      }
      if (
        lineage.tail !== null &&
        lineage.tail.head.type === "AssignmentExpression" &&
        lineage.tail.head.operator === "=" &&
        lineage.tail.head.right === lineage.head &&
        lineage.tail.head.left.type === "Identifier"
      ) {
        return lineage.tail.head.left.name;
      }
      if (
        lineage.tail !== null &&
        lineage.tail.head.type === "VariableDeclarator" &&
        lineage.tail.head.init === lineage.head &&
        lineage.tail.head.id.type === "Identifier"
      ) {
        return lineage.tail.head.id.name;
      }
      if (
        (lineage.head.type === "FunctionExpression" ||
          lineage.head.type === "ClassExpression") &&
        lineage.head.id !== null
      ) {
        return lineage.head.id.name;
      }
    }
    assert(
      nameable.has(lineage.head.type),
      "expected a nameable estree node as head from lineage",
    );
    return `${nameable.get(lineage.head.type)}-${_String(
      incrementCounter(counter),
    )}`;
  };

  const isObjectBound = (lineage) =>
    lineage !== null &&
    lineage.tail !== null &&
    lineage.tail.tail !== null &&
    lineage.tail.head.type === "Property" &&
    lineage.tail.tail.head.type === "ObjectExpression" &&
    lineage.tail.head.value === lineage.head;

  const isClassBound = (lineage) =>
    lineage !== null &&
    lineage.tail !== null &&
    lineage.tail.head.type === "MethodDefinition" &&
    lineage.tail.head.value === lineage.head;

  return {
    getLineage: (node, path) => {
      let lineage = { head: node, tail: null };
      for (let segment of path.split("/")) {
        node = node[segment];
        if (!isArray(node)) {
          lineage = { head: node, tail: lineage };
        }
      }
      return lineage;
    },
    parseQualifiedName,
    createExclusion,
    isExcluded,
    getQualifiedName: (counter, lineage) => {
      if (lineage === null || !nameable.has(lineage.head.type)) {
        return null;
      }
      if (isObjectBound(lineage)) {
        return stringifyQualifiedName({
          qualifier: getEnvironmentName(counter, lineage.tail.tail),
          static: false,
          name: getKeyName(lineage.tail.head),
        });
      }
      if (isClassBound(lineage)) {
        return stringifyQualifiedName({
          qualifier: getEnvironmentName(counter, lineage.tail.tail.tail),
          static: lineage.tail.head.static,
          name: getKeyName(lineage.tail.head),
        });
      }
      return stringifyQualifiedName({
        qualifier: null,
        static: null,
        name: getEnvironmentName(counter, lineage),
      });
    },
  };
};
