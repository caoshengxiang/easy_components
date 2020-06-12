import Vue from 'vue'

import moment from 'moment'

// Vue.prototype.$moment = (t, format) => {
//   if (!t) {
//     return ''
//   }
//   if (!format) {
//     format = 'YYYY-MM-DD HH:mm:ss'
//   }
//   // console.log(moment(t).format(format))
//   return moment(t).format(format)
// }
Object.defineProperty(Vue.prototype, '$moment', {
  value: (t, format) => {
    if (!t) {
      return ''
    }
    if (!format) {
      format = 'YYYY-MM-DD HH:mm:ss'
    }
    // console.log(moment(t).format(format))
    return moment(t).format(format)
  }
})
