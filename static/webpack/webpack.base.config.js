const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

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
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2|webp|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: [
          'file-loader'
        ]
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
