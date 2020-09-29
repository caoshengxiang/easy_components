# 文件上传
## 说明
<el-alert
    title="注意："
    type="warning"
    description="该组件目前需要，在不同项目，修改上传接口 （beforeAvatarUpload函数内），后续会优化调整"
    :closable="false"
    show-icon>
  </el-alert>
  
修改方法：找到@/components/Upload/uploadFile.vue 文件， 修改beforeAvatarUpload函数
```js
// 1.this.$api.common.upload 接口改为你的，
// 2.并把 this.emitInput(res.data.url) 中 `res.data.url` 改为你的接口返回的url字段
```

## 依赖
 * element-ui

## 安装或路径

```js
// 页面
  import UploadImage from '@/components/Upload/uploadFile'
  export default {
      components: {
        UploadImage,
      },
  }
```
## 使用

### 1.基础用法


<baseComponent-codeBox
  title=""
  description="默认限制一个文件"
  onlineLink="">
  <demo-upload-uploadFile_limit1/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/demo/upload/uploadFile_limit1.vue
  </highlight-code>
</baseComponent-codeBox>


### 2.支持多文件

<baseComponent-codeBox
  title=""
  description="设置limit，可限制文件个数（案例未接入上传接口因此数量限制不会生效）"
  onlineLink="">
  <demo-upload-uploadFile_limit4/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/demo/upload/uploadFile_limit4.vue
  </highlight-code>
</baseComponent-codeBox>



## 属性 props

<baseComponent-apiTable title="" :tableBody="tableBody" :tableHead="tableHead">
</baseComponent-apiTable>



## 事件
无


## slots

无

## 方法

无


## 组件源

[学校项目](http://www.snsme.cn/)


<script>
  export default {
    data() {
      return {
        tableHead: `参数|说明|类型|可选值|	默认值`,
        tableBody: [
          `value / v-model|绑定值|String|--|--`,
          `imageSize|文件不超过的大小， 单位MB|number|--|10 (单位MB)`,
          `limit| 上传文件个数 | Number|--| 1`,
          `prefix| 需要添加的前缀，用于接口返回的相对地址的情况|String|--|''`,
        ],
      }
    },
  }
</script>