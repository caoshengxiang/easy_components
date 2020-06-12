import Vue from 'vue'

import qs from 'qs'
Object.defineProperty(Vue.prototype, '$qs', {
  value: qs
})
