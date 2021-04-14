const webpack = require("webpack");
  const path = require("path");
  const fileSystem = require("fs");
  const {CleanWebpackPlugin} = require("clean-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const ZipPlugin = require("zip-webpack-plugin");
  const env = require("./utils/env");

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, `secrets.${  env.NODE_ENV  }.js`);

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    options: path.join(__dirname, "src", "js", "options.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: new RegExp(`.(${  fileExtensions.join("|")  })$`),
        type: "asset/inline",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias,
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          transform (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              }),
            );
          },
        },
        { from: "src/img/extension", to: "./" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"],
    }),
    new ZipPlugin({
      path: "../",
      filename: "build.zip",
    }),
  ],
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-source-map";
}

module.exports = options;
