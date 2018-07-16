/* 内置模块 */
const path = require('path')
/* 第三方 */
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css文件抽离
/* 用户 */
const VueLoaderOptions = require('../conifg/vue-loader.config') // vue-loader配置文件
const utils = require('./utils')  // 全局配置
const Config = require('../conifg') // 配置想

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    mode: "development", // 模式
    entry: {
        app: './src/index.js'
      }, // 入口文件
    output: {
      path: Config.build.assetsRoot,
      filename: '[name].[hash:8].js',
      publicPath: process.env.NODE_ENV === 'production'
        ? Config.build.assetsPublicPath
        : Config.dev.assetsPublicPath
    },
    module: {
        rules: [
            // eslint预处理
            // {
            //     enforce: 'pre', // 优先执行
            //     test: /\.(vue|js|jsx)/,
            //     loader: 'eslint-loader',
            //     include: [
            //         utils.resolve('src') // 需要处理的目录
            //     ]
            // },
            // vue文件处理
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: VueLoaderOptions(isDev)
            },
            // jsx语法处理
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // js文件处理
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // 图片资源处理
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: utils.assetsPath('img/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            // css 规则处理
            {
                test: /\.css$/, // 处理的类型
                include: [
                    utils.resolve('src') // 需要处理的目录
                ],
              // 使用处理规则
              use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader'
              ],
            },
            // css预处理器 - less
            {
                test: /\.less$/,
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: [
                  'css-loader', // 这里需要2个模块 先把less转成css再用css-loader处理
                  'less-loader',
                ]
            },
            // stylus 文件处理
            {
                test: /\.styl/,
                include: [utils.resolve('src')],
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                      loader: 'postcss-loader',
                      options: {
                          sourceMap: true
                      }
                  },
                  'stylus-loader',
                ]
            },
            // 媒体处理
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            // 字体处理
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    plugins: [
      new VueLoaderPlugin() // 实例化vue-loader配置
    ]
}
// 导出当前模块
module.exports = config
