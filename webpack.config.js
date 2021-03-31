const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/demo.js",
  target: "web",
  output: {
    filename: "demo.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./lld.wasm" }, { from: "./llc.wasm" }, { from: "./demo.html" }, { from: "./sysroot.tar"}],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
