<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input
          v-model="listQuery.keyword"
          placeholder="请输入身份证或者姓名"
          prefix-icon="el-icon-search"
          style="width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号码" align="center">
          <template slot-scope="{row}">
            <span>{{ row.idNo }} </span>
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
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.gradeName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="意向专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="生源地" align="center">
          <template slot-scope="{row}">
            <span>{{ row.admissionSourceName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.classType }} </span>
          </template>
        </el-table-column>
        <el-table-column label="缴费状态" align="center">
          <template slot-scope="{row}">
            <span>{{ row.feeState == 1 ?'超时':'已退费'}} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operatorName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.applyTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_recruit_pre_recover"
              type="primary"
              name=""
              @click="recoverHandle(row)"
              round
            />
            <!--            <el-button type="danger">删除</el-button>-->
            <PermissionButton
              menu-no="_views_recruit_pre_remove"
              type="danger"
              name=""
              @click="removeHandle(row)"
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
  },
  methods: {
    getGradeList() {
      const that = this
      that.$api.admissionSource.listAll().then(data => {
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
      that.$confirm('确认删除当前记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$api.admiisionPreApply.applyvalidDelete(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            }
          })
        })
        .catch(err => { console.error(err) })
    },
    recoverHandle(row) {
      // console.log(data)
      const that = this
      that.$confirm('确认还原当前记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$api.admiisionPreApply.applyvalidRecover(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '还原成功'
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
      this.$api.admiisionPreApply.applyvalidPage({ ...that.listQuery, ...that.pagePara }).then(res => {
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
