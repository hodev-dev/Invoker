const path = require("path");
var glob = require("glob");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function normalizeName(name) {
  return name
    .replace(/node_modules/g, "nodemodules")
    .replace(/[\-_.|]+/g, " ")
    .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, "")
    .trim()
    .replace(/ +/g, "-");
}

module.exports = {
  name: "client",
  entry: glob.sync("./client/**/*.tsx").reduce(function (obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
  }, {}),
  mode: "production",
  output: {
    path: path.resolve(__dirname + "/dist/static"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].bundle.js",
    publicPath: "",
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
    ],
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "client", "tsconfig.client.json"),
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    mangleExports: true,
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "runtime",
          chunks: "all",
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
};
