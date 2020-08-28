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
        <el-select v-model="year" style="width: 140px;margin-right: 5px;" clearable filterable
                   placeholder="年份" class="filter-item"
        >
          <el-option
            v-for="item in yearsOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button class="filter-item" type="success" round @click="addHandle">
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
      <parentTable v-loading="listLoading" :data="pageData" slot="table" style="width: 100%;">
        <el-table-column label="年份" prop="id" align="center" width="150">
          <template slot-scope="{row}">
            <span>
              {{ row.year }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="完成进度" width="150px" align="center">
          <template slot-scope="{row}">
            <round-progress :plan="row.percentage"></round-progress>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_diagnosis_dataFilling_dataFill"
              class-name="filter-item"
              type="text"
              round
              :page-jump="true"
              :page-query="{id: row.id}"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.creatorName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-upload
              class="filter-item"
              style="display: inline-block;margin-left: 10px;"
              action=""
              :before-upload="(file) => beforeUpload(file, row)"
            >
              <el-button type="text">导入</el-button>
            </el-upload>
            |
            <el-button type="text" @click="exportFile(row)">导出</el-button>
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
        pageData: [],
        pagePara: {
          current: 0,
          size: 10
        },
        listQuery: {
          descs: 'id',
        },
        yearsOptions: [],
        year: null
      }
    },
    created() {
      const that = this
      that.getList()
      this.$api.diagnosis.indicatorYear().then(res => {
        this.yearsOptions = res.data
      })
    },
    methods: {
      addHandle() {
        if (!this.year) {
          this.$message.error('请选择年份！')
          return
        }
        this.$api.diagnosis.indicatorYearAdd({
          year: this.year
        }).then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
      },
      searchList() {
        const that = this
        that.pagePara.current = 0
        that.getList()
      },
      getList() {
        this.listLoading = true
        this.$api.diagnosis.indicatorYearList({ ...this.pagePara, ...this.listQuery }).then(data => {
          this.listLoading = false
          if (data.code === 200) {
            // 返回成功
            this.pageData = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      exportFile(row) {
        this.$api.diagnosis.indicatorExportExcel({ indicatorYearId: row.id })
      },
      beforeUpload(file, row) {
        const param = new FormData()
        param.append('file', file, file.name)
        param.append('indicatorYearId', row.id)
        this.$api.diagnosis.indicatorImportExcel(param).then((res) => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '导入成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        })
        return false
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
