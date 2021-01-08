/**
 * 扩展 VuePress 应用
 */
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//vue代码高亮显示库 VueHighlightJS
import VueHighlightJS from 'vue-highlight.js'
//这里样式我选择的是atom-one-light；样式更多选择可以参见 https://highlightjs.org/static/demo/ 里的styles ；打不开直接到node_module找
//注意： 代码块的背景色 还是由官方设置的 $codeBgColor 决定的
import 'highlight.js/styles/atom-one-light.css'
// import 'highlight.js/styles/atom-one-dark-reasonable.css';

import vDialogs from 'v-dialogs' //弹窗组件

import cuCustom from '../../public/colorui/components/cu-custom'

import '../../public/colorui/coloruipx.less'

import '../../public/colorui/icon.css' // 图标

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // 做一些其他的应用级别的优化
  Vue.use(Element)
  Vue.use(vDialogs)
  Vue.use(VueHighlightJS)
  Vue.component('cuCustom', cuCustom)
}
