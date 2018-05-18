import Router from 'vue-router'
import routes from './routes/routes'

// 防止在全局内调用router会跑进router内
export default () => {
  return new Router({
    routes,
    mode: 'history', // 切换路由模式 默认hash
    linkActiveClass: 'active-link', // router-link 选中的class名
    linkExactActiveClass: 'exact-Active-link', // router-link 非选中的class名
    // 记录之前滚动的位置
    scrollBehavior (to, from, savedPosition) {
      // 如果有滚动过 则记录滚动的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true // 兼容不支持history的模式开启
  })
}
