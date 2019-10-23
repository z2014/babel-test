const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require('path');

function parseCode (code) {
    // console.log(code)
    console.log(this.resourcePath);
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'classProperties', 'exportNamespaceFrom']
      });
      
    const result = traverse(ast, {
        enter(npath) {
            if (npath.isIdentifier()) {
            // path.node.name = "x";
            // console.log(path.node);
            } else if (npath.isImportDeclaration()) {
                // console.log(npath.node)
                const sourcePath = this.resourcePath ? this.resourcePath : '';
                // console.log(sourcePath, typeof npath.node.source.value)
                console.log(path.resolve(sourcePath, npath.node.source.value))
                
            }
        }
    });
}

function testLoader (source) {
    console.log('--- loader begin ----');
    // console.log(this.resourcePath);
    parseCode(source)
    console.log('--- loader end ----\n');
    const callback = this.async();
    // do anything
    callback(null, source);
}

module.exports = testLoader;