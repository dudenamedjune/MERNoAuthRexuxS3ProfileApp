var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const VENDOR_LIBS = [

  "react",
  "react-dom",
  "react-router"

];

module.exports = {

  // This is the entry point or start of our react applicaton
  entry: {
    bundle: ["babel-polyfill", "./app/app.js"],
    vendor: VENDOR_LIBS
  },


  // The plain compiled Javascript will be output into this file
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },

  // This section desribes the transformations we will perform
  module: {
    rules: [
      {

        use: "babel-loader",
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        exclude: /node_modules/


      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.scss$/
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      }
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: { limit: 40000 }
      //     },
      //     'image-webpack-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './style/assets', to: './',
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './',
    proxy: {
      "*": "http://localhost:3030"
    }
  },

  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};
