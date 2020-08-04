<template>
  <div class="app-container">
    <div class="title-container">
      <!--      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>-->

      <!--      <el-button class="filter-item download-button" type="primary" icon="el-icon-edit">-->
      <!--        导出-->
      <!--      </el-button>-->
      <div class="filter-container" style="float: left;margin-top: 10px;">
        <span class="filter-item">类型列表:</span>
        <el-select v-model="value" clearable filterable placeholder="请选择" class="filter-item" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <el-button v-if="value" class="filter-item" icon="el-icon-plus" style="margin-left: 10px;" type="primary" @click="handleAdd">
          新增类型
        </el-button>
      </div>
      <div class="filter-container" style="float: right;margin-top: 10px;">
        <span v-if="!value" style="color: #cccccc;font-size: 10px;">(填写下方信息，保存即可新增)</span>
        <span v-if="value" style="color: #cccccc;font-size: 10px;">(编辑完成类型信息，点击保存)</span>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="getList">
          保存
        </el-button>
      </div>
    </div>
    <div class="filter-container" style="float: right;margin-top: 10px;">
      <span class="filter-item">唯一标识:</span>
      <el-input v-model="tableData.key" style="margin-left: 20px;width: 200px;" class="filter-item"/>
      <span class="filter-item">类型名称:</span>
      <el-input v-model="tableData.name" style="margin-left: 20px;width: 200px;" class="filter-item"/>
      <span class="filter-item">描述:</span>
      <el-input v-model="tableData.des" style="margin-left: 20px;width: 200px;" class="filter-item"/>

    </div>
    <el-table

      v-loading="listLoading"
      :data="tableData.children"
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
          <el-input v-model="row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="150" align="center">
        <template slot-scope="{row}">
<!--          <span>{{ row.des }}</span>-->
          <el-input v-model="row.des"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" min-width="150" align="center">
        <template slot-scope="{row}">
          <el-button v-if="row.status === 1">禁用</el-button>
          <el-button v-if="row.status === 0">启用</el-button>
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
      Pagination
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
        value: '',
        options: [
          {
            name: '课程属性',
            key: 'courseProperties',
            des: '课程的属性分类',
            children: [
              {
                name: '公共基础课',
                des: '基础文化知识',
                status: 1
              },
              {
                name: '专业技能课',
                des: '专业核心技能',
                status: 1
              },
            ]
          },
          {
            name: '课程类型',
            key: 'courseCategory',
            des: '',
            children: [
              {
                name: 'A类(纯理论课)',
                des: '',
                status: 1
              },
              {
                name: 'B类((理论+实践)课)',
                des: '',
                status: 1
              },
              {
                name: 'C类(纯实践课)',
                des: '',
                status: 1
              },
            ]
          }
        ],

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
