// 服务端配置
const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置
const baseConfig = require('./webpack.base') // 公共配置
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new ExtractPlugin('styles.[hash:8].css'),
  // 设置全局变量
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"' // 官方推荐设置
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

config = merge(baseConfig, {
  target: 'node', // 执行环境
  entry: path.join(__dirname, '../src/server.js'),
  devtool: 'source-map', // 提供server端代码调试的功能
  output: {
    libraryTarget: 'commonjs2', // 模块模式 modules.export
    filename: 'server-entry.js', // 服务端环境不需要开启hash缓存
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies), // 打包需要的包
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  // 文件入口
  plugins
})

module.exports = config
