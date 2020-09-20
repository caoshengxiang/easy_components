# 单图上传
## 说明
<el-alert
    title="注意："
    type="warning"
    description="该组件目前需要，在不同项目，修改上传接口 （beforeAvatarUpload函数内），后续会优化调整"
    :closable="false"
    show-icon>
  </el-alert>
  
修改方法：找到@/components/Upload/UploadImage.vue 文件， 修改beforeAvatarUpload函数
```js
       beforeAvatarUpload(file, key) {
         // const isJPG = file.type === 'image/jpeg'
         // const isPNG = file.type === 'image/png'
         const isImg = file.type.indexOf('image') > -1
         const isLt10M = file.size / 1024 / 1024 < this.imageSize
 
         if (!isImg) {
           this.$message.error('上传图片只能是 图片 格式!')
           return false
         }
         if (!isLt10M) {
           this.$message.error(`上传图片大小不能超过 ${this.imageSize}MB!`)
           return false
         }
 
         const param = new FormData()
         param.append('file', file, file.name)
         this.$api.common.upload(param).then((res) => {
           this.emitInput(res.data.url)
         })
         return false
       }

// 1.this.$api.common.upload 接口改为你的，
// 2.并把 this.emitInput(res.data.url) 中 `res.data.url` 改为你的接口返回的url字段
```

## 依赖
 * element-ui

## 安装

1. 使用时引入
```js
// 页面
  import UploadImage from '@/components/Upload/UploadImage'
export default {
    components: {
      UploadImage,
    },
}
```
2. 全局引入
```js
// main.js文件中引入
  import UploadImage from '@/components/Upload/UploadImage'
Vue.component('UploadImage', UploadImage)
```

## 使用

### 1.基础用法

<upload-sampleImage/>

```vue
<template>
  <div>
    <UploadImage v-model="img"/>
  </div>
</template>

<script>
  import UploadImage from '../../../../src/components/Upload/UploadImage'

  export default {
    name: 'sampleImage',
    components: {
      UploadImage
    },
    data() {
      return{
        img: ''
      }
    }
  }
</script>

<style scoped>

</style>

```
### 案例2


## 属性 props

|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|
|value / v-model|绑定值|String|--|--|
|imageSize|文件不超过的大小， 单位MB|number|--|10|



## 事件
|事件名称  |    说明	| 回调参数 |
|-------- |---------| --------|


## slots

无

## 方法

无


## 组件源

[学校项目](http://www.snsme.cn/)

