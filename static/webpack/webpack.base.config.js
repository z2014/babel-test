const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const testLoader = require('../webpack-loader');
console.log('path===', path.resolve(__dirname, '../', 'webpack-loader.js'))
module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../template/index.html"),
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, "../src/webo-logo.png")),
    new MiniCssExtractPlugin({
      filename: `[name].[hash].css`,
      chunkFilename: "[id].[hash].css"
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2|webp|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "tslint-loader",
            options: {
              configFile: path.resolve(__dirname, "../tslint.json"),
              emitErrors: true,
              fix: false,
              tsConfigFile: path.resolve(__dirname, "../tsconfig.json")
            }
          },
          {
            loader: path.resolve(__dirname, '../', 'webpack-loader.js')
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|object-assign)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  },
};
