module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }],
  }
}
