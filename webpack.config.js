const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  target: 'web',
  mode: 'production',
  output: {
    library: {
      name: 'webscripten',
      type: 'umd'
    },
    filename: 'webscripten.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: './src/static/llc.wasm' },
        { from: './src/static/lld.wasm' },
        { from: './src/static/webscripten.d.ts' },
        { from: './src/static/sysroot.tar' },
        { from: './src/static/wasi.index.esm.js' },
        { from: './src/static/wasmfs.index.esm.js' },
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
}
