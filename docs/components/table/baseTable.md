# 配置 生成表格
## 说明
通过配置生产表格


## 依赖
 * element-ui


## 安装

1. 使用时引入
```js
// 页面
import FixedThead from '@/components/BaseTable/FixedThead'
export default {
    components: {
      FixedThead,
    },
}
```
2. 全局引入
```js
// main.js文件中引入
import Vue from 'vue'
import FixedThead from '@/components/BaseTable/FixedThead'
Vue.component('FixedThead', FixedThead)
```

## 使用

<baseComponent-codeBox
  title="基础用法"
  description="通过配置tableSet.js,不引入。生成表格，也可以直接吧配置写在组件data内"
  onlineLink="">
  <table-generateTable/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/table/generateTable.vue
  </highlight-code>
</baseComponent-codeBox>



<baseComponent-codeBox
  title="tableSet.js"
  description=""
  onlineLink="">
    <div>展开查看配置</div>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="js">
<<< @/docs/.vuepress/components/table/tableSet.js
  </highlight-code>
</baseComponent-codeBox>

## 属性 props

<baseComponent-apiTable title="" :tableBody="tableBody" :tableHead="tableHead">
</baseComponent-apiTable>

### defaultFormThead 说明

数组每一项代表一个列的配置对象
```js
{
    key: '', // 字段， 【必填】
    name: '', // 字段名称，【必填】
    disabled: Boolean, // 表头显示不可配置, 和colCanConfig同为true生效
    sortable:  Boolean, // 是否排序，这个是前端排序，如果需要后端排序，需将sortable设置为'custom'，同时在 Table 上监听sort-change事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据
    width: 'auto' // 默认auto， 设置如160px 或 160，表格固定宽度，无则自动
    minWidth: '', // 默认140px
    formatter: Function // 用来格式化内容
    className: String, // 列的 className, 如果只改变单元格不该标题需要和labelClassName配合使用
    labelClassName: String, // 当前列标题的自定义类名
    showOverflowTooltip, 默认true, 显示超出提示
    --
    slot: true, // 是否使用<template slot-scope="scope">{{scope.row}}</template> 方式显示数据, slot为true formatter将失效
    styleObject: { color: 'red' } // 设置显示文本style 对象， 必选设置slot 为true
    // 需要对某种数据类型单独处理时
    state_type: [{ label: '预警中', value: 1 }] // 固定格式，type映射中文, 处理slot为true formatter将失效的问题，必须注意格式只能固定
    type_style: { // 字段，对应 key 字段的不同数据需要展示的样式字典, 【styleObject是type_style的父元素样式】
      1: { color: 'red' }
    }
  }
```


## 事件

<baseComponent-apiTable title="" :tableBody="tableBody2" :tableHead="tableHead2">
</baseComponent-apiTable>

## slots

<baseComponent-apiTable title="" :tableBody="tableBody3" :tableHead="tableHead3">
</baseComponent-apiTable>

## 方法

无


## 组件源

高新区共享单车项目



<script>
  export default {
    data() {
      return {
        tableHead: `参数|说明|类型|可选值|	默认值`,
        tableBody: [
            `colCanConfig|是否能配置（提供用户选项字段的显示隐藏）el-table-column 单元格的显示隐藏|boolean|true/false|默认false`,
            `tableData|必须，表单数据，接口获取到数据|Array|--|--`,
            `total|必须，总数|number|--|--`,
            `defaultFormThead|必须， 表单配置|Array 对象数组\[{col}]每个col代表一个域配置|--|--`,
        ],
        tableHead2: `事件名称  |    说明\t| 回调参数`,
        tableBody2: [
              `cell-click|单元格的点击事件|--`,
              `row-dblclick|行 双击事件|--`,
              `pageQueryChange|分页参数改变|--`,
        ],
        tableHead3: `名称|说明`,
        tableBody3: [
               `默认|最后添加el-table-column ， 一般用于操作列`,
        ]
      }
    },
  }
</script>