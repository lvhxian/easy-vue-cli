const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user } // 获取用户地址和用户登录状态

  try {
    const app = await bundle(context) // bundle处理传入的数据

    // 阻止在渲染期间渲染全部组件 => 强制301
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    // 获取meta信息
    const {
      title
    } = context.meta.inject()

    // 生成html结构
    const html = ejs.render(template, {
      appString, // 结构 => 对应到ejs模板中的<%- appString %>
      style: context.renderStyles(), // 样式 => 对应到ejs模板中的<%- styles %>
      scripts: context.renderScripts(), // js  => 对应到ejs模板中的<%- scripts %>
      title: title.text(), // title信息 => 对应ejs模板中的<%- title %>
      initalState: context.renderState() // store信息
    })
    // 返回客户端
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
