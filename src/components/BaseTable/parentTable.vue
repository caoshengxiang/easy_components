<template>
  <el-table
    v-loading="loading"
    :data="data"
    fit
    :max-height="maxHeight"
    highlight-current-row
    :header-cell-style="{backgroundColor:'#eef2fe'}"
    slot="table"
    @selection-change="selectionChange"
    style="border-left: 1px solid #EBECED;border-right: 1px solid #EBECED"
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
    },
    methods: {
      selectionChange(val) {
        this.$emit('selectionChange', val)
      }
    }
  }
</script>

<style scoped>

</style>
