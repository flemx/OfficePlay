const path = require("path");
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");

//sdd
module.exports = {
  mode: "development",
  entry: "./phaser/src/index.ts",
  output: {
    path: path.resolve(
      __dirname,
      "force-app/main/default/staticresources/remoteOfficeAssets/build"
    ),
    publicPath: "/build/",
    filename: "project.bundle.js"
  },
  devServer: {
    contentBase: path.join(
      __dirname,
      "force-app/main/default/staticresources/remoteOfficeAssets"
    ),
    index:
      "./force-app/main/default/staticresources/remoteOfficeAssets/index.html"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    })
  ]
};
