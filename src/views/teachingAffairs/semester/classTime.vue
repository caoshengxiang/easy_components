<template>
  <div class="app-container">
    <div class="title-container">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>

      <!--      <el-button class="filter-item download-button" type="primary" icon="el-icon-edit">-->
      <!--        导出-->
      <!--      </el-button>-->
      <div class="filter-container" style="float: left;margin-top: 10px;">
<!--        <el-button v-if="value" class="filter-item" icon="el-icon-plus" style="margin-left: 10px;" type="primary" @click="handleAdd">-->
<!--          新增类型-->
<!--        </el-button>-->
      </div>
      <div class="filter-container" style="float: right;margin-top: 10px;">
        <span style="color: #cccccc;font-size: 10px;">(编辑完成上课信息，点击保存)</span>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="save">
          保存
        </el-button>
      </div>
    </div>
    <div class="filter-container" style="float: right;margin-top: 10px;">

    </div>
    <el-table

      :key="tableKey"
      v-loading="listLoading"
      :data="tableData.children"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" align="center" min-width="60">
        <template slot-scope="{row, $index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段" min-width="100" align="center">
        <template slot-scope="{row}">
          <!--          <span>{{ row.name }}</span>-->
          <el-select v-model="row.name" clearable filterable placeholder="请选择" class="filter-item">
            <el-option label="上午" value="上午"></el-option>
            <el-option label="下午" value="下午"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="节次" min-width="150" align="center">
        <template slot-scope="{row}">
          <!--          <span>{{ row.des }}</span>-->
          <el-input v-model="row.des"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="课间活动" min-width="100" align="center">
        <template slot-scope="{row}">
          <!--          <span>{{ row.des }}</span>-->
          <el-select v-model="row.name" clearable filterable placeholder="请选择" class="filter-item">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="上课时间" min-width="200" align="center">
        <el-time-picker
          v-model="value"
          is-range
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          style="width: 100%"
        >
        </el-time-picker>
      </el-table-column>
      <el-table-column label="创建人" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
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

    <!--    <el-dialog width="600px" title="" :visible.sync="dialogFormVisible">-->
    <!--      <el-form-->
    <!--        ref="dataForm"-->
    <!--        :rules="rules"-->
    <!--        :model="temp"-->
    <!--        label-position="right"-->
    <!--        label-width="110px"-->
    <!--        style="width: 400px; margin-left:50px;"-->
    <!--      >-->
    <!--        <el-form-item label="岗位编码：" prop="num">-->
    <!--          <el-input v-model="temp.num" class="filter-item"/>-->

    <!--        </el-form-item>-->
    <!--        <el-form-item label="岗位名称：" prop="name">-->
    <!--          <el-input v-model="temp.name" class="filter-item"/>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item label="所属部门：" filterable prop="part">-->
    <!--          <el-select v-model="temp.partId" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">-->
    <!--            <el-option-->
    <!--              v-for="item in partOptions"-->
    <!--              :key="item.id"-->
    <!--              :label="item.name"-->
    <!--              :value="item.id"-->
    <!--            />-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item label="主要职责：">-->
    <!--          <el-input v-model="temp.word" class="filter-item"/>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
    <!--        <el-button @click="dialogFormVisible = false">-->
    <!--          取消-->
    <!--        </el-button>-->
    <!--        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
    <!--          保存-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'DataIndex',
    components: {
      Breadcrumb,
      // Pagination
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
        value: null,

        tableKey: 0,
        listLoading: true,
        dialogFormVisible: false,
        tableData: {
          name: '',
          key: '',
          des: '',
          children: [
            {
              name: '',
              des: '',
              status: 1
            }
          ]
        },
        rules: {
          num: [{
            required: true,
            message: '请填写岗位编码',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写岗位名称',
            trigger: 'blur'
          }],
          part: [{
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      resetTemp() {
        this.tableData = {
          name: '',
          key: '',
          des: '',
          children: []
        }
      },
      selectChange(data) {
        this.resetTemp()
        this.options.forEach(item => {
          if (item.key === data) {
            this.tableData = item
          }
        })
      },
      handleFilter() {

      },
      getList() {
        const that = this
        that.listLoading = false
      },
      handleAdd() {
        this.value = ''
        this.resetTemp()
      },
      save() {},
      handleDelete(row, index) {
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            that.tableData.children.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })
      },
      addRow() {
        this.tableData.children.push({
          name: '',
          des: '',
          status: 1
        })
      }
    }
  }
</script>
<style>
  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right
  }
</style>
