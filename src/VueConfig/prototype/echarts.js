import Vue from 'vue'
import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
Object.defineProperty(Vue.prototype, '$echarts', { value: echarts })
