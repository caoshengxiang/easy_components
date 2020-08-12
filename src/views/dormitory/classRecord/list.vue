<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <!--    <div class="statisticsInfo">-->
    <!--      <div class="menu-2-box">-->
    <!--        <div-->
    <!--          class="menu-2-item hvr-underline-from-center"-->
    <!--        ><img src="../../../assets/p1.png" height="50" width="50"/>-->
    <!--          <div class="text">-->
    <!--            <div class="analysis-text"><span class="tag">男生：{{statisticsInfo.manTotal}} </span></div>-->
    <!--            <div class="analysis-text"><span class="tag">女生：{{statisticsInfo.womanTotal}}</span></div>-->
    <!--            <div class="analysis-text-small">当前床位总数</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div/>-->
    <!--      </div>-->
    <!--    </div>-->
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button class="filter-item" round style="margin-left: 0px;" type="primary" icon="el-icon-plus"
                   @click="handleAdd"
        >
          新增考核统计
        </el-button>
        <el-select
          v-model="listQuery.gradeId"
          placeholder="年级"
          clearable
          style="margin-left:10px;width: 100px"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.specialtyId"
          placeholder="专业"
          clearable
          class="filter-item"
          style=" margin-left:10px;width: 100px"
          @change="getClbumList"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.clbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:10px;width: 100px"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select v-model="listQuery.state" placeholder="是否住满" clearable class="filter-item"
                   style="width: 100px;margin-left: 10px"
        >
          <el-option v-for="item in IsFull" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input
          v-model="listQuery.keyword"
          placeholder="宿舍编号或者负责人"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList"
                   size="mini"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}" size="mini">
          重置
        </el-button>
      </template>
      <template slot="right">
        <el-button class="filter-item" round style="margin-left: 10px;" type="primary"
                   @click="exportClassRecord"
        >
          导出班级宿舍考核
        </el-button>
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <!--    <el-table-->
        <!--      v-loading="listLoading"-->
        <!--      :data="list"-->
        <!--      fit-->
        <!--      highlight-current-row-->
        <!--      style="width: 100%;"-->
        <!--    >-->
        <el-table-column label="年份" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="次数" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班主任">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.content1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="{row}">
            <span>{{ row.content2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本次得分" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.content3 }}</span>
          </template>
        </el-table-column>
        <!--    </el-table>-->
      </parentTable>
    </y-page-list-layout>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px"
               style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="考核次数" prop="type">
          <el-input v-model="temp.type" class="filter-item"/>

        </el-form-item>
        <!--  <el-form-item label="Date" prop="timestamp">
            <el-date-picker v-model="temp.timestamp"  style="float: left;" type="datetime" placeholder="Please pick a date" />
          </el-form-item>-->
        <el-form-item label="年份" prop="title">
          <el-select v-model="temp.title" class="filter-item" style="float: left;" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions1" :key="item.key" :label="item.display_name"
                       :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学期" prop="status">
          <el-select v-model="temp.status" style="float: left;" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="周数" prop="importance" style="width: 800px">
          <el-checkbox-group v-model="importance" style="float: left;">
            <el-checkbox label="1周"/>
            <el-checkbox label="2周"/>
            <el-checkbox label="三周"/>
            <el-checkbox label="四周"/>
            <el-checkbox label="五周"/>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="Remark">
           <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
         </el-form-item>-->
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
    name: 'ViewsDormitoryClassRecordList',
    components: {
      Breadcrumb,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        importance: [],
        listLoading: false,
        pageData: {},
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          descs: 'id',
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        IsFull: [{
          label: '全部',
          value: 0
        }, {
          label: '未住',
          value: 1
        }, {
          label: '未住满',
          value: 2
        }, {
          label: '已住满',
          value: 3
        }],
        calendarTypeOptions1: [
          {
            key: 1,
            display_name: '春季'
          },
          {
            key: 2,
            display_name: '秋季'
          }
        ],
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          importance: this.checkboxVal,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published',
          aaaa: []
        },
        statusOptions: ['published', 'draft', 'deleted'],
        textMap: {
          update: '编辑考核统计',
          create: '新增考核统计'
        },
        rules: {
          type: [{
            required: true,
            message: '请填写考核次数',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择考核年份',
            trigger: 'change'
          }],
          title: [{
            required: true,
            message: '请选择考试学期',
            trigger: 'blur'
          }],
        },
      }
    },
    created() {
      const that = this
      that.getList()
      that.getGradeList()// 赛选框年级
      that.getSpecialtyList()
      that.getClbumList()
    },
    methods: {
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      exportClassRecord() {},
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
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
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
      // handleUpdate(row) {
      //   this.temp = Object.assign({}, row) // copy obj
      //   this.temp.timestamp = new Date(this.temp.timestamp)
      //   this.dialogStatus = 'update'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      getGradeList() {
        const that = this
        that.$api.baseInfo.getGradeList().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getSpecialtyList() {
        const that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.majorInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getClbumList() {
        const that = this
        that.$api.baseInfo.getClbumList({
          gradeId: that.listQuery.gradeId,
          specialtyId: that.listQuery.specialtyId
        }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.gradeInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.dormitory.getPage({ ...that.pagePara, ...that.listQuery }).then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
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
