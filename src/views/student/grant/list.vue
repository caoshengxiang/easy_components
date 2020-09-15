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
            <div class="analysis-text"><span class="tag">{{ statisticsInfo }}</span>元</div>
            <div class="analysis-text-small">近三月发放奖金数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增学期-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_student_grant_add"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />

        <el-input
          v-model="listQuery.year"
          placeholder="年份"
         :change="check_num()"
          prefix-icon="el-icon-search"
          style="margin-left: 5px;width: 100px;"
          class="filter-item"
          type="number"
        />
        <el-input
          v-model="listQuery.month"
          placeholder="月份"
          :change="check_num()"
          prefix-icon="el-icon-search"
          style="margin-left: 5px;width: 100px;"
          class="filter-item"
          type="number"
        />
        <el-select
          v-model="listQuery.grantType"
          placeholder="类型"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
        >
          <el-option  v-for="item in AllEnum.奖学金类型" :key="item" :label="item" :value="item"/>
        </el-select>

        <el-select
          v-model="listQuery.sexStudent"
          placeholder="六类学生"
          clearable
          style="margin-left:5px;width: 100px;margin-bottom: 10px;"
          class="filter-item"
        >
          <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>


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
        <el-input
          v-model="listQuery.keyword"
          placeholder="关键字"
          prefix-icon="el-icon-search"
          style="margin-left: 5px;width: 200px;"
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
            menu-no="_views_student_grant_export"
            class-name="filter-item"
            type="primary"
            icon="el-icon-plus"
            name=""
            @click="downloadTemplate"
            round
          />
        </template>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="年份" align="center">
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月份" align="center">
          <template slot-scope="{row}">
            <span>{{ row.month }} </span>
          </template>
        </el-table-column>
        <el-table-column label="学号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.studyCode }} </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sex }} </span>
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
        <el-table-column label="班级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.administrativeClbumName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="助学类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.grantType }} </span>
          </template>
        </el-table-column>
        <el-table-column label="应发金额" align="center">
          <template slot-scope="{row}">
            <span>{{ row.shouldPayAmount }} </span>
          </template>
        </el-table-column>
        <el-table-column label="打款金额" align="center">
          <template slot-scope="{row}">
            <span>{{ row.actualPayAmount }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_student_grant_edit"
              type="primary"
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
      AllEnum: {}// 全部枚举
    }
  },
  created() {
    const that = this
    that.getList()
    that.getGradeList()
    this.getSpecialtyList()
    that.getStatistics()
    that.getAllEnum()
  },
  methods: {
    check_num(){
      if(this.listQuery.year) {
        var license_num = this.listQuery.year;
        license_num = license_num.toString().replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
        if (license_num.indexOf('.') < 0 && license_num != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          license_num = parseInt(license_num);
        }
        this.listQuery.year = license_num;
      }
      if(this.listQuery.month) {
        var license_num = this.listQuery.month;
        license_num = license_num.toString().replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
        if (license_num.indexOf('.') < 0 && license_num != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          license_num = parseInt(license_num);
        }
        this.listQuery.month = license_num;
      }
    },
    getAllEnum() {
      const that = this
      that.$api.globalConfig.getAllEnum().then(data => {
        if (data.code === 200) {
          that.AllEnum = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    downloadTemplate() {
      this.$utils.exportUtil('/grant/download/exportExcel', this.listQuery, '助学金导出')
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
          this.$api.grant.delete(row.id).then(res => {
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
      this.$api.grant.list({ ...that.listQuery, ...that.pagePara }).then(res => {
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
