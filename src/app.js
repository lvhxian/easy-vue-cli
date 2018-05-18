// 创建服务端vue模板
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import App from './views/app.vue'
import createStore from './store/store'
import createRouter from './router/router'

// 注册插件和组件
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

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
