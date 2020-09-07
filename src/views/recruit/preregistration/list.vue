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
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.currentPlanCount }}</span>份</div>
            <div class="analysis-text-small">当前年份计划总数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.preCount }}</span>人</div>
            <div class="analysis-text-small">预报名总人数</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.preFailCount }}</span>人</div>
            <div class="analysis-text-small">预报名失效总人数</div>
          </div>
        </div>

        <div

          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a1.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.regCount }}</span>人</div>
            <div class="analysis-text-small">报到人数</div>
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
          filterable
          style="margin-left:5px;width: 120px"
          class="filter-item"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="listQuery.administrativeSpecialtyId"
          placeholder="请选择专业"
          clearable
          filterable
          class="filter-item"
          style="margin-left:5px;width: 120px"
        >
          <el-option v-for="item in specialty" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.admissionSourceId"
          placeholder="请选择生源地"
          clearable
          style="margin-left:5px;width: 130px"
          class="filter-item"
        >
          <el-option v-for="item in areaInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input
          v-model="listQuery.keyword"
          placeholder="电话或姓名"
          prefix-icon="el-icon-search"
          style="margin-top:3px;margin-left:5px;width: 150px"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 5px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item"  style="margin-left:5px" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right">
        <PermissionButton
          menu-no="_views_recruit_pre_export1"
          class-name="filter-item"
          round
          type="primary"
          name=""
          style="margin-left:5px"
          @click="handleDownload1"
        />
        <PermissionButton
          menu-no="_views_recruit_pre_export2"
          class-name="filter-item"
          round
          type="primary"
          name=""
          style="margin-left:5px"
          @click="handleDownload2"
        />
        <PermissionButton
          menu-no="_views_recruit_pre_export3"
          class-name="filter-item"
          round
          style="margin-left:5px;margin-top:3px;"
          type="primary"
          name=""
          @click="handleDownload3"
        />
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.gradeName }}</span>
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
        <el-table-column label="家庭地址  " align="center">
          <template slot-scope="{row}">
            <span>{{ row.homeAddr }} </span>
          </template>
        </el-table-column>
        <el-table-column label="意向专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班级类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.classType }} </span>
          </template>
        </el-table-column>
        <el-table-column label="毕业学校" align="center">
          <template slot-scope="{row}">
            <span>{{ row.admissionSourceName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="预报名时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.applyTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="经办人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="缴费状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.feeState == 1?'未缴费':( row.feeState == 2?'已退费': (row.feeState == 3?'已缴费':'未知')) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_recruit_preregistration_edit"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.id}"
              round
            />
            <PermissionButton
              v-if="row.feeState == 1"
              menu-no="_views_recruit_preregistration_remove"
              type="danger"
              name=""
              @click="removeHandle(row)"
              round
            />
            <PermissionButton
              menu-no="_views_recruit_preregistration_print"
              type="success"
              name=""
              :page-jump="true"
              :page-query="{id: row.id}"
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
        statisticsInfo:{},
        specialty: [],
        gradeInfo: [],
        areaInfo:[],
        tableKey: 0,
        pageData: { },
        total: 0,
        listLoading: false,
        listQuery: {
          descs: 'id'
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
      that.getStatistics()
    },
    methods: {
      handleDownload1(url) {

        if(!this.listQuery.administrativeGradeId){

          this.$message({
            type: 'info',
            message: '请先选择年级'
          })

          return
        }
        this.$utils.exportUtil('/admiisionPreApply/exportPreApplySourceExcel', this.listQuery, '导出学生生源地预招人数对比')
      },
      handleDownload2(url) {

        if(!this.listQuery.administrativeGradeId){

          this.$message({
            type: 'info',
            message: '请先选择年级'
          })

          return
        }
        this.$utils.exportUtil('/admiisionPreApply/exportPreApplySpExcel', this.listQuery, '导出各专业预报名人数')
      },
      handleDownload3(url) {

        if(!this.listQuery.administrativeGradeId){
          this.$message({
            type: 'info',
            message: '请先选择年级'
          })

          return
        }
        this.$utils.exportUtil('/admiisionPreApply/exportPreApplyDetailStuExcel', this.listQuery, '导出学生详细')
      },
      getStatistics() {
        let that = this
        that.$api.statistics.getStatistics('/admiisionPreApply/preApplypageStatics', { ...that.listQuery }).then(data => {
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
        this.listQuery = {
          descs: 'id'
        }
        this.getList()
      },
      removeHandle(row) {
        // console.log(data)
        const that = this
        that.$confirm('确认缴费完成吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            this.$api.admiisionPreApply.pay(row.id).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '缴费成功'
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
        // console.log(that.listQuery)
        this.$api.admiisionPreApply.list({ ...that.listQuery, ...that.pagePara }).then(res => {
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
