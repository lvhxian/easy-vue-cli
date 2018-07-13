'use strict'

/* 全局 */
const path = require('path')
/* 配置跨域请求 */
const proxy = require('../package.json').proxy  // 调用package.json中配置的proxy项动态配置

// 开发环境 & 生产环境
module.exports = {
    // 开发环境配置
    dev: {

        /*
         *  静态目录配置
         */
        assetsDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        /*
         *  webpack-dev-server 配置
         */

        port: 8000,  // 端口号 => 用于测试环境的域名端口号
        host: 'localhost', // 访问域名 => 用于测试环境的域名
        open: true, // 自动打开默认浏览器 => 需要在webpack-dev-server 拼接 --open
        // 错误验证
        overlay: true,  // 是否开启错误警告
        headers: { 'Access-Control-Allow-Origin': '*' },  // 请求头配置
        historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
            index: '/dist/index.html' // 请与出口目录一致
        },
        proxy: proxy, // 跨域代理 => // 配置地址请在package完成
        hot: true, // 启用 webpack 热替换

        devtool: 'cheap-module-eval-source-map',  // 清除打包后的地图，生产环境专用

        notifyOnErrors: true // 是否开启错误提醒报告
    },
    // 生产环境配置
    build: {
        productionSourceMap: true,  // 资源地图
        /*
         *  打包目录配置
         */

        index: path.resolve(__dirname, '../dist/index.html'),

        /*
         *  打包目录路径配置
         */

        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsDirectory: 'static',
        assetsPublicPath: '/',

        devtool: '#source-map', // 生成打包文件地图.map => 原始源代码

        /*
        *  开启二次压缩，如需要则运行以下代码安装并配置productionGzip为true
        *  npm install --save-dev compression-webpack-plugin
        * */
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
    }

}
