<template>
  <el-table
    ref="table"
    slot="table"
    size="medium"
    :data="data"
    fit
    :max-height="maxHeight"
    highlight-current-row
    :header-row-style="{color: '#333333'}"
    style="border-left: 1px solid #EBECED;border-right: 1px solid #EBECED;color: #333333;"
    @selection-change="selectionChange"
    @sort-change="sortChange"
  >
    <slot></slot>
  </el-table>
</template>

<script>
  import { underscoreName } from '@/utils/index'

  export default {
    name: 'parentTable',
    props: {
      data: {
        default() {
          return []
        },
        require: true,
        type: Array,
      },
      noPage: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      maxHeight() {
        let plus = this.noPage ? 100 : 0
        let clientHeight = document.documentElement.clientHeight
        return clientHeight - 310 + plus
      }
    },
    methods: {
      selectionChange(val) {
        this.$emit('selectionChange', val)
      },
      sortChange(val) {
        let sortParam = {}
        if (val.order === 'ascending') {
          sortParam.ascs = underscoreName(val.prop)
          sortParam.descs = null
        } else if (val.order === 'descending') {
          sortParam.descs = underscoreName(val.prop)
          sortParam.ascs = null
        } else {
          sortParam.descs = 'id'
          sortParam.ascs = null
        }

        this.$emit('sortTable', sortParam)
      }
    }
  }
</script>

<style scoped>

</style>
