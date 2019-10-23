const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// const code = `import a from './a';
// function square(n) {
//   return n * n;
// }`;
const code = `
class A {
  private support: string[] = [
    'react',
    'node',
    'koa',
    'typescript',
    'tslint',
    'webpack',
    'rollup',
    'babel',
    'jest',
    'prettier',
    'cicd',
    'font',
    'image',
    'scss'
  ];
  async render() {
    await this.goto()
    console.log(888)
  }
}
export * as ns from "mod"
`
// const code = `
//   import _ from 'lodash';
//   _.merge({}, {a: 1})
// `
// require("@babel/core").transform("code", {
//   presets: ["@babel/preset-typescript"],
// });
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript', 'classProperties', 'exportNamespaceFrom']
});

const result = traverse(ast, {
  enter(path) {
    if (path.isIdentifier()) {
      // path.node.name = "x";
      // console.log(path.node);
    } else if (path.isImportDeclaration()) {
      console.log(path)
    }
    console.log(path)
  }
});
console.log(result);
