// Vue模板配置
module.exports = (isDev) => {
    return {
      preserveWhitepace: true, // 清除template中多余的空格
      extractCSS: !isDev, // 单独打包Vue模板下的css文件 => (判断是否在生产环境)
      cssModules: { // css模块
        localInentName: isDev ? '[path]-[name]-[hash:5]' : '[hash:5]', // css class名混淆
        camelCase: true // 自动转换css内的-链接 => 转换成大写
      }
    }
  }
  