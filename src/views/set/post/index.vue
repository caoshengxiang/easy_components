<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" style="float: left"/>

      <el-button class="filter-item download-button" type="primary" icon="el-icon-edit">导出</el-button>
      <!--      <PermissionButton menu-no="" class-name="filter-item download-button" type="primary" icon="el-icon-edit" name="导出"/>-->
    </div>
    <div class="filter-container" style="float: left;margin-top: 10px;">
      <!--      <el-button class="filter-item" icon="el-icon-plus" style="margin-left: 0px;" type="primary" @click="handleAdd">-->
      <!--        新增岗位-->
      <!--      </el-button>-->
      <PermissionButton menu-no="_views_set_post_add" class="filter-item" icon="el-icon-plus" type="primary" name="新增岗位" @click="handleAdd"/>
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
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位名称" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主要职责" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.duty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
          <!--            编辑-->
          <!--          </el-button>-->
          <PermissionButton menu-no="_views_set_post_edit" type="primary" size="mini" name="编辑" @click="handleUpdate(row)"/>
          <!--          <el-button type="danger" size="mini" @click="handleDelete(row)">-->
          <!--            删除-->
          <!--          </el-button>-->
          <PermissionButton menu-no="_views_set_post_remove" type="danger" size="mini" name="删除" @click="(data) =>{handleDelete(row, data)}"/>
          <!--          <el-button type="warning" size="mini" @click="handleSetAuth(row)">-->
          <!--            权限-->
          <!--          </el-button>-->
          <PermissionButton menu-no="_views_set_post_auth" type="warning" size="mini" name="权限" :page-jump="true" :page-query="{id: row.id}"/>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <el-dialog
      width="600px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="岗位编码：" prop="code">
          <el-input v-model="temp.code" class="filter-item"/>

        </el-form-item>
        <el-form-item label="岗位名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item"/>
        </el-form-item>

        <el-form-item label="所属部门：" filterable prop="orgId">
          <el-select v-model="temp.orgId" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in partOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="主要职责：">
          <el-input v-model="temp.duty" class="filter-item"/>
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
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'PostIndex',
    components: {
      Breadcrumb,
      Pagination,
      PermissionButton,
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
        total: 0,
        listLoading: false,
        listQuery: {
          current: 1,
          size: 20
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          code: '',
          name: 1,
          orgId: '',
          duty: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑岗位',
          create: '新增岗位'
        },
        rules: {
          code: [{
            required: true,
            message: '请填写岗位编码',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写岗位名称',
            trigger: 'blur'
          }],
          orgId: [{
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
          code: '',
          name: 1,
          orgId: '',
          duty: ''
        }
      },
      // handleCreate() {
      //   this.resetTemp()
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$api.post.add(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '岗位创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$api.post.edit(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '岗位编辑成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
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
      handleFilter() {

      },
      getList() {
        const that = this
        this.listLoading = true
        // console.log(that.listQuery)
        this.$api.post.list(that.listQuery).then(res => {
          that.list = res.data.records
          that.total = res.data.total
          setTimeout(() => {
            that.listLoading = false
          }, 200)
        }).catch(() => {
          that.listLoading = false
        })
      },
      handleDelete(row, data) {
        // console.log(data)
        const that = this
        that.$confirm('确认删除当前记录吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            this.$api.post.delete(row.id).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getList()
              }
            })
          })
          .catch(err => { console.error(err) })
      },
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
