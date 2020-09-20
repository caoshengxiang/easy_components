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

### 1.基础用法

<table-generateTable/>

```vue
<template>
  <div class="container" v-loading="loading">
    <fixed-thead
      :total="total"
      :table-data="tableData"
      :default-form-thead="defaultFormThead"
      @pageQueryChange="pageQueryChange"
    >
      <el-table-column
        fixed="right"
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handle(scope.row, '编辑')">编辑</el-button>
          <el-button type="text" size="small" @click="handle(scope.row, '删除')">删除</el-button>
        </template>
      </el-table-column>
    </fixed-thead>
  </div>
</template>

<script>
  import FixedThead from '../../../../src/components/BaseTable/FixedThead'
  import defaultFormThead from './tableSet'

  export default {
    name: 'generateTable',
    components: { FixedThead },
    data() {
      return {
        loading: false,
        defaultFormThead: defaultFormThead,
        pageForm: {
          size: 20,
          current: 1
        },
        total: 200,
        tableData: [{
          t1: 'xx001',
          t2: '166',
          t3: 'xx',
          t4: '正常',
          t5: 'A',
          t6: '红色',
          t7: '2020-10-11',
        }]
      }
    },
    methods: {
      pageQueryChange(pageForm) {
        this.pageForm = pageForm
        this.getList()
      },
      getList() {
        // 列表api
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000)
      },
      handle(row, type) {
        this.$message.success(type)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>



```
### tableSet.js
```js

import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '单车编号',
  disabled: true,
  sortable: true,
  width: '200px',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name',
  styleObject: {
    color: 'red'
  }
}, {
  key: 't2',
  name: '电子牌照'
}, {
  key: 't3',
  name: '蓝牙标识'
}, {
  key: 't4',
  name: '车况'
}, {
  key: 't5',
  name: '车辆型号'
}, {
  key: 't6',
  name: '颜色'
}, {
  key: 't7',
  name: '注册时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t7).format('YYYY-MM-DD') // 时间处理
  }
}]
export default defaultFormThead

```


## 属性 props

|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|
|colCanConfig|是否能配置（提供用户选项字段的显示隐藏）el-table-column 单元格的显示隐藏|boolean|true/false|默认false|
|tableData|必须，表单数据，接口获取到数据|Array|--|--|
|total|必须，总数|number|--|--|
|defaultFormThead|必须， 表单配置|Array 对象数组\[{col}]每个col代表一个域配置|--|--|

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


|参数|说明|类型|可选值|	默认值|
|---|----|---|---|---|


## 事件
|事件名称  |    说明	| 回调参数 |
|-------- |---------| --------|
|cell-click|单元格的点击事件||
|row-dblclick|行 双击事件||
|pageQueryChange|分页参数改变||

## slots
|名称|说明|
|------|-------|
|默认|最后添加el-table-column ， 一般用于操作列|


## 方法

无


## 组件源

高新区共享单车项目

