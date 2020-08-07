<template>
  <el-table
    v-loading="loading"
    :data="data"
    fit
    :max-height="maxHeight"
    highlight-current-row
    :header-cell-style="{backgroundColor:'#EFF1F6'}"
    slot="table"
  >
    <slot></slot>
  </el-table>
</template>

<script>
  export default {
    name: 'parentTable',
    props: {
      data: {
        default() {
          return []
        },
        require: true
      }
    },
    computed: {
      maxHeight() {
        let clientHeight = document.documentElement.clientHeight
        return clientHeight-310
      }
    }
  }
</script>

<style scoped>

</style>
