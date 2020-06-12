import Vue from 'vue'

// monment 作为全局方法
import moment from 'moment'

Vue.filter('YYYY-MM-DD', function(value) {
  if (!value) return ''
  return moment(value).format('YYYY-MM-DD')
})
