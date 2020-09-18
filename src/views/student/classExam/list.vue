<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增学期-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_student_classExam_detail"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
        <el-select
          v-model="listQuery.administrativeGradeId"
          placeholder="年级"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
          @change="getClbumList"
        >
          <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeSpecialtyId"
          placeholder="专业"
          clearable
          class="filter-item"
          @change="getClbumList"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select
          v-model="listQuery.administrativeClbumId"
          placeholder="班级"
          clearable
          class="filter-item"
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
        >
          <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-select
          v-model="listQuery.termId"
          placeholder="学期"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
        >
          <el-option v-for="item in termOptions" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>

        <el-input
          placeholder="年份" type="number" v-model="listQuery.year" class="filter-item" style="margin-left:5px;width: 100px"/>
        <el-input
          v-model="listQuery.month"
          placeholder="月份"
          prefix-icon="el-icon-search"
          type="number"
          style="margin-left: 5px;width: 100px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right">
          <PermissionButton
            menu-no="_views_student_classExam_export"
            class-name="filter-item"
            type="primary"
            icon="el-icon-plus"
            name=""
            @click="downloadTemplate"
            round
          />
        </template>
      <parentTable v-loading="listLoading"  @sortTable="sortTable"  :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="年份" align="center">
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学期" align="center">
        <template slot-scope="{row}">
          <span>{{row.termName}}</span>
        </template>
      </el-table-column>
        <el-table-column label="月份" align="center">
          <template slot-scope="{row}">
            <span>{{ row.month }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="班主任" align="center">
          <template slot-scope="{row}">
            <span>{{ row.headTeacherName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeGradeName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeSpecialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="男生" align="center">
          <template slot-scope="{row}">
            <span>{{ row.boys }} </span>
          </template>
        </el-table-column>
        <el-table-column label="女生" align="center">
          <template slot-scope="{row}">
            <span>{{ row.girls }} </span>
          </template>
        </el-table-column>
        <el-table-column label="教学管理" align="center">
          <template slot-scope="{row}">
            <span>{{ row.jXsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="安全管理" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cCsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="常规考核" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cGsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="纠察" align="center">
          <template slot-scope="{row}">
            <span>{{ row.jCsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="值周考核" align="center">
          <template slot-scope="{row}">
            <span>{{ row.zZsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="寝室管理" align="center">
          <template slot-scope="{row}">
            <span>{{ row.qSsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="日常规范" align="center">
          <template slot-scope="{row}">
            <span>{{ row.rCsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="卫生" align="center">
          <template slot-scope="{row}">
            <span>{{ row.wSsocre }} </span>
          </template>
        </el-table-column>
        <el-table-column label="得分" align="center">
          <template slot-scope="{row}">
            <span>{{ row.totalScore }} </span>
          </template>
        </el-table-column>
        <el-table-column label="排名1" align="center" prop="rank1" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.rank1 }} </span>
          </template>
        </el-table-column>
        <el-table-column label="男生比例" align="center">
          <template slot-scope="{row}">
            <span>{{ row.boyRand }} </span>
          </template>
        </el-table-column>
        <el-table-column label="比例系数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.rateNumer }} </span>
          </template>
        </el-table-column>
        <el-table-column label="男生系数得分" align="center">
          <template slot-scope="{row}">
            <span>{{ row.boyRateNumerScore }} </span>
          </template>
        </el-table-column>
        <el-table-column label="排名2" align="center" prop="rank2" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.rank2 }} </span>
          </template>
        </el-table-column>
        <el-table-column label="人数系数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.personNumer }} </span>
          </template>
        </el-table-column>
        <el-table-column label="乘系得分" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cxValue }} </span>
          </template>
        </el-table-column>
        <el-table-column label="本周总分" align="center">
          <template slot-scope="{row}">
            <span>{{ row.weekScore }} </span>
          </template>
        </el-table-column>
        <el-table-column label="名次" align="center" prop="rank" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.rank }} </span>
          </template>
        </el-table-column>
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
      opt: [
        {
          key: '',
          label: '全部'
        },{
        key: true,
        label: '是'
      }, {
        key: false,
        label: '否'
      }],
      grantType: [  {
        key: '',
        label: '全部'
      },{
        key: 1,
        label: '奖学金'
      }, {
        key: 2,
        label: '助学金'
      }],
      statisticsInfo:{},
      specialty: [],
      gradeInfo: [],
      majorInfo:[],
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
      termOptions: [],
      yearsOptions: []
    }
  },
  created() {
    const that = this
    that.getList()
    that.getGradeList()
    this.getSpecialtyList()
    that.getStatistics()
    that.getTerm()
  },
  methods: {
    sortTable(val){
      console.log(val)
      this.listQuery.descs = val.descs
      this.listQuery.ascs = val.ascs
      this.getList()
    },
    getTerm() {
      this.$api.term.simpleAll().then(res => {
        this.termOptions = res.data
      })
      this.$api.dormitoryCheck.years().then(res => {
        this.yearsOptions = res.data
      })
    },
    downloadTemplate() {
      this.$utils.exportUtil('/classExam/download/exportExcel', this.listQuery, '班级考核报表')
    },
    getStatistics() {
      let that = this
      that.$api.statistics.getStatistics('/grant/pageStaics', { ...that.listQuery }).then(data => {
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
    getGradeList() {
      const that = this
      that.$api.baseInfo.getGradeList().then(data => {
        that.loading = false
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
        that.loading = false
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
        gradeId: that.listQuery.administrativeGradeId,
        specialtyId: that.listQuery.administrativeSpecialtyId
      }).then(data => {
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
      this.getList()
    },
    removeHandle(row) {
      // console.log(data)
      const that = this
      that.$confirm('确认删除当前记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$api.classExam.delete(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
              this.getStatistics()
            }
          })
        })
        .catch(err => { console.error(err) })
    },
    getList() {
      const that = this
      this.listLoading = true
      this.$api.classExam.list({ ...that.listQuery, ...that.pagePara }).then(res => {
        that.pageData = res.data
        that.getStatistics()
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
