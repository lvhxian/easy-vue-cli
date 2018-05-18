const proxy = require('../package.json').proxy // 导入proxy配置项

module.exports = {
    port: 8000,
    host: 'localhost',
    overlay: {
        errors: true
    },
    stats: 'errors-only',
    contentBase: false,
    compress: true, // gzip压缩
    historyApiFallback: { // 配置兼容vue-router的history模式
        index: '/build/index.html' // 地址匹配与base下的output中的publicPath一致
    },
    headers: {'Access-Control-Allow-Origin': '*'}, // 支持跨域
    hot: true, // 热更新
    clientLogLevel: 'none', // 记录日志等级
    quiet: true, // 不显示打包数据
    noInfo: true, // 过滤很多无关内容
    proxy, // 跨域代理 手动配置package.json
    watchOptions: { // 监听变化
        poll: true
    }
}