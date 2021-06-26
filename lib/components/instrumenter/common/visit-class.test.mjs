import { makeCaption } from "./caption.mjs";
import { makeClassEntity } from "./entity.mjs";
import { setVisitor } from "./visit.mjs";
import { test } from "./__fixture__.mjs";
import "./visit-program.mjs";
import "./visit-statement.mjs";
import "./visit-expression.mjs";
import "./visit-identifier.mjs";
import "./visit-pattern.mjs";
import "./visit-class.mjs";

Error.stackTraceLimit = Infinity;

setVisitor(
  "FunctionExpression",
  (node, context) =>
    makeCaption(node.params.length === 0 ? "MethodDefinition" : "FooBar", null),
  (node, context) => [],
  (node, context, entities) => [makeClassEntity(node, entities)],
  (node, context) => node,
);

// Class Expression //

test("(class { foo () { } bar (x) {} });", {
  entities: [
    {
      type: "class",
      caption: { origin: "ClassExpression", name: null },
      index: 1,
      children: [
        {
          type: "class",
          caption: { origin: "MethodDefinition", name: null },
          index: 2,
          children: [],
        },
      ],
    },
    {
      type: "class",
      caption: { origin: "FooBar", name: null },
      index: 3,
      children: [],
    },
  ],
});

test("(class c extends null {});", {
  entities: [
    {
      index: 1,
      type: "class",
      caption: {
        name: "c",
        origin: "ClassExpression",
      },
      children: [],
    },
  ],
});

// Class Declaration //

test("class c {}", {
  entities: [
    {
      type: "class",
      index: 1,
      caption: {
        name: "c",
        origin: "ClassDeclaration",
      },
      children: [],
    },
  ],
});

test("export default class {};", {
  type: "module",
  entities: [
    {
      type: "class",

      index: 1,
      caption: {
        name: "default",
        origin: "ClassDeclaration",
      },
      children: [],
    },
  ],
});
