'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./pro.env')  // 导入生产环境变量

// 开发环境配置 => 覆盖生产环境
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
})
