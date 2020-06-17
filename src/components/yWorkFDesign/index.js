/**
 * 工作流（基于bpmn）组件封装 2020.06.16 姚政伟 创建
 */
import YWorkFDesignPage from './YWorkFDesign.vue'

const YWorkFDesign = {
  install: function(Vue){
    Vue.component('YWorkFDesign',YWorkFDesignPage)
  }
}

// 导出组件
export default YWorkFDesign
