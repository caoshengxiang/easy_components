/* 禁用F12功能 */
import noDebuger from '@/utils/noDebuger'

console.info(process.env.NODE_ENV, 'process.env.NODE_ENV')
if (process.env.NODE_ENV === 'production') { // 生产环境禁用调试
  noDebuger()
}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import settings from './settings'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import '@/styles/lib/hover.css'
import '@/styles/lib/animate.css'

import './icons' // icon
import './router/permission' // permission control

// vueConfig
import './VueConfig'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// development production
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 混入
import mixin from '@/VueConfig/mixin'

Vue.use(Element, {
  size: Cookies.get('size') || settings.elDefaultSize // set element-ui default size
})

import EVueContextmenu from 'e-vue-contextmenu'
import '@/assets/css/contextMenu.scss'

Vue.use(EVueContextmenu)

Vue.config.productionTip = false

import echarts from 'echarts'

Vue.prototype.$echarts = echarts

// Vue.mixin(mixin)
const app =new Vue({
  // mixins: [mixin],
  router,
  store,
  render: h => h(App)
})
window.app = app
app.$mount('#app')
