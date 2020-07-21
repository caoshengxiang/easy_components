<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>
    </div>
    <div class="analysis">
      <div class="menu-2-box"/>
    </div>
    <div class="filter-main-div">
      <div class="filter-container" style="width:70%; float: left;">
        <div>
          <span class="filter-item">类型列表:</span>
          <el-select v-model="dataId" clearable filterable placeholder="请选择" class="filter-item" @change="selectChange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button
            v-if="dataId"
            class="filter-item"
            icon="el-icon-plus"
            style="margin-left: 10px;"
            type="primary"
            @click="handleAdd"
          >
            新增类型
          </el-button>
        </div>
        <div>
          <span style="display: inline-block">
            <span style="display: inline-block">
              <span class="filter-item">类型名称:</span>
              <el-input v-model="detail.name" style="margin-left: 20px;width: 200px;" class="filter-item"/>
            </span>
            <span class="filter-item">唯一标识:</span>
            <el-input v-model="detail.code" style="margin-left: 20px;width: 200px;" class="filter-item"/>
          </span>
          <span style="display: inline-block">
            <span class="filter-item">描述:</span>
            <el-input v-model="detail.remark" style="margin-left: 20px;width: 200px;" class="filter-item"/>
          </span>
        </div>
      </div>

      <div class="filter-container" style="width:30%;float: right;text-align: right">
        <span v-if="!dataId" style="color: #cccccc;font-size: 10px;">(填写下方信息，保存即可新增)</span>
        <span v-if="dataId" style="color: #cccccc;font-size: 10px;">(编辑完成类型信息，点击保存)</span>
        <!--        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="getList">-->
        <!--          保存-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_set_data_save"
          class-name="filter-item"
          icon="el-icon-edit"
          type="primary"
          name=""
          @click="saveHandle"
        />
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="编号" align="center" min-width="150">
          <template slot-scope="{row, $index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="150" align="center">
          <template slot-scope="{row}">
            <!--          <span>{{ row.name }}</span>-->
            <el-input v-model="row.name"/>
          </template>
        </el-table-column>
        <el-table-column label="描述" min-width="150" align="center">
          <template slot-scope="{row}">
            <!--          <span>{{ row.remark }}</span>-->
            <el-input v-model="row.remark"/>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" min-width="150" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.enabled">禁用</el-button>
            <el-button v-else>启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-button style="margin: 10px auto;" type="primary" icon="el-icon-plus" @click="addRow">
          添加数据列
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  // import Pagination from '@/components/Pagination'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'DataIndex',
    components: {
      Breadcrumb,
      PermissionButton
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        dataId: '',
        options: [],
        detail: {},
        tableKey: 0,
        listLoading: true,
        tableData: [],
        tableDataDel: [], // 编辑时已经被删除的
        rules: {
          // num: [{
          //   required: true,
          //   message: '请填写岗位编码',
          //   trigger: 'change'
          // }],
          // name: [{
          //   required: true,
          //   message: '请填写岗位名称',
          //   trigger: 'blur'
          // }],
          // part: [{
          //   required: true,
          //   message: '请选择所属部门',
          //   trigger: 'change'
          // }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      resetTemp() {
        this.detail = {}
        this.tableData = []
        this.tableDataDel = []
      },
      selectChange(id) {
        this.resetTemp()
        this.$api.dictData.detail(id).then(res => {
          this.detail = res.data
        })
        this.$api.dictData.getByTypeId({ dictTypeId: id }).then(res => {
          this.tableData = res.data
        })
      },
      saveHandle() {
        if (this.dataId) {
          // 编辑
          this.$api.dictData.saveOrUpdate(Object.assign({}, this.detail, { datas: this.tableData.concat(this.tableDataDel) })).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        } else {
          // 新增
          this.$api.dictData.saveOrUpdate(Object.assign({}, this.detail, { datas: this.tableData })).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.resetTemp()
            }
          })
        }
      },
      getList() {
        const that = this
        this.$api.dictData.simpleAll().then(res => {
          this.options = res.data
        })
        that.listLoading = false
      },
      handleAdd() {
        this.dataId = ''
        this.resetTemp()
      },
      handleDelete(row, index) {
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            if (row.id) {
              row.deleted = true
              that.tableDataDel.push(row)
            }
            that.tableData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })
      },
      addRow() {
        this.tableData.push({
          name: '',
          remark: '',
          enabled: 1
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .analysis {
    background-color: white;
    flex: 1;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
      margin-bottom: 8px;
    }

    .menu-2-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-left: 2px;
      padding-top: 2px;
    }

    .menu-2-item {
      display: flex;
      align-items: center;
      color: #656565;
      font-size: 12px;
      width: 230px;
      height: 101px;
      background: rgb(255, 185, 129);
      border-radius: 3px;
      padding-left: 20px;
      margin-right: 10px;
      padding-top: 2px;
      margin-bottom: 2px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .text {
        margin-left: 16px;
      }
    }
  }
</style>
