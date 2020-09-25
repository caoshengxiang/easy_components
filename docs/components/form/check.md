# 表单域 校验

## 说明

是对el-from 表单域自定义校验封装库

## 依赖
 * element-ui
 

## 安装

1. 使用时引入
```js
// 页面
/* 表单验证 */
  import { filedRequired, filedType, filedLength, filedValidator, validate } from '../../../utils/fieldValidation'
```

## 使用

<baseComponent-codeBox
  title="基础用法"
  description=""
  onlineLink="">
  <demo-form-elFormFieldValidation/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/demo/form/elFormFieldValidation.vue
  </highlight-code>
</baseComponent-codeBox>



## 属性 props

|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|


### uploadOptions 对象说明
|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|


## 事件
|事件名称  |    说明	| 回调参数 |
|-------- |---------| --------|


## slots

无

##方法

<baseComponent-apiTable title="" :tableBody="tableBody" :tableHead="tableHead">
</baseComponent-apiTable>

## 组件源

[遂企云项目](http://www.snsme.cn/)

<script>
  export default {
    data() {
      return {
        tableHead: `方法  |    说明\t| 回调参数 `,
        tableBody: [
          `filedRequired| 验证必填| --`,
          `filedLength| 验证长度| --`,
          `filedType| 验证数据类型| --`,
          `filedValidator| 自定义规则函数| --`,
          `validatePhone| 自定义规则验证手机号| --`,
          `validateBeforeTime| 不能选以前的时间验证| --`,
          `validateInteger| 验证大于零的整数| --`,
          `validateChinese| 验证中文| --`,
          `validateZm| 验证英文字母| --`,
          `validateEmail| 验证邮箱| --`,
          `validateIdCard| 验证省份证| --`,
          `validateMoney| 验证金额，精确到2位小数| --`,
        ],
      }
    },
  }
</script>