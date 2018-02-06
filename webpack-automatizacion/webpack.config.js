const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = {
  title: 'Simple app',
  template: 'src/index.pug'
}

const webpackConfig = {
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, 'src/js/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin(HtmlWebpackPluginConfig)
  ]
}

module.exports = webpackConfig
