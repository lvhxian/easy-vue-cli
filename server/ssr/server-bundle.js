const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRender = require('vue-server-renderer') // 服务端渲染组件
const bundle = require('../../server-build/server-entry.js').default // 调用server端打包的目录

const serverRender = require('./server-render') // 引入ssr处理模板

const clientManifest = require('../../build/vue-ssr-client-manifest.json') // 引入打包文件配置json

// 创建ssr模板
const renderer = VueServerRender.createRenderer(
  {
    inject: false,
    clientManifest
  }
)

// 调用ejs => html模板
const template = fs.readFileSync(
  path.join(__dirname, '../template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

// 所有的请求都处理
pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template, bundle)
})

module.exports = pageRouter
