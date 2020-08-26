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
        <el-select v-model="listQuery.level1" style="width: 140px;" clearable filterable
                   placeholder="调研年份" class="filter-item"
        >
          <!--          <el-option-->
          <!--            v-for="item in yearsOptions"-->
          <!--            :key="item.id"-->
          <!--            :label="item.name"-->
          <!--            :value="item.name"-->
          <!--          />-->
        </el-select>
        <el-button class="filter-item" type="success" round style="margin-left: 10px;">
          新建
        </el-button>
        <span style="color: #cccccc;font-size: 12px;margin-left: 3px;">新建年报默认填入上一年的数据！</span>
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
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="年份" prop="id" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="完成进度" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="导出指标1~337" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.administrativeGradeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }}</span>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'ViewsDiagnosisReportsAnnualReportExport',
    components: {
      Breadcrumb,
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
          descs: 'id',
        },
      }
    },
    created() {
      const that = this
      that.getList()
    },
    methods: {
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        // const that = this
        // that.listLoading = true
        // that.$api.dormitoryCheck.dormitoryClbumTimeAssessmentList({ ...that.pagePara, ...that.listQuery }).then(data => {
        //   that.listLoading = false
        //   if (data.code === 200) {
        //     // 返回成功
        //     that.pageData = data.data
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: data.msg
        //     })
        //   }
        // })
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
