const path = require("path");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const base = require("./webpack.base.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FileManagerPlugin = require('filemanager-webpack-plugin');
const isAnalyzeDependencies = process.env.ANALYZE_DEPENDENCIES === 'true';

const plugins = [
  new CleanWebpackPlugin({}),
  new UglifyJsPlugin({
    test: /\.tsx?$/i,
    uglifyOptions: {
      compress: {
        pure_funcs: ["console.log", "alert"] // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
      }
    }
  }),
  new FileManagerPlugin({
    onEnd: {
      mkdir: [path.resolve(__dirname, `../../server/src/view`)],
      move: [{
        source: path.resolve(__dirname, `../dist/index.html`),
        destination: path.resolve(__dirname, `../../server/src/view/index.html`)
      }],
    }
  }),
];

if (isAnalyzeDependencies) {
  plugins.push(new BundleAnalyzerPlugin());
}

let prod = {
  entry: {
    "babel-test": path.resolve(__dirname, "../src/index.tsx"),
  },
  plugins,
  output: {
    filename: `[name].[hash].js`,
    path: path.resolve(__dirname, "../dist"),
    publicPath: '//i.gtimg.cn/ams-web/babel-test/'
  },
  mode: "production"
};

module.exports = merge(base, prod);
