import Vue from 'vue'
import utils from '@/utils/utils'

Object.defineProperty(Vue.prototype, '$utils', {
  value: utils
})
