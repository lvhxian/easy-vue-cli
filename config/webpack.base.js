const path = require('path')
const createVueLoaderOptions = require('../dev/devVueLoader') // 引入vue-loader处理
const isDev = process.env.NODE_ENV === 'development' // 判断是否为生产环境

// 基础配置
const config = {
  target: 'web',
  // 入口目录
  entry: path.join(__dirname, '../src/client.js'),
  // 出口目录
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../build'),
    publicPath: 'http://127.0.0.1:8000/build/' // 公用目录地址
  },
  // 模块规则
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/, // 配置eslint规范,使得每次修改都检测
        loader: 'eslint-loader',
        exclude: '/node_modules/',
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev) // 对.vue文件进行处理
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // 媒体
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      // 字体图标处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      // 图片处理
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:7].[ext]' // 打包规范好图片位置
            }
          }
        ]
      },
      // 兼容stylus
      {
        test:/\.css$/,
        loader:'style-loader!css-loader!stylus-loader'
      }
    ]
  }
}

module.exports = config
