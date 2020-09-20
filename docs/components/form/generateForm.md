# 生成表单

## 说明

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

### 1.基础用法

<form-elFormCustom></form-elFormCustom>

```vue
<template>
  <div class="com-pages">
    <fenerate-form
      @getFormList="getFormList"
      :initList="initList"
      :uploadOptions="{
            action: 'http://' + '/file/upload',
            headers: {authKey: userInfo.authKey},
            key: 'data.url',
            callback: callback
          }">
    </fenerate-form>
  </div>
</template>

<script>
  import fenerateForm from '../../../../src/components/generateForm/index'

  export default {
    name: 'elFormCustom',
    data () {
      return {
        userInfo: {
          authKey: 123,
        },
        initList: [],
      }
    },
    components: {
      fenerateForm,
    },
    methods: {
      callback (response, item, formConfig) {
        console.log(response, item, formConfig)
        item.bindValue = response.data.z
        formConfig.formField[item.tempFieldName] = item.bindValue
        formConfig.names[item.name] = item.bindValue
      },
      getFormList (da) {
        console.log(da)
      }
    }
  }
</script>

<style scoped>

</style>
```



## 属性 props

|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|
|uploadOptions          | 上传配置  | object | -- |--|
|initList               | 初始表单，如编辑需要传入| Array| --| --|

### uploadOptions 对象说明
|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|
|action          | 上传接口地址  | string | -- |--|
|headers               | 上传接口需要携带的请求头，如token | Object| --| --|
|key               | 接口返回的字段(目前不支持配置) | String| --| data.url |
|callback               | 上传接口的返回回调 | function | --| --|

## 事件
|事件名称  |    说明	| 回调参数 |
|-------- |---------| --------|
|getFormList| 获取 表单数据 | data：返回表单列表|

## slots

无

## 方法

无


## 组件源

[遂企云项目](http://www.snsme.cn/)
