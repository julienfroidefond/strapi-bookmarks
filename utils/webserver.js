const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const path = require("path");
const config = require("../webpack.config");
const env = require("./env");

for (const entryName in config.entry) {
  config.entry[entryName] = [
    `webpack-dev-server/client?http://localhost:${env.PORT}`,
    "webpack/hot/dev-server",
  ].concat(config.entry[entryName]);
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  sockPort: env.PORT,
  writeToDisk: true,

  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  disableHostCheck: true,
});

server.listen(env.PORT);
