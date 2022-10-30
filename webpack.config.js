const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/javascripts/app.mjs'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/javascripts'),
    filename: 'bundle.min.js'
  },
  devServer: {
    static: path.resolve(__dirname, './dist')
  }
}
