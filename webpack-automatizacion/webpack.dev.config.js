const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = {
  title: 'Simple app',
  template: 'src/index.pug'
}

const devServerConfig = {
  compress: true,
  port: 9000,
  watchOptions: {
    ignored: /node_modules/
  }
}

const webpackConfig = {
  devServer: devServerConfig,
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
    new HtmlWebpackPlugin(HtmlWebpackPluginConfig)
  ]
}

module.exports = webpackConfig
