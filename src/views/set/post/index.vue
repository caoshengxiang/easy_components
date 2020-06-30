<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>

      <el-button class="filter-item download-button" type="primary" icon="el-icon-edit">
        导出
      </el-button>
    </div>
    <div class="filter-container" style="float: left;margin-top: 10px;">
      <el-button class="filter-item" icon="el-icon-plus" style="margin-left: 0px;" type="primary" @click="handleAdd">
        新增岗位
      </el-button>
    </div>
    <div class="filter-container" style="float: right;margin-top: 10px;">
      <el-input
        v-model="listQuery.description"
        placeholder="岗位名称关键字"
        prefix-icon="el-icon-search"
        style="margin-left: 20px;width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="getList">
        搜索
      </el-button>
    </div>
    <el-table

      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="岗位编码" align="center" min-width="150">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位名称" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.part }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主要职责" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.work }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
          <el-button type="warning" size="mini" @click="handleSetAuth(row)">
            权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog width="600px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="岗位编码：" prop="num">
          <el-input v-model="temp.num" class="filter-item"/>

        </el-form-item>
        <el-form-item label="岗位名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item"/>
        </el-form-item>

        <el-form-item label="所属部门：" filterable prop="part">
          <el-select v-model="temp.partId" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in partOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="主要职责：">
          <el-input v-model="temp.word" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'

  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'PostIndex',
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
        tableKey: 0,
        list: [],
        total: 20,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: '',
          num: '',
          name: 1,
          partId: '',
          part: '',
          work: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑岗位',
          create: '新增岗位'
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
        partOptions: [
          {
            name: '园区实训基地',
            id: 1
          },
          {
            name: '综合部',
            id: 2
          },
          {
            name: '电子机械部',
            id: 6
          },
          {
            name: '信息部',
            id: 3
          },
          {
            name: '财务室',
            id: 4
          },
          {
            name: '教职工',
            id: 5
          }
        ]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      resetTemp() {
        this.temp = {
          id: '',
          num: '',
          name: 1,
          part: '',
          work: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '岗位创建成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAdd() {
        this.temp = Object.assign({}) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑岗位成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleFilter() {

      },
      getList() {
        const that = this
        console.log(that.listQuery)
        that.list = [{
          id: 1,
          num: 'P001',
          name: '实训基地行政',
          part: '园区实训基地',
          work: '',
          created: '2020-06-24 11:12:00'
        }, {
          id: 2,
          num: 'P002',
          name: '综合部教师',
          part: '综合部',
          work: '',
          created: '2020-06-24 11:12:00'
        }, {
          id: 3,
          num: 'P002',
          name: '招就合作企业',
          part: '招生就业处',
          work: '招生',
          created: '2020-06-24 11:12:00'
        }]

        that.listLoading = false
      },
      handleDelete(row, index) {
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            that.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(err => { console.error(err) })
      },
      handleSetAuth(row) {
        this.$router.push({ name: 'postAuth',
          query: {
            parentMenuId: this.$route.query.parentMenuId,
            id: row.id
          }
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
