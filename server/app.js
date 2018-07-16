// 内置包
const path = require('path')
// koa标配包
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaRouter = require('koa-router')
const send = require('koa-send')
// 实例化koa环境
const app = new Koa()
// 自定义路由
const staticRouter = require('./routes/static')

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

app.listen(3000,function () {
  console.log('listen in to 3000')
});
