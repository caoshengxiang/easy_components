<template>
  <div class="app-container dormitoryCheckList">
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
    <!--        <div />-->
    <!--      </div>-->
    <!--    </div>-->

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--新增周宿舍考核-->
        <PermissionButton
          menu-no="_views_dormitory_dormitoryCheck_list_add"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
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
        <el-select v-model="listQuery.termId" placeholder="学期" clearable class="filter-item"
                   style="width: 100px;margin-left: 10px"
        >
          <el-option v-for="item in termOptions" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input
          v-model="listQuery.weeks"
          placeholder="周数"
          style="margin-left:10px;width: 80px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.keyword"
          placeholder="宿舍编号或者负责人"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right">
        <el-button class="filter-item download-button" round style="margin-left: 10px;" type="primary">
          导出扣分记录
        </el-button>
        <el-button class="filter-item download-button" round type="primary">
          导出宿舍考核
        </el-button>
        <el-button class="filter-item download-button" round type="primary">
          导出当天宿舍得分
        </el-button>
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="年份" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="学期" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.termName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="周数" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.weeks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍编号" width="110px" align="center">
          <template slot-scope="{row}">
            <span class="link-type">
              <router-link tag="a" :to="{path:'/dormitory/userManage',query:{id: row.id}}"
                           class="routerWork"
              >{{ row.code }}
              </router-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍类别" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宿舍位置" width="80px">
          <template slot-scope="{row}">
            <span>{{ row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="容纳人数" align="center" width="95">
          <template slot-scope="{row}">
            <span>{{ row.capacity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人数" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.studentNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.managerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" class-name="status-col" width="120">
          <template slot-scope="{row}">
            <span>{{ row.managerPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本周得分" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-button type="warning" size="mini" round @click="deduction(row)">
              扣分
            </el-button>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>

    <el-dialog custom-class="dialogClass" :close-on-click-modal="false" :title="dialogTitle"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px"
               style="width: 400px; margin-left:50px;"
      >

        <el-form-item label="考核类型：" prop="type">
          <el-select v-model="temp.type" class="filter-item" style="float: left;" placeholder="请选择" @change="getReason">
            <el-option label="内务考核" value="内务考核"/>
            <el-option label="纪律考核" value="纪律考核"/>
          </el-select>
        </el-form-item>
        <el-form-item label="扣除原因：" prop="reason">
          <el-select v-model="temp.reason" class="filter-item" style="float: left;" placeholder="请选择"
                     @change="reasonChange">
            <el-option v-for="item in reasonOptions" :key="item.name" :label="item.name"
                       :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="扣除分数：" prop="score">
          <el-input v-model.number="temp.score" type="number" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="deductionSave" :loading="deductionSaveLoading">
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
    name: 'ViewsDormitoryDormitoryCheckList',
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

      var checkScore = (rule, value, callback) => {
        if (!value && value !== 0) {
          return callback(new Error('请填写扣除分数'))
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value <= 0) {
            callback(new Error('扣除分数必须大于0'))
          } else {
            callback()
          }
        }
      }

      return {
        /*list*/
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
        /*list*/
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
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        termOptions: [],
        /*dialog*/
        dialogFormVisible: false,
        dialogTitle: '',
        temp: {
          dormitoryWeeklyAssessmentId: null,
          type: null,
          score: '',
          reason: ''
        },
        row: {},
        rules: {
          reason: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择原因',
            trigger: 'change'
          }],
          score: [
            {
              required: true,
              message: '请填写扣除分数',
              trigger: 'change'
            },
            {
              validator: checkScore,
              trigger: 'blur'
            }
          ],
        },
        reasonOptions: [],
        deductionSaveLoading: false,
        /*dialog*/
      }
    },
    created() {
      this.getList()
      this.getGradeList()// 赛选框年级
      this.getSpecialtyList()
      this.getClbumList()
      this.getTerm()
    },
    methods: {
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.dormitoryCheck.list({ ...that.pagePara, ...that.listQuery }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
            that.listLoading = false
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      deduction(row) {
        this.dialogFormVisible = true
        this.row = row
      },
      deductionSave() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.deductionSaveLoading = true
            this.temp.dormitoryWeeklyAssessmentId = this.row.id
            this.$api.dormitoryCheck.dormitoryStuRecordDormitory(this.temp).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '扣分成功',
                  type: 'success',
                  duration: 2000
                })
              }
              this.deductionSaveLoading = false
            }).catch(() => { this.deductionSaveLoading = false })
          }
        })
      },
      resetTemp() {
        this.temp = {
          dormitoryWeeklyAssessmentId: null,
          type: null,
          score: '',
          reason: ''
        }
      },
      getReason(val) {
        let code = ''
        if (val === '内务考核') {
          code = 'dormitoryCheckReason'
        } else {
          code = 'dormitoryCheckReasonDiscipline'
        }
        this.temp.reason = ''
        this.$api.dictData.getByCode({ code: code }).then(res => {
          this.reasonOptions = res.data
        })
      },
      getTerm() {
        this.$api.term.simpleAll().then(res => {
          this.termOptions = res.data
        })
      },
      reasonChange(val) {
        if (val) {
          this.reasonOptions.forEach(item => {
            if (item.name === val && !isNaN(parseInt(item.remark, 10))) {
              this.temp.score = parseInt(item.remark, 10)
            }
          })
        } else {
          this.temp.score = ''
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
      // createData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //       this.temp.author = 'vue-element-admin'
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: 'Success',
      //         message: 'Created Successfully',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //   })
      // },
      // handleAdd() {
      //   this.temp = Object.assign({}) // copy obj
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      // updateData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       const tempData = Object.assign({}, this.temp)
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: 'Success',
      //         message: 'Update Successfully',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //   })
      // },
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
    }
  }
</script>
<style lang="scss">
  .dormitoryCheckList { /*dialog 样式 不能使用 scope*/
    .dialogClass {
      width: 500px !important;
    }

    .download-button {
      margin-bottom: 5px;
      margin-top: 5px;
      float: right
    }
  }
</style>
