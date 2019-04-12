'use strict';

const es6Functions = {
  // array functions
  find: true,
  findIndex: true,
  copyWithin: true,
  values: true,
  fill: true,
  // string functions
  startsWith: true,
  endsWith: true,
  includes: true,
  repeat: true
}

const objectExceptions = {
  '_': true
}

module.exports = {
  meta: {
    docs: {
      description: 'Forbid methods added in ES6'
    },
    schema: [{
      type: 'object',
      properties: {
        // array functions
        find: { type: 'boolean' },
        findIndex: { type: 'boolean' },
        copyWithin: { type: 'boolean' },
        values: { type: 'boolean' },
        fill: { type: 'boolean' },
        // string functions
        startsWith: { type: 'boolean' },
        endsWith: { type: 'boolean' },
        includes: { type: 'boolean' },
        repeat: { type: 'boolean' },
      }
    }]
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee && node.callee.property && !objectExceptions[node.callee.object.name]) {
          const options = Object.assign(es6Functions, context.options[0]);
          const functionName = node.callee.property.name;

          if (options.hasOwnProperty(functionName) && options[functionName]) {
            context.report({
              node: node.callee.property,
              message: 'ES6 methods not allowed: ' + functionName
            });
          }
        }
      }
    };
  }
};
