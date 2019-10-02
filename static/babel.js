const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

const result = traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
      console.log(path);
    }
  }
});
console.log(result);
