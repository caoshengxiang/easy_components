import Vue from 'vue'
import vueCookies from 'vue-cookies'
// Vue.prototype.$vueCookies = vueCookies
Object.defineProperty(Vue.prototype, '$vueCookies', { value: vueCookies })
