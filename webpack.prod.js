const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

const UglifyJSPluginConfig = new UglifyJSPlugin({
  sourceMap: true
});
const webpackProcessEnVConfig = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify("production")
  }
});

module.exports = merge(common, {
  devtool: "source-map",
  plugins: [
    UglifyJSPluginConfig,
    webpackProcessEnVConfig
  ]
});
