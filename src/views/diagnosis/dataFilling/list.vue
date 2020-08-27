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
        <el-select v-model="listQuery.level1" style="width: 140px;margin-right: 5px;" clearable filterable
                   placeholder="年份" class="filter-item"
        >
          <!--          <el-option-->
          <!--            v-for="item in yearsOptions"-->
          <!--            :key="item.id"-->
          <!--            :label="item.name"-->
          <!--            :value="item.name"-->
          <!--          />-->
        </el-select>
        <el-button class="filter-item" type="success" round>
          新增
        </el-button>
        <span style="color: #cccccc;font-size: 12px;margin-left: 3px;">创建每一年的标准值和目标值！</span>
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
        <el-table-column label="年份" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="完成进度" width="150px" align="center">
          <template slot-scope="{row}">
            <round-progress :plan="row.progress"></round-progress>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="{row}">
            <el-button type="text">编辑</el-button>
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
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="text">导入</el-button>
            <el-button type="text">导出</el-button>
          </template>
        </el-table-column>
        <el-table-column label="导出表格" align="center">
          <template slot-scope="{row}">
            <el-button type="text">导出表格数据</el-button>
          </template>
        </el-table-column>
        <el-table-column label="同步数据" align="center">
          <template slot-scope="{row}">
            <el-button type="text">同步数据</el-button>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import roundProgress from '../../../components/roundProgress'

  export default {
    name: 'ViewsDiagnosisDataFillingList',
    components: {
      Breadcrumb,
      roundProgress,
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
        this.pageData = {
          records: [{ progress: 30 }, { progress: 70 }, { progress: 0 }, { progress: 100 }],
          total: 4
        }
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
