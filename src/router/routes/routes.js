export default [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    path: '/hello',
    name: 'hello',
    component: () => import(/* webpackChunkName: "apps" */ '../../views/app.vue') // webpackChunkName支持分模块打包
  }
]
