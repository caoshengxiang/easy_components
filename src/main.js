/* eslint-disable */
var is = ''

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

import './icons' // icon
// import './permission' // permission control

// vueConfig
// import './VueConfig'

// 混入
// import mixin from './VueConfig/mixin'
Vue.use(Element, {
  size: Cookies.get('size') || settings.elDefaultSize // set element-ui default size
})

//引入API接口
import api from '@/api'
Vue.prototype.$api= api

import EVueContextmenu from 'e-vue-contextmenu'
import '@/assets/css/contextMenu.scss'
Vue.use(EVueContextmenu)

Vue.config.productionTip = false



new Vue({
  // mixins: [mixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
