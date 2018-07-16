'use strict'
/* 内置模块 */
const path = require('path')
const packageConfig = require('../package.json')
/* 第三方 */
/* 用户模块 */
const config = require('../conifg')

/*
*
*  全局函数
*
* */

// 打包资源路径
exports.assetsPath = function (_path) {
    // 判断当前是否为生产环境
    const assetsDirectory = process.env.NODE_ENV === 'development'
        ? config.build.assetsDirectory
        : config.dev.assetsDirectory
    // 返回拼装路径
    return path.posix.join(assetsDirectory, _path)
}

// 通用路径定位
exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}

// 实例化错误信息模板
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier') // node错误节点通知

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    // 创建节点报错信息通知
    notifier.notify({
      title: packageConfig.name, // 标题（读取packjson)
      message: severity + ': ' + error.name, // 错误信息
      subtitle: filename || '', //
      icon: path.join(__dirname, '../assets/logo.png')  // logo图
    })
  }
}
