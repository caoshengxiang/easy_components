<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <PermissionButton
          menu-no="_views_leagueActivities_studentActivities_add"
          class-name="filter-item"
          round
          type="primary"
          size="mini"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
        <el-input v-model="listQuery.theme" placeholder="主题"  style=" margin-left:10px;width: 180px"/>
        <el-input v-model="listQuery.addr" placeholder="地点" style=" margin-left:10px;width: 180px"/>
        <el-date-picker v-model="listQuery.activityTimeStart" placeholder="活动时间开始"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="margin-left:10px; border-radius: 20px"/>
        <span>-</span>
        <el-date-picker v-model="listQuery.activityTimeEnd" placeholder="活动时间结束"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"/>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          @click="getData"
          round
          size="mini"
        >
          搜索
        </el-button>
        <el-button class="filter-item" style="" round type="warning" @click="listQuery = {descs: 'id'}" size="mini">
          重置
        </el-button>
        <div class="statistics-container" v-loading="statisticsLoading">
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">最近一个月总数</div>
              <div class="item-data">{{ statisticsData.latestMonthNum || 0 }}</div>
            </div>
          </div>
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">活动最多的社团及活动数量</div>
              <div class="item-data">
                <span style="color: orange">{{statisticsData.clubName || ''}}</span>
                <span> {{ statisticsData.maxNum || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="活动主题" prop="theme"/>
        <el-table-column label="社团" prop="clubName"/>
        <el-table-column label="负责人" prop="principal"/>
        <el-table-column label="活动时间" align="center" prop="activityTime" min-width="160"/>
        <el-table-column label="活动地点" prop="addr"/>
<!--        <el-table-column label="活动内容" prop="content"/>-->
        <el-table-column label="创建时间" align="center" prop="created"/>
        <el-table-column label="创建人" align="center" prop="creator"/>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_studentActivities_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_studentActivities_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row)"
              round
            />
          </template>
        </el-table-column>
      </parentTable>
    </y-page-list-layout>
  </div>
</template>

<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'studentActivities',
    components: {
      YPageListLayout,
      PermissionButton,
      Breadcrumb
    },
    data() {
      return {
        tableData: {records: []},
        loading: false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        listQuery: {},
        selection: [],
        statisticsLoading: false,
        statisticsData: {
          latestMonthNum: '0',
          clubName: '',
          maxNum: '0'
        },
        gradeInfo: [],
      }
    },
    created() {
      this.getData();
      this.getStatisticsData()
    },
    methods: {
      getData() {
        this.loading = true;
        this.$api.studentActivities.getPage(Object.assign({}, this.pageInfo, this.listQuery))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteRow(row) {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // todo 对接口
            this.$api.studentActivities.remove(row.id).then(res=>{
              this.getData()
            })
          });
      },
      getStatisticsData() {
        this.statisticsLoading = true;
        this.$api.studentActivities.stat()
          .then(res => {
            this.statisticsData = res.data;
            this.statisticsLoading = false;
          })
      }
    },
  }
</script>

<style scoped lang="scss">
  .statistics-container {
    display: flex;
    margin-top: 16px;
    align-items: center;

    .statistics-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      background-color: rgba(242, 242, 242, 1);
      padding: 12px;
      border-radius: 4px;

      .item-img {
        width: 80px;
        height: 80px;
      }

      .item-info {
        margin-left: 12px;
        text-align: center;
        font-size: 16px;

        .item-head {
          font-weight: bold;
        }

        .item-data {
          margin-top: 6px;
          font-size: 24px;
          font-weight: bold;
          color: #1890ff;
        }
      }
    }
  }
</style>
