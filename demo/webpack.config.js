const path = require('path')

module.exports = {
  entry: './index.js',
  target: 'web',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    minimize: false,
  },
}
