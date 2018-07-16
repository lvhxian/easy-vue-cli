import createApp from './create-app'

const { app, router, store } = createApp() // 初始化构造方法

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 当路由初始化完毕后， 绑定到根节点上
router.onReady(() => {
  app.$mount('#app')
})
