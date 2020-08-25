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
<!--新增考核统计 @click="handleAdd"-->
        <PermissionButton
          menu-no="_views_dormitory_classRecord_list_add"
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
          v-model="listQuery.year"
          placeholder="年份"
          style="margin-left:10px;width: 80px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.time"
          placeholder="次数"
          style="margin-left:10px;width: 80px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 20px" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'dcta.id'}">
          重置
        </el-button>
      </template>
      <template slot="right">
        <!--导出班级宿舍考核-->
        <PermissionButton
          menu-no="_views_dormitory_classRecord_export"
          class-name="filter-item"
          @click="exportClassRecord"
          type="primary"
          round
        />
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="年份" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="次数" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.administrativeGradeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班主任">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="{row}">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本次得分" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <!--    </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
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
        pageData: { records: [] },
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          class: undefined,
          grade: undefined,
          major: undefined,
          full: undefined,
          descs: 'dcta.id',
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        termOptions: [],
      }
    },
    created() {
      const that = this
      that.getList()
      that.getGradeList()// 赛选框年级
      that.getSpecialtyList()
      that.getClbumList()
      that.getTerm()
    },
    methods: {
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
      getTerm() {
        this.$api.term.simpleAll().then(res => {
          this.termOptions = res.data
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
        that.$api.dormitoryCheck.dormitoryClbumTimeAssessmentList({ ...that.pagePara, ...that.listQuery }).then(data => {
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
      exportClassRecord() {
        this.$api.dormitoryCheck.dormitoryClbumTimeAssessmentExportExcel({ ...this.pagePara, ...this.listQuery })
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
