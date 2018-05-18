// 创建服务端vue模板
import Vue from 'vue'
import VueRouter from 'vue-router' // 路由
import Vuex from 'vuex' // 状态管理器
import Meta from 'vue-meta' // vue修改TDK的
import createStore from './store/index' // 状态管理器初始化
import createRouter from './router/index' // 路由初始化
import fastclick from 'fastclick' // 移动端300毫秒
import App from './views/app.vue' // 这个你们看不懂我也没办法了

// 注册插件和组件
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

// 全局配置fastclick
fastclick.attach(document.body)

// 每次都要返回一个新的实例 避免冲突
export default () => {
  // 实例化所需要参数
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 最后返回3个参数
  return {app, router, store}
}
