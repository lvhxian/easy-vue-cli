process.env.NODE_ENV = 'production'
/* 内置模块 */
const path = require('path')
/* webpack */
const webpack = require('webpack')
/* 第三方插件 */
const chalk = require('chalk')
const ora = require('ora')
const rm = require('rimraf')
/* 用户配置 */
const config = require('../conifg/index')
const webpackConfig = require('./webpack.config.build')

const spinner = ora('开始打包项目代码 :) ...')  // 在命令行中提醒
spinner.start() // 开始运行

rm(path.join(config.build.assetsRoot, config.build.assetsDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(' 打包过程中出现异常 :( .\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build 完毕 :) .\n'))
    console.log(chalk.yellow(
      '  Tip: 打包完成后请使用Http服务器进行访问.\n'
    ))
  })
})
