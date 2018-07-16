import Vuex from 'vuex'
import state from './state/state'
import mustations from './mustations/mustations'
import getters from './getters/getters'
import actions from './actions/actions'
// 修改state的时候会打印日志
import createLogger from 'vuex/dist/logger'

const isDev = process.env.NODE_ENV === 'development'  // 判断是否为开发环境

// 创建一个Vuex实例
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 禁止绕过mutation来修改
    state,
    mustations,
    getters,
    actions,
    plugins: isDev ? [createLogger()] : [] // 生产环境进行日志输出
  })
  // 让vuex支持热更新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mustations/mustations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMustations = require('./mustations/mustations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default
      // 调用原生组件进行热更新
      store.hotUpdate({
        state: newState,
        mutations: newMustations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
