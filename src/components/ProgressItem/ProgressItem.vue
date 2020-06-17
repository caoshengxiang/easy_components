<!--
布局项占位组件
2019.4.17 姚政伟 创建
-->
<template>
  <div class="progress-item" :style="`display:inline-block;background-color:#eee;width:${width};height:${height}`">222222222222222222222222</div>
</template>

<script>
  export default {
    name: 'ProgressItem',
    props: {
      width: {
        type: String,
        required: false,
        default:'100%'
      },
      height: {
        type: String,
        required: false,
        default:'100%'
      }
    }
  }
</script>
