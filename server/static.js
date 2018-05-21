const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({prefix: '/public'}) // 只处理/public

// 静态资源处理
staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
