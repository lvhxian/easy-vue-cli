'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// 测试模式
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
