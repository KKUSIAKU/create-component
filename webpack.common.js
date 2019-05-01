
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const  babelOptions  = require ("./babel");


const cleanDocsFolder = new CleanWebpackPlugin(["docs"]);
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: "Production",
  template: __dirname + "/index.html",
  filename: "index.html",
  inject: "body",
});

// const extractSass = new ExtractTextPlugin({
//   /*filename: "[name].[contenthash].css",*/
//   filename:"style.css",
//   disable: process.env.NODE_ENV === "development"
// });

const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

module.exports = {
  entry: {
    app: "./index.js",    
  },
  
  module: {
    rules: [
      {
        test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            { loader: "css-loader", 
              options: { sourceMap: true,}
            },
            {
              loader: "sass-loader",
              options: {  sourceMap: true, }
            },
          ],
         
      },

      {
        test: /\.(png|jpeg|jpg)$/,
        use: [
          { loader: "file-loader" }
        ]
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include:[ path.resolve(__dirname), path.resolve(__dirname,"packages"),path.resolve(__dirname, "src")],
        use: {
          loader:"babel-loader",
          // options:{
          //   ...babelOptions,
          // }
        }
      },

    ]
  },

  plugins: [
    cleanDocsFolder,
    HtmlWebpackPluginConfig,
    extractCSS 
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "docs")
  }
};
