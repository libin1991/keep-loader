/**
 * Created by demons on 2017/8/12.
 */
var esprima = require('esprima')
var loaderUtils = require("loader-utils");
var fs = require("fs")

function isRemove(node,env) {
    return (node.type === 'CallExpression')
        && (node.callee.name === 'KEEP')
        && (node.callee.type === 'Identifier')
        && (node.arguments[0].value !== env)
}
function keep(source,env) {
    const entries = [];
    esprima.parseModule(source, {}, function (node, meta) {
        if (isRemove(node,env)) {
            entries.push({
                start: meta.start.offset,
                end: meta.end.offset
            });
        }
    });
    entries.sort((a, b) => {
            return b.end - a.end
        }
    ).forEach(n => {
        source = source.slice(0, n.start) + source.slice(n.end);
    });
    return "function KEEP(_,cb){cb();}\n" + source;
}

module.exports = function(source, map) {
    var options=loaderUtils.getOptions(this)||{}
    this.callback(null, keep(source,options.keep||""), map);
};
