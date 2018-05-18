export default [
  {
    path: '/',
    redirect: '/app' // 默认路由跳转
  },
  {
    path: '/app',
    name: 'app',
    component: () => import(/* webpackChunkName: "app" */ '../../views/app.vue') // webpackChunkName支持分模块打包
  }
]
