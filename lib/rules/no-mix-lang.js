"use strict";

module.exports = {
  meta: {
    type: "suggestion",

    docs: {
        description: "disallow mix lang in variable and property names",
        category: "Possible Errors",
        recommended: false,
    },
    fixable: "code",
    schema: [] // no options
  },
  create: function(context) {
    function checkAndReport(name, node) {
      if (name.match(/[a-z][а-я]/) || name.match(/[а-я][a-z]/)) {
        context.report(node, 'Do not mix lang in name');
      }
    }

    return {
      VariableDeclarator(node) {
        if (node.id && node.id.name) {
          const name = node.id.name.toLowerCase();
          checkAndReport(name, node);
        }
      },
      Property(node) {
        if (node.key && node.key.name) {
          const name = node.key.name.toLowerCase();
          checkAndReport(name, node);
        }
      }
    };
  }
};