import Logger from '../logger.mjs';
import * as Dummy from './dummy.mjs';

const logger = new Logger(import.meta.url);

export default class Location {
  constructor(file, namespace, node, context, parents) {
    this.file = file;
    this.namespace = namespace;
    this.depth = Infinity;
    this.node = node;
    this.context = context;
    this.parents = parents;
  }
  getFile() {
    return this.file;
  }
  getNamespace () {
    return this.namespace;
  }
  shouldBeInstrumented() {
    return this.parents.length + 1 <= this.depth;
  }
  makeDeeperLocation(node, context) {
    return new Location(this.file, this.namespace, node, context, [
      ...this.parents,
      { node: this.node, context: this.context },
    ]);
  }
  makeEntity(childeren) {
    if (
      this.node.type === 'ArrowFunctionExpression' ||
      this.node.type === 'FunctionExpression' ||
      this.node.type === 'FunctionDeclaration'
    ) {
      return {
        type: 'class',
        name: this.context.getName(),
        childeren: [
          {
            type: 'function',
            name: '()',
            source: this.file
              .getContent()
              .substring(this.node.start, this.node.end),
            location: `${this.file.getPath()}:${this.node.loc.start.line}`,
            labels: [],
            comment: null,
            static: this.context.isStatic(),
          },
        ].concat(childeren),
      };
    }
    if (
      this.node.type === 'ObjectExpression' ||
      this.node.type === 'ClassExpression' ||
      this.node.type === 'ClassDeclaration'
    ) {
      return {
        type: 'class',
        name: this.context.getName(),
        childeren,
      };
    }
    if (this.node.type === 'Program') {
      return {
        type: 'package',
        name: this.file.getPath(),
        childeren,
      };
    }
    logger.error(
      `Invalid node type for creating appmap, got: ${this.node.type}`,
    );
    return Dummy.getClassEntity();
  }
}