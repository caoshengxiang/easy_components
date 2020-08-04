<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/area1.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{statisticsInfo.orgNum}}</span>人</div>
            <div class="analysis-text-small">当前机构总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/area.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{statisticsInfo.postNum}}</span></div>
            <div class="analysis-text-small">当前岗位总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/area.png" height="50" width="50"/>
          <div class="text">
            <div class="analysis-text"><span class="tag">{{statisticsInfo.staffNum}}</span></div>
            <div class="analysis-text-small">当前人员总数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="listQuery" :get-page-list="getList">
      <template slot="left">
        <!--      <el-button class="filter-item" icon="el-icon-plus" style="margin-left: 0px;" type="primary" @click="handleAdd">-->
        <!--        新增-->
        <!--      </el-button>-->
        <PermissionButton
          menu-no="_views_set_organization_add"
          class="filter-item"
          icon="el-icon-plus"
          type="primary"
          name=""
          round
          @click="handleAdd"
        />
        <el-input
          v-model="listQuery.name"
          placeholder="部门名称"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
      </template>
      <template slot="right">
        <el-button class="filter-item" type="primary" round @click="searchList">
          搜索
        </el-button>

        <!--      <el-button class="filter-item download-button" type="primary" icon="el-icon-edit">导出</el-button>-->
        <PermissionButton
          menu-no="_views_set_organization_export"
          class-name="filter-item"
          type="primary"
          name=""
          round
          @click="exportHandle"
        />
      </template>
      <el-table
        :key="tableKey"
        slot="table"
        v-loading="listLoading"
        :data="pageData.records"
        fit
        highlight-current-row
      >
        <el-table-column label="部门代码" align="center" min-width="150">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门名称" min-width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级部门" min-width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.parentName || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" min-width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
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
            <PermissionButton
              menu-no="_views_set_organization_edit"
              type="primary"
              size="mini"
              name=""
              round
              @click="handleUpdate(row)"
            />
            <!--          <el-button type="danger" size="mini" @click="handleDelete(row)">-->
            <!--            删除-->
            <!--          </el-button>-->
            <PermissionButton
              menu-no="_views_set_organization_remove"
              type="danger"
              size="mini"
              name=""
              round
              @click="(data) =>{handleDelete(row, data)}"
            />
          </template>
        </el-table-column>
      </el-table>
    </y-page-list-layout>
    <el-dialog
      width="600px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        v-loading="dialogLoading"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="部门代码：" prop="code">
          <el-input v-model="temp.code" class="filter-item" />

        </el-form-item>
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="temp.name" class="filter-item" />
        </el-form-item>

        <el-form-item label="上级部门：" filterable prop="">
          <el-select v-model="temp.parentId" class="filter-item" style="float: left;width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in partOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="联系电话：">
          <el-input v-model="temp.phone" class="filter-item" />
        </el-form-item>
        <el-form-item label="">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            保存
          </el-button>
        </el-form-item>
      </el-form>
<!--      <div slot="footer" class="dialog-footer" style="text-align: center">-->
<!--        -->
<!--      </div>-->
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import YPageListLayout from '@/components/YPageListLayout'

  export default {
    name: 'PostIndex',
    components: {
      Breadcrumb,
      PermissionButton,
      YPageListLayout
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
        pageData: {records: []},
        listLoading: false,
        dialogLoading: false,
        listQuery: {
          current: 1,
          size: 10,
          descs: 'id'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          code: '',
          name: 1,
          parentId: '',
          phone: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑',
          create: '新增'
        },
        rules: {
          code: [{
            required: true,
            message: '请填写编码',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写名称',
            trigger: 'blur'
          }],
          parentId: [{
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }]
        },
        partOptions: [],
        statisticsInfo: {}
      }
    },
    created() {
      this.getPartSelect()
      this.getList()
      this.$api.organization.sta().then(res => {
        this.statisticsInfo = res.data
      })
    },
    methods: {
      exportHandle() {
        this.$api.organization.download()
      },
      resetTemp() {
        this.temp = {
          code: '',
          name: 1,
          parentId: '',
          phone: ''
        }
      },
      getPartSelect() {
        this.$api.organization.simpleAll().then(res => {
          this.partOptions = res.data
        })
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
            this.dialogLoading = true
            this.$api.organization.add(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
            }).catch(()=> {
              this.dialogLoading = false
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$api.organization.edit(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
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
      searchList() {
        this.listQuery.current = 1
        this.getList()
      },
      getList() {
        const that = this
        this.listLoading = true
        // console.log(that.listQuery)
        this.$api.organization.list(that.listQuery).then(res => {
          that.pageData = res.data
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
            this.$api.organization.delete(row.id).then(res => {
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
<style scoped lang="scss">
</style>
