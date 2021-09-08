// webpack.config.server.js
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  name: "server",
  entry: {
    server: path.resolve(__dirname, "server/server.ts"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
    ],
    extensions: [".ts", ".tsx"],
  },
  externals: [nodeExternals()],
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "server", "tsconfig.server.json"),
        },
      },
    ],
  },
  optimization: {
    usedExports: false,
    mangleExports: false,
    minimize: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ context: "server", from: "views", to: "views" }],
    }),
  ],
};
