/**
 * 布局项占位组件 2019.4.17 姚政伟 创建
 */
import MyProgressItem from './ProgressItem.vue'

const ProgressItem = {
  install: function(Vue){
    Vue.component('ProgressItem',MyProgressItem)
  }
}

// 导出组件
export default ProgressItem
