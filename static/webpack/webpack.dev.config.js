const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

let dev = {
  entry: {
    "babel-test": path.resolve(__dirname, "../src/index.tsx")
  },
  devtool: "inline-source-map",
  devServer: {
    port: 8081,
    overlay: true
  },
  output: {
    filename: "[name].js",
  },
  mode: "development"
};

module.exports = merge(base, dev);
