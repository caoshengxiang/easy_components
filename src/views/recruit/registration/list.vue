<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>

    <div class="statisticsInfo">
      <div class="menu-2-box">
        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.planCount }}</span>人</div>
            <div class="analysis-text-small">计划人数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.preCount }}</span>人</div>
            <div class="analysis-text-small">预报名人数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.currentRegCount }}</span>人</div>
            <div class="analysis-text-small">当前年份报到总人数</div>
          </div>
        </div>

        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.losedCount }}</span>人</div>
            <div class="analysis-text-small">招生流失人数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.refundCount }}</span>人</div>
            <div class="analysis-text-small">已退费人数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="listQuery" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_recruit_preregistration_detail"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
        <el-select
          v-model="listQuery.administrativeGradeId"
          placeholder="请选择年级"
          clearable
          style="width: 150px"
          class="filter-item"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="listQuery.administrativeSpecialtyId"
          placeholder="请选择专业"
          clearable
          class="filter-item"
          style="margin-left:5px;width: 150px"
        >
          <el-option v-for="item in specialty" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="listQuery.administrativeClbumId"
          placeholder="请选择班级"
          clearable
          class="filter-item"
          style="margin-left:5px;width: 150px"
        >
          <el-option v-for="item in clbumInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.admissionSourceId"
          placeholder="请选择生源地"
          clearable
          style="margin-left:5px;width: 150px"
          class="filter-item"
        >
          <el-option v-for="item in areaInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select v-model="listQuery.state" placeholder="是否缴费" clearable class="filter-item"
                   style="margin-top:3px;width: 120px;padding-left: 5px"
        >
          <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>
        <el-input
          v-model="listQuery.keyword"
          placeholder="身份证、学生姓名、经办人"
          prefix-icon="el-icon-search"
          style="margin-left:10px;width: 250px"
          class="filter-item"
        />
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          style="width: 350px;margin-top: 3px;margin-left: 5px"
          class="filter-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>

      </template>
      <template slot="right" style="float: right">
        <PermissionButton
          menu-no="_views_recruit_reg_export1"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="handleDownload1"
        />
        <PermissionButton
          menu-no="_views_recruit_reg_export2"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="handleDownload2"
        />
        <PermissionButton
          menu-no="_views_recruit_reg_export3"
          class-name="filter-item"
          round
          type="primary"
          name=""
          @click="handleDownload3"
        />
        <PermissionButton
          menu-no="_views_recruit_reg_export4"
          class-name="filter-item"
          round
          type="primary"
          name=""
          style="margin-top: 3px"
          @click="handleDownload4"
        />
        <PermissionButton
          menu-no="_views_recruit_reg_export5"
          class-name="filter-item"
          round
          type="primary"
          name=""
          style="margin-top: 3px"
          @click="handleDownload5"
        />
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeGradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="{row}">
            <span>{{ row.homePhone }} </span>
          </template>
        </el-table-column>
        <el-table-column label="证件号  " align="center">
          <template slot-scope="{row}">
            <span>{{ row.idNo }} </span>
          </template>
        </el-table-column>
        <el-table-column label="意向专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班级类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.classType }} </span>
          </template>
        </el-table-column>
        <el-table-column label="报名时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.applyTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="招生经办人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_recruit_registration_detail"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.studentId}"
              round
            />
            <PermissionButton
              menu-no="_views_recruit_registration_refund"
              type="warning"
              name=""
              @click="removeHandle(row)"
              round
            />
            <PermissionButton
              menu-no="_views_recruit_registration_changeStudentState"
              type="danger"
              name=""
              @click="changeStudentState(row)"
              v-if="row.state === '在读'"
              round
            />
            <PermissionButton
              menu-no="_views_recruit_registration_changeStudentState1"
              type="danger"
              name=""
              @click="changeStudentState1(row)"
              v-if="row.state === '招生流失'"
              round
            />
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import Breadcrumb from '@/components/Breadcrumb'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'ViewsRecruitPlanList',
    components: {
      Breadcrumb,
      YPageListLayout,
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
      },
    },
    data() {
      return {
        dateTime: [],
        opt: [{
          key: 1,
          label: '是'
        }, {
          key: 0,
          label: '否'
        }],
        statisticsInfo:{},
        specialty: [],
        gradeInfo: [],
        areaInfo:[],
        tableKey: 0,
        pageData: { },
        total: 0,
        listLoading: false,
        listQuery: {
          // descs: 'id'
        },
        pagePara: {
          current: 0,
          size: 10
        },
      }
    },
    created() {
      const that = this
      that.getList()
      that.getGradeList()
      that.getSpecialtyList()
      this.admissionSource()
      this.getClbumList()
      that.getStatistics()
    },
    methods: {
      handleDownload1(url) {
        this.$utils.exportUtil('/admiisionPreApply/regPageStudentDetailSourceExcelExport', this.listQuery, '导出生源地详细报名信息')
      },
      handleDownload2(url) {
        this.$utils.exportUtil('/admiisionPreApply/regPagDepApplyExcelExport', this.listQuery, '导出系部招生情况')
      },
      handleDownload3(url) {
        this.$utils.exportUtil('/admiisionPreApply/regPageStudentDetailExcelExport', this.listQuery, '导出学生详细')
      },
      handleDownload4(url) {
        this.$utils.exportUtil('/admiisionPreApply/regPageSourceExcelExport', this.listQuery, '导出头像信息')
      },
      handleDownload5(url) {
        this.$utils.exportUtil('/admiisionPreApply/regPageExportAvatarsZip', this.listQuery, '导出生源地报名信息')
      },

      getClbumList() {
        const that = this
        that.$api.baseInfo.getClbumList({
          gradeId: that.listQuery.administrativeGradeId,
          specialtyId: that.listQuery.administrativeSpecialtyId
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.clbumInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/admiisionPreApply/regPageStatics', { ...that.listQuery }).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.statisticsInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      admissionSource() {
        const that = this
        that.$api.admissionSource.listAll().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.areaInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }, getSpecialtyList() {
        const that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.specialty = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGradeList() {
        const that = this
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false
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
      resetSearch() {
        this.listQuery = { descs: 'id' }
        this.dateTime = []
        this.getList()
      },
      removeHandle(row) {
        // console.log(data)
        const that = this
        that.$confirm('确认退费吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            this.$api.admiisionPreApply.refund(row.applyId).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '退费成功'
                })
                this.getList()
              }
            })
          })
          .catch(err => { console.error(err) })
      },
      changeStudentState1(row) {
        // console.log(data)
        const that = this
        that.$confirm('确认恢复正常吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let fomm = {studentId:row.studentId,state:'在读'}
            this.$api.admiisionPreApply.changeStudentState({...fomm}).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.getList()
              }
            })
          })
          .catch(err => { console.error(err) })
      },
      changeStudentState(row) {
        // console.log(data)
        const that = this
        that.$confirm('确认招生流失吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let fomm = {studentId:row.studentId,state:'招生流失'}
            this.$api.admiisionPreApply.changeStudentState({...fomm}).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.getList()
              }
            })
          })
          .catch(err => { console.error(err) })
      },
      getList() {
        const that = this
        this.listLoading = true
        if (that.dateTime) {
          that.listQuery.startTime = that.dateTime[0]
          that.listQuery.endTime = that.dateTime[1]
        } else {
          that.listQuery.startTime = ''
          that.listQuery.endTime = ''
        }
        // console.log(that.listQuery)
        this.$api.admiisionPreApply.regPage({ ...that.listQuery, ...that.pagePara }).then(res => {
          that.pageData = res.data
          setTimeout(() => {
            that.listLoading = false
          }, 200)
        }).catch(() => {
          that.listLoading = false
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .right {
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
      margin-bottom: 10px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .text {
        margin-left: 16px;
      }
    }
  }
</style>
