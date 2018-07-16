/* 内置模块 */
const path = require('path')
/* webpack */
const webpack = require('webpack')
const merge = require('webpack-merge')
/*  第三方 */
const HTMLPlugin = require('html-webpack-plugin') // html模板
const UglifyPlugin = require('uglifyjs-webpack-plugin')  // 压缩 JS 代码
const CopyWebpackPlugin = require('copy-webpack-plugin') // copy文件目录
const VueClientPlugin = require('vue-server-renderer/client-plugin') // vue ssr 客户端打包文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 优质的错误提醒
const portfinder = require('portfinder') // 进程端口检测管理
const ProgressbarWebpack = require('progress-bar-webpack-plugin') // 打包进度条
/* 用户配置 */
const baseConfig = require('./webpack.config.base') // 公用资源
const Config = require('../conifg') // 环境配置
/* 开发环境 */
const utils = require('./utils')
/* 开发变量 */
const isDev = process.env.NODE_ENV === 'development'
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

/* 默认plugins配置 */
const defalutPlugins = [
    // 在webpack编译时创建一个全局变量
    new webpack.DefinePlugin({
        'process.env': require('../conifg/dev.env')
    }),
    // 实例化html模板
    new HTMLPlugin({
        filename: 'index.html',
        template:  path.join(__dirname, '../assets/index.html'),
        inject: true
    }),
    new VueClientPlugin(), // 实例化VueSsr打包需要的地图
]

let devWebPackconfig

// 如果为生产环境
if (isDev) {
  devWebPackconfig = merge(baseConfig, {
        devtool: Config.dev.devtool, // 快速打包模式
        /*
            webpack-dev-server配置
        */
        devServer: {
            inline: false,
            clientLogLevel: 'error', // 客户端控制台输出
            historyApiFallback: true, // h5 中转器
            hot: Config.dev.hot || false,  // 热更新
            contentBase: path.resolve(__dirname, "dist"), // 告诉服务器从哪里提供内容
            compress: true, // 开启GZIP压缩
            host: HOST || Config.dev.host, // 域名
            port: PORT || Config.dev.port, // 端口号
            open: Config.dev.autoOpenBrowser, // 是否自动打开浏览器
            overlay: Config.dev.overlay  // 开启错误提醒
                ? { warnings: false, errors: true }
                : false,
            publicPath: Config.dev.assetsPublicPath, // 打包文件可在浏览器中访问
            proxy: Config.dev.proxy, // 代理
            quiet: true, // 开启后控制台不在输出打包信息
            watchOptions: {  // 与监视文件相关的控制选项
                poll: true,
            }
        },
        /*  插件 */
        plugins: defalutPlugins.concat([
            new ProgressbarWebpack(), // 显示百分比进度条打包
            new webpack.HotModuleReplacementPlugin(),  // 热加载 = HMR
            new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径
            new webpack.NoEmitOnErrorsPlugin(), // 忽略报错继续往下执行
            // 复制文件到打包文件内
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, '../static'),  // 来源
                    to: Config.dev.assetsDirectory, // 放入目录
                    ignore: ['.*'] // 规则为全文件
                }
            ])
        ])
    })
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || Config.dev.port // 检测端口号
  // 获取端口号与basePort进行匹对
  portfinder.getPort((err, port) => {
    // 如检测到错误信息（冲突、占用等）
    if (err) {
      reject(err)
    } else {
      // 如果没有问题则把端口全部修改为basePort
      process.env.PORT = port
      // webpack-dev-server修改
      devWebPackconfig.devServer.port = port

      // 追加错误提醒、异常提醒
      devWebPackconfig.plugins.push(new FriendlyErrorsPlugin({
        // 无报错信息
        compilationSuccessInfo: {
          messages: [`Your can running here: http://${devWebPackconfig.devServer.host}:${port}`],
        },
        // 有报错信息
        onErrors: Config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }))
      // 返回
      resolve(devWebPackconfig)
    }
  })
})

