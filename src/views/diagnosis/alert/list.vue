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
    <y-page-list-layout>
      <template slot="left">
      </template>
      <template slot="right">
        <!--导出-->
        <!--        <PermissionButton-->
        <!--          menu-no="_views_dormitory_classRecord_export"-->
        <!--          class-name="filter-item"-->
        <!--          @click="exportClassRecord"-->
        <!--          type="primary"-->
        <!--          round-->
        <!--        />-->
      </template>
      <parentTable v-loading="listLoading" :data="pageData" slot="table" style="width: 100%;">
        <el-table-column label="指标编号" prop="id" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.number }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="指标名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标准值" align="center">
          <template slot-scope="{row}">
            <span>{{ row.standardValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="目标值" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.targetValue }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="指标值" align="center">
          <template slot-scope="{row}">
            <span>{{ row.currentValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警类型" align="center">
          <!--
          一旦出现低于标准值和目标值时就预警小于标准值红色预警
          大于等于标准值且小于目标值黄色预警
            大于等于目标值就不预警
            手动修改或同步数据的时候就实时产生预警-->
          <template slot-scope="{row}">
            <div v-if="alertType(row) === 1 || alertType(row) === null" style="width: 10px;height: 10px;background-color: red;border-radius: 50%;margin: auto;"></div>
            <div v-if="alertType(row) === 2" style="width: 10px;height: 10px;background-color: yellow;border-radius: 50%;margin: auto;"></div>
            <div v-if="alertType(row) === 3" style="width: 10px;height: 10px;background-color: green;border-radius: 50%;margin: auto;"></div>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ViewsDiagnosisAlertList',
    components: {
      Breadcrumb,
    },
    data() {
      return {
        listLoading: false,
        pageData: [],
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      alertType(row) {
        if (!row.currentValue || !row.standardValue || !row.targetValue) {
          return null
        }
        if (row.currentValue < row.standardValue) {
          return 1
        } else if (row.currentValue >= row.standardValue && row.currentValue < row.targetValue) {
          return 2
        } else {
          return 3
        }
      },
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        const that = this
        that.listLoading = true
        that.$api.diagnosis.indicatorYearStandardDataWarn().then(data => {
          that.listLoading = false
          if (data.code === 200) {
            // 返回成功
            that.pageData = data.data
          }
        }).catch(() => {
          that.listLoading = false
        })
      },
      // exportClassRecord() {
      //   this.$api.dormitoryCheck.dormitoryClbumTimeAssessmentExportExcel({ ...this.pagePara, ...this.listQuery })
      // },
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
