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
  import FixedThead from '../../../../../src/components/BaseTable/FixedThead'
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
