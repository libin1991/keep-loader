/**
 * Created by demons on 2017/8/12.
 */
var source = "function debug(cb){cb();}var t=8;debug('dev',()=>{t=9});debug('release',()=>{t=9})";
var log = console.log;
var esprima = require('esprima')
function isDebugCall(node) {
    return (node.type === 'CallExpression')
        && (node.callee.name === 'debug')
        && (node.callee.type === 'Identifier')
    &&(node.arguments[0].value!=='dev')
}
function removeDebug(source) {
    const entries = [];
     esprima.parseScript(source, {}, function (node, meta) {
        if (isDebugCall(node)) {
            entries.push({
                start: meta.start.offset,
                end: meta.end.offset
            });
        }
    });
        entries.sort((a, b) => {return b.end - a.end}
        ).
        forEach(n => {
            source = source.slice(0, n.start) + source.slice(n.end);
    });
    return source;
}

log(removeDebug(source))