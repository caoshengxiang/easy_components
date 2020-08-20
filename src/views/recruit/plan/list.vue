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
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.planCount }}</span>人</div>
            <div class="analysis-text-small">当前年份计划招生总人数</div>
          </div>
        </div>
        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.preCount }}</span>人</div>
            <div class="analysis-text-small">预报名人数总计</div>
          </div>
        </div>

        <div
          class="menu-2-item hvr-underline-from-center"
        ><img src="../../../assets/a2.png" height="50" width="50">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsInfo.regCount }}</span>人</div>
            <div class="analysis-text-small">已报到总人数</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="listQuery" :getPageList="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增学期-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_recruit_plan_detail"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
          round
        />
        <el-select
        v-model="listQuery.gradeId"
        placeholder="请选择年级"
        clearable
        style="margin-left:10px;width: 200px;margin-bottom: 10px;"
        class="filter-item"
      >
        <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>

        <el-select
          v-model="listQuery.specialtyId"
          placeholder="请选择专业"
          clearable
          class="filter-item"
          style="margin-left:10px;width: 200px;margin-bottom: 10px;"
        >
          <el-option v-for="item in specialty" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" round @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="resetSearch()">
          重置
        </el-button>
      </template>
      <template slot="right"/>
      <parentTable v-loading="listLoading" :data="pageData.records" slot="table" style="width:100%">
        <el-table-column label="专业编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.specialtyName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="年级" align="center">
          <template slot-scope="{row}">
            <span>{{ row.gradeName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="计划招生人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.planCount }} </span>
          </template>
        </el-table-column>
        <el-table-column label="报道人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.regCount }} </span>
          </template>
        </el-table-column>
        <el-table-column label="发布者" align="center">
          <template slot-scope="{row}">
            <span>{{ row.publisherName }} </span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.pubTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="计划截止时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.deadTime }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{row}">
             <PermissionButton
              menu-no="_views_recruit_plan_edit"
              type="primary"
              name=""
              :page-jump="true"
              :page-query="{id: row.id}"
              round
            />
            <!--            <el-button type="danger">删除</el-button>-->
            <PermissionButton
              menu-no="_views_recruit_plan_remove"
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
      that.getSpecialtyList()
      that.getGradeList()
    },
    methods: {
      getSpecialtyList() {
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
          page: 1,
          size: 10,
          name: '',
          code: '',
          keyword: '',
          descs: 'id'
        }
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
            this.$api.plan.delete(row.id).then(res => {
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
      getList() {
        const that = this
        this.listLoading = true
        // console.log(that.listQuery)
        this.$api.plan.list({ ...that.listQuery, ...that.pagePara }).then(res => {
          that.pageData = res.data.page
          that.statisticsInfo = res.data.staticsData
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
