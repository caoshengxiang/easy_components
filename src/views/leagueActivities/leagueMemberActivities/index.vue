<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <div class="statisticsInfo" v-loading="statisticsLoading">
      <div class="menu-2-box">
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a1.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsData.latestMonthNum || 0 }}</span></div>
            <div class="analysis-text-small">近一月活动总数</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a1.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text">
              <el-tooltip v-if="statisticsData.leagueName && statisticsData.leagueName.length > 5" :content="statisticsData.leagueName">
                <div class="analysis-text-label">
                  {{ statisticsData.leagueName || '' }}
                </div>
              </el-tooltip>
              <span v-else class="analysis-text-label">{{ statisticsData.leagueName || '' }}</span>
              ：
              <span class="tag">{{ statisticsData.maxNum || 0 }}</span>
            </div>
            <div class="analysis-text-small">活动最多的团支部及活动数量</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <PermissionButton
          menu-no="_views_leagueActivities_leagueMemberActivities_add"
          class-name="filter-item"
          round
          type="primary"
          size="mini"
          icon="el-icon-plus"
          name=""
          :page-jump="true"
        />
<!--        <el-input v-model="listQuery.youthLeagueBranchId" placeholder="支部名称"-->
<!--                  style=" margin-left:10px;width: 180px"/>-->
        <service-select
          v-model="listQuery.youthLeagueBranchId"
          :data-service="$api.LABranchManage.simpleAll"
          name="name"
          field="id"
          placeholder="支部名称"
          clearable
          class="filter-item"
          :immediate="false"
          style="margin-left: 10px; width: 180px"
        />
        <el-input v-model="listQuery.principal" placeholder="负责人"
                  style=" margin-left:10px;width: 180px"/>
        <el-input v-model="listQuery.cate" placeholder="活动类型"
                  style=" margin-left:10px;width: 180px"/>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          @click="search"
          round
          size="mini"
        >
          搜索
        </el-button>
        <el-button class="filter-item" round type="warning" @click="reset"
                   size="mini">
          重置
        </el-button>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="团支部" prop="leagueName"/>
        <el-table-column label="负责人" prop="principal"/>
        <el-table-column label="活动时间" align="center" prop="activityTime" min-width="160"/>
        <el-table-column label="活动类型" prop="cate"/>
<!--        <el-table-column label="活动内容" prop="content"/>-->
        <el-table-column label="创建时间" align="center" prop="created"/>
        <el-table-column label="创建人" prop="creator"/>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMemberActivities_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMemberActivities_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row.id)"
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
  import ServiceSelect from '@/components/ServiceSelect'

  export default {
    name: 'leagueMemberActivities',
    components: {
      YPageListLayout,
      PermissionButton,
      Breadcrumb,
      ServiceSelect
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
        statisticsData: {},
        selection: [],
        statisticsLoading: false,
        listQuery: {descs: 'id'}
      }
    },
    created() {
      this.getData();
      this.getStatisticsData()
    },
    methods: {
      getData() {
        this.loading = true;
        this.$api.leagueMemberActivities.getPage(Object.assign({}, this.pageInfo, this.listQuery))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteRow(id) {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$api.leagueMemberActivities.remove(id).then(res=>{
              this.search();
            })
          });
      },
      getStatisticsData() {
        this.statisticsLoading = true;
        this.$api.leagueMemberActivities.stat()
          .then(res => {
            this.statisticsData = res.data;
            this.statisticsLoading = false;
          })
      },
      search() {
        this.getData();
        this.getStatisticsData();
      },
      reset() {
        this.listQuery = {descs: 'id'};
        this.search();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .app-container {
    .item-img {
      width: 50px;
      height: 50px;
    }
    .analysis-text {
      display: flex;
      align-items: center;
      .analysis-text-label {
        font-size: 16px;
        width: 80px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
