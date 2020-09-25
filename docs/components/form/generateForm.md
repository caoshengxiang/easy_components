# 生成表单

## 说明

无

## 依赖
 * element-ui
 * vuedraggable
 * v-dialogs
 安装 yarn add vuedraggable v-dialogs

v-dialogs he animate.css 需要在main.js 全局引入
```js
 // 全局引入
    import Vue from 'vue'
    import Element from 'element-ui'
    import vDialogs from 'vDialogs'
    Vue.use(vDialogs)
    Vue.use(Element)
```
<el-alert
    title="tips："
    type="warning"
    description="这里v-dialogs 有个坑，2.0.3 props 下去的数据，显示undefined, 解决方法退回 2.0.2 (不行就把node_modules 全删除)"
    :closable="false"
    show-icon>
  </el-alert>

## 安装

1. 使用时引入
```js
// 页面
import fenerateForm from '@/components/generateForm/index'
export default {
    components: {
      fenerateForm,
    },
    name: 'elFormCustom',
    data () {},
}
```
2. 全局引入
```js
// main.js文件中引入
import Vue from 'vue'
import fenerateForm from '@/components/generateForm/index'
Vue.component('fenerateForm', fenerateForm)
```

## 使用

<baseComponent-codeBox
  title="基础用法"
  description="由于项目是在比较宽得屏幕运行，小屏幕未做兼容，文档得展示效果不是很理想"
  onlineLink="">
  <demo-form-elFormCustom/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/demo/form/elFormCustom.vue
  </highlight-code>
</baseComponent-codeBox>

## 属性 props

<baseComponent-apiTable title="" :tableBody="tableBody" :tableHead="tableHead">
</baseComponent-apiTable>

<baseComponent-apiTable title="uploadOptions 对象说明" :tableBody="tableBody2" :tableHead="tableHead2">
</baseComponent-apiTable>

## 事件
<baseComponent-apiTable title="" :tableBody="tableBody3" :tableHead="tableHead3">
</baseComponent-apiTable>

## slots

无

## 方法

无


## 组件源

[遂企云项目](http://www.snsme.cn/)



<script>
  export default {
    data() {
      return {
        tableHead: `参数|说明|类型|可选值|	默认值`,
        tableBody: [
          `uploadOptions          | 上传配置  | object | -- |--`,
          `initList               | 初始表单，如编辑需要传入| Array| --| --`
        ],
        tableHead2: `参数|说明|类型|可选值|	默认值`,
        tableBody2: [
        `action          | 上传接口地址  | string | -- |--`,
        `headers               | 上传接口需要携带的请求头，如token | Object| --| --`,
        `key               | 接口返回的字段(目前不支持配置) | String| --| data.url `,
        `callback               | 上传接口的返回回调 | function | --| --|`,
        ],
        tableHead3: `事件名称  |    说明	| 回调参数 `,
        tableBody3: [
               `getFormList| 获取 表单数据 | data：返回表单列表`,
        ]
      }
    },
  }
</script>