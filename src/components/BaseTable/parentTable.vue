<template>
  <el-table
    slot="table"
    size="medium"
    v-loading="loading"
    :data="data"
    fit
    :max-height="maxHeight"
    highlight-current-row
    :header-row-style="{color: '#333333'}"
    style="border-left: 1px solid #EBECED;border-right: 1px solid #EBECED;color: #333333;"
    @selection-change="selectionChange"
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
