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
    filename: 'webscripten.bundle.js',
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
        { from: './src/static/' , to: 'static/' }
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
}
