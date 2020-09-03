<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="pageData" :page-para="pagePara" :get-page-list="getList">
      <template slot="left">
        <service-select
          v-model="listQuery.gradeId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getGradeList"
          placeholder="年级"
          style="margin-left: 10px;"
          clearable
        />
        <service-select
          v-model="listQuery.specialtyId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getSpecialtyList"
          placeholder="专业"
          style="margin-left: 10px;"
          clearable
        />
        <service-select
          v-model="listQuery.clbumId"
          name="name"
          field="id"
          :data-service="$api.baseInfo.getClbumList"
          placeholder="班级"
          style="margin-left: 10px;"
          clearable
          :default-query="{
            gradeId: listQuery.gradeId,
            specialtyId: listQuery.specialtyId
          }"
        />
        <el-input
          v-model="listQuery.name"
          placeholder="学生"
          prefix-icon="el-icon-search"
          style="margin-left: 20px;width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 10px;" round type="primary" @click="searchList"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="listQuery = {descs: 'id'}">
          重置
        </el-button>
      </template>
      <template slot="right">
      </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width: 100%;">
        <el-table-column label="学号" prop="studyCode" align="center" >
        </el-table-column>
        <el-table-column label="姓名" prop="name" align="center" >
        </el-table-column>
        <el-table-column label="操行分" prop="score" align="center" >
        </el-table-column>
        <el-table-column label="排名" prop="rank" align="center" >
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="260px">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_moralManage_conductScore_view"
              name=""
              type="primary"
              @click="drawLine(row)"
              round
            >
              查看
            </PermissionButton>
            <PermissionButton
              menu-no="_views_moralManage_conductScore_ussetting"
              name=""
              type="primary"
              @click="showConductScoreSetting(row)"
              round
            >
              操行分设置
            </PermissionButton>
            <PermissionButton
              menu-no="_views_moralManage_conductScore_detail"
              name=""
              type="primary"
              @click="showDetail(row)"
              round
            >
              明细
            </PermissionButton>
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
    <el-dialog title="学生操行分查看" :visible.sync="dialogFormVisible">
      <div ref="mychart" id="myChart" :style="{width: '800px', height: '300px'}">
      </div>
    </el-dialog>

    <el-dialog title="操行分设置" :visible.sync="dialogFormVisible1">
      <el-form ref="conductScoreForm" :model="conductScoreForm" label-position="right" label-width="150px"
               :rules="rules"
               style="width: 80%; margin-left:50px;"
      >
        <el-form-item class="postInfo-container-item " label="类型：" prop="typeId">
          <service-select
            v-model="conductScoreForm.typeId"
            name="name"
            field="id"
            :data-service="$api.conductScore.conductTypeSimpleAll"
            placeholder="请选择类型"
            style="margin-left: 10px;width: 100%"
            clearable
          />
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="详情：" prop="reason">
          <service-select
            v-model="conductScoreForm.reason"
            name="name"
            field="name"
            :data-service="$api.conductScore.getConductTypeItem"
            placeholder="请选择详情"
            style="margin-left: 10px;width: 100%"
            :default-query="{ id: conductScoreForm.typeId }"
            clearable
            @after-select="conductTypeItemSelect"
          />
        </el-form-item>
        <el-form-item class="postInfo-container-item " label="分数：" prop="score">
          {{conductScoreForm.score}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveData()">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="操行分变化列表" :visible.sync="detailVisible">
      <y-page-list-layout :page-list="detailPageData || {}" :page-para="detailPagePara" :get-page-list="getConductScoreDetail">
        <parentTable v-loading="detailListLoading" :data="detailPageData.records" slot="table" style="width: 100%;" >
          <el-table-column label="时间" prop="updateTime" align="center" ></el-table-column>
          <el-table-column label="原因" prop="reason" align="center" ></el-table-column>
          <el-table-column label="分数变化" prop="score" align="center" ></el-table-column>
        </parentTable>
      </y-page-list-layout>
    </el-dialog>
  </div>
</template>
<script>
import ServiceSelect from '@/components/ServiceSelect';
import PermissionButton from '@/components/PermissionButton/PermissionButton'
import Breadcrumb from '@/components/Breadcrumb'
import YPageListLayout from '@/components/YPageListLayout'

export default {
  name: 'ViewsBaseinfoAssetinfoList',
  components: {
    ServiceSelect,
    Breadcrumb,
    PermissionButton,
    YPageListLayout,
  },
  data() {
    return {
      temp:{},
      dialogFormVisible1:false,
      dialogFormVisible: false,
      listLoading: false,
      pageData: {},
      pagePara: {
        current: 0,
        size: 10
      },
      listQuery: {
        descs: 'id'
      },
      statisticsInfo: {},
      useStatus: [],
      purpose: [],
      detailVisible: false,
      detailPageData: {},
      detailListLoading: false,
      detailPagePara: {
        current: 0,
        size: 10
      },
      studentId: null,
      xData:[],
      yData:[],
      conductScoreForm:{
        score: 0
      },
      rules: {
        typeId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        reason: [{ required: true, message: '请选择详情', trigger: 'blur' }],
      }
    }
  },
  created() {
    const that = this
    that.getList()
  },
  methods: {
    conductTypeItemSelect(row) {
      this.conductScoreForm.score = row.score
    },
    showConductScoreSetting(row) {
      this.studentId = row.studentId
      this.dialogFormVisible1 = true
      this.conductScoreForm = {
        score: 0
      }
    },
    saveData(){
      /*操行分扣分记录新增*/
      this.$api.conductScore.conductDeductRecordAdd({
        studentId:this.studentId,
        score:this.conductScoreForm.score,
        reason:this.conductScoreForm.reason
      }).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '操行分设置成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible1 = false
          this.conductScoreForm = {
            score: 0
          }
        }else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    drawLine (row) {
      let that = this
      this.dialogFormVisible = true

      this.$api.conductScore.conductPointMonthly({studentId:row.studentId}).then(res => {
        const { data = [] } = res
        that.xData = data.map(item => item.key)
        that.yData = data.map(item => item.value)
        that.$nextTick(() => {
          var echarts = require('echarts');
          var myChart = echarts.init(that.$refs.mychart);
          myChart.setOption({
            tooltip: {},
            xAxis: {
              data: that.xData
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'line',
              data: that.yData
            }]
          });
        })

      })
    },
    searchList() {
      const that = this
      that.pagePara.current = 0

      that.getList()
    },
    deleteInfo(id) {
      const that = this
      that.$confirm('请确认是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        that.$api.assetinfo.deleteLand({ id: id }).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.getList()
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }).catch(() => {
      })
    },
    add() {
      const that = this
      that.$router.push({
        path: '/views/baseinfo/assetinfo/detail',
        query: {
          type: 'add'
        }
      })
    },
    detail(id) {
      const that = this
      that.$router.push({
        path: '/views/baseinfo/assetinfo/detail',
        query: {
          id: id,
          type: 'add'
        }
      })
    },
    getList() {
      const that = this
      that.listLoading = true
      that.$api.conductScore.getPage({ ...that.listQuery, ...that.pagePara }).then(data => {
        that.listLoading = false
        if (data.code === 200) {
          // 返回成功
          that.pageData = data.data
          // that.getStatistics()
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }).catch(() => { that.listLoading = false })
    },
    showDetail(row) {
      this.detailVisible = true
      this.studentId = row.studentId
      this.getConductScoreDetail()
    },
    getConductScoreDetail() {
      const that = this
      that.detailListLoading = true
      that.$api.conductScore.conductScoreDetail({ studentId:this.studentId,...that.detailPagePara }).then(data => {
        that.detailListLoading = false
        if (data.code === 200) {
          // 返回成功
          that.detailPageData = data.data
          console.log(that.detailPageData)
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }).catch(() => { that.detailListLoading = false })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
