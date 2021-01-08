# 文档规范、模板(标题)
## 说明

<el-alert
    title="tips："
    type="warning"
    description="内容"
    :closable="false"
    show-icon>
  </el-alert>


## 依赖
 * 依赖1
 * 依赖2
 * 依赖3
 
 
 安装 yarn add 

 引入
```js
 // 全局引入
    import Vue from 'vue'
```
<el-alert
    title="tips："
    type="warning"
    description=""
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

》<br/>
》 》》》》这里是组件效果<br/>
》<br/>
<el-button type='primary'>这是一个效果</el-button>


```vue
<template>
 <el-button type='primary'>这是一个效果</el-button>
</template>

<script>
  
</script>

<style scoped>

</style>
```
### 案例2


## 属性 props

|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|


### 子 对象说明
|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|


## 事件
|事件名称  |    说明	| 回调参数 |
|-------- |---------| --------|


## slots

无

## 方法

无


## 组件源/ 组件在项目案例

[遂企云项目](http://www.snsme.cn/)

