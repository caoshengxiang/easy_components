import Vue from 'vue'
import webStorage from 'webStorage'
// Vue.prototype.$webStorage = webStorage
Object.defineProperty(Vue.prototype, '$webStorage', { value: webStorage })
