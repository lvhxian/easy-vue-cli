// 客户端配置
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin')
const ProgressbarWebpack = require('progress-bar-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置
const ExtractPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 打包信息提醒
const notifier = require('node-notifier') // node错误信息提醒
const portfinder = require('portfinder')
const baseConfig = require('./webpack.base') // 公共配置
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const cdnConfig = require('../public/oss.config').cdn // 配置目录
const devServer = require('../dev/devServer')
const isDev = process.env.NODE_ENV === 'development' // 判断是否为生产环境
// 默认生成html结构
const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // 实例化HTML文件 => 指定入口
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

let config

// 是否为生产环境
if (isDev) {
  // 利用merge组合baseConfig和clientConfig
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader', // 让vue支持组件修改样式热重载
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer, // 客户端域名生成
    // 文件入口
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new ProgressbarWebpack(), // 显示百分比进度条打包
      new OpenBrowserWebpackPlugin({url: `http://${devServer.host}:${devServer.port}`}), // 自动打开浏览器
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 线上环境配置打包
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/client.js'),
      vendor: ['vue'] // 第三方版本库
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      // 生产环境打包使用七牛云域名配置
      publicPath: cdnConfig.host
    },
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
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[hash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

// 异步处理报错信息
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 异步追加FriendlyErrorsPlugin
      config.plugins.push(new FriendlyErrorsPlugin({ // 提示信息使用
        compilationSuccessInfo: { // 成功
          messages: [`WelCome use easy-vue-cli please running : http://${devServer.host}:${devServer.port}`]
        },
        onErrors: (severity, errors) => { // 报错提醒
          if (severity !== 'error') {
            return false
          } else {
            const error = errors[0] // 获取错误信息
            const filename = error.file && error.file.split('!').pop()
            // 调用node 环境报错提醒
            notifier.notify({
              title: 'ERROR',
              messages: `${severity} : ${error.name}`,
              subtitle: filename || '',
              icon: path.join(__dirname, '../assets/logo.png')
            })
          }
        }
      }))
      resolve(config)
    }
  })
})
