# 文档表格

## 说明
>> 1. titile为表格标题，tableHead为表头，tableBody为具体参数设置，并且支持el-table的table参数
>> 2. vuepress里的每个.md其实和.vue很像的，你基本可以按照vue组件模式来写
>> 3. 一个小技巧 可以先使用 vue 代码块编写，可以有代码提示和高亮，最后去掉
>> 4. 和vue一样，也可以设置样式，并且这里style样式只对当前md有效，不需要加上scoped

<!-- 组件的参数表格,没有使用自带的markdown表格，因为太丑，样式不好修改，有时参数描述较少时，不能自动撑满一行，所以自己写了一个组件；titile为表格标题，tableHead为表头，tableBody为具体参数设置，并且支持el-table的table参数 -->
<baseComponent-apiTable title="Attributes" :tableBody="tableBody" :tableHead="tableHead">
</baseComponent-apiTable>

<!-- vuepress里的每个.md其实和.vue很像的，你基本可以按照vue组件模式来写 -->
<script>
  export default {
    data() {
      return {
        //表头为字符串，写法和md一样，中间以`|`间隔就行
        tableHead: `参数 | 说明 | 类型 | 可选值 | 默认值`,
        //表格数据为数组，其中每一项为字符串，代表每一行要展示的数据，写法也和md一样，中间以`|`间隔就行
        tableBody: [
          `size | 尺寸 | String | medium / small / mini | —`,
          `type |	类型 | string |	primary / success / warning / danger / info / text | —`
        ],
      }
    },
  }
</script>

<!-- 和vue一样，也可以设置样式，并且这里style样式只对当前md有效，不需要加上scoped -->
<style>
</style>