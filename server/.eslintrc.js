module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard", "prettier"],
  globals: {
    plug: "readonly",
    it: true,
    expect: true,
  },
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {},
  overrides: [
    {
      "files": [ "**/*.js", "**/*.ts"],
    }
  ]
};
