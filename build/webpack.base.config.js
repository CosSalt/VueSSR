const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: '',//入口文件
  output:{ //文件输出
    path: path.resolve(__dirname,'../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  module:{ //loader,处理非js文件（webpack自身只理解js）
    rules:[
      { test: '\.text$', use: 'raw-loader' }
    ]
  },
  // loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
  // 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量
  plugins:[
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template:'./src/index.html'})
  ]
}

module.exports = config