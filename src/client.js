// 服务端渲染入口
import createApp from './app'
import bus from './util/vue'
// 获取参数
const {app, router, store} = createApp()

// 判断是否有服务端请求的数据 有则重置store的数据
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 监听自动跳转到登录页面
bus.$on('auth', () => {
  router.push('/login')
})

// 路由初始化完毕后绑定Vue实例到节点
router.onReady(() => {
  app.$mount('#root')
})
