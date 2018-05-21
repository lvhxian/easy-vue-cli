const Koa = require('koa')
const send = require('koa-send') // 转发
const path = require('path') // nodejs路径配置
const staticRouter = require('./static') // 静态资源处理
const KoaBody = require('koa-body') // 处理post提交的数据
const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

// 请求拦截 => 处理异常
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

// 重定向favicon.ico路径
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    // 发送静态favicon.ico
    await send(ctx, '/favicon.ico', path.join(__dirname, '../'))
  } else {
    await next()
  }
})

// 绑定中间件
app.use(KoaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods()) // 使用静态资源处理中间件

let pageRouter

// 判断是否在生产环境
if (isDev) {
  pageRouter = require('./routers/server-no-bundle')
}

// 调用路由
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0' // 设置访问地址
const PORT = process.env.PORT || 3333 // 设置端口号

// 监听
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
