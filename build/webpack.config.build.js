/* 内置模块 */
const path = require('path')
/* webpack */
const webpack = require('webpack')
const merge = require('webpack-merge')
/*  第三方 */
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const UglifyPlugin = require('uglifyjs-webpack-plugin')  // 压缩 JS 代码
const CopyWebpackPlugin = require('copy-webpack-plugin') // copy文件目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // css抽离
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
/* 用户配置 */
const BaseWebpackConfig = require('./webpack.config.base')
const utils = require('./utils')
const config = require("../conifg/index")
/* 打包环境判断是否为测试环境 */
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require("../conifg/pro.env")

// 打包环境配置
const ProWebpackConfig = merge(BaseWebpackConfig, {
    mode: "production",
    // 代码打包压缩
    optimization: {
      splitChunks: {
        chunks: "all", // 代码分割策略
        minSize: 30000, // 要生成的块的最小大小
        minChunks: 1, // 分割前必须共享模块的最小块数
        maxAsyncRequests: 5, // 按需加载时的最大并行请求数
        maxInitialRequests: 3, // 入口点处的最大并行请求数
        automaticNameDelimiter: '~', // 分隔符
        name: true,
        cacheGroups: { // 缓存规则
          commons: {  // commons模块代码共享
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          styles: { // css调整
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          // 抽取公共模块
          vendors: {
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          }
        }
      },
      minimizer: [
        new UglifyPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true,
          cache: true // 缓存策略
        }),
        new OptimizeCSSPlugin({})  // css合并打包
      ], // UglifyjsWebpackPlugin最小化捆绑包。
      runtimeChunk: {
        name: 'manifest'
      },  // 预设模式, 多入口谨慎
      noEmitOnErrors: true  // 编译时错误直接过
    },
    // 出口模块
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/main.[chunkhash].js'),  // 入口文件名
      chunkFilename: utils.assetsPath('js/[name].[chunkhash].js') // 分离式公用模块
    },
    // 插件
    plugins: [
      // 生成html模板
      new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing'
          ? 'index.html'
          : config.build.index,
        template: path.join(__dirname, '../assets/index.html'),
        inject: true,
        minify: { // 压缩 HTML 的配置
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
          minifyJS: true // 压缩 HTML 中出现的 JS 代码
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      }),
      // 提取css
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/styls.[name].css'), // 打包css
        chunkFilename: utils.assetsPath('css/styls.[contenthash:12].css') // CSS公共区
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HashedModuleIdsPlugin(),
    ]
})

module.exports = ProWebpackConfig
