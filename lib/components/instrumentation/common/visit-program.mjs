import { setSimpleVisitor, visit } from "./visit.mjs";

setSimpleVisitor(
  "Program",
  (node, context) => [node.body.map((child) => visit(child, context, node))],
  (node, context, body) => ({
    type: "Program",
    sourceType: node.sourceType,
    body,
  }),
);