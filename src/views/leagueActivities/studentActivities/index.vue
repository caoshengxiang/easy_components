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
            <div class="analysis-text" v-if="statisticsData"><span class="tag">{{ statisticsData.latestMonthNum || 0 }}</span></div>
            <div class="analysis-text" v-else>暂无数据</div>
            <div class="analysis-text-small">最近一个月总数</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a1.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text" v-if="statisticsData">
              <el-tooltip v-if="statisticsData.clubName && statisticsData.clubName.length > 5" :content="statisticsData.clubName">
                <div class="analysis-text-label">
                  {{ statisticsData.clubName || '' }}
                </div>
              </el-tooltip>
              <span v-else class="analysis-text-label">{{ statisticsData.clubName || '' }}</span>
              ：
              <span class="tag">{{ statisticsData.maxNum || 0 }}</span>
            </div>
            <div class="analysis-text" v-else>
              暂无数据
            </div>
            <div class="analysis-text-small">活动最多的社团及活动数量</div>
          </div>
        </div>
      </div>
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
        <el-date-picker
          style="margin-left: 12px;"
          v-model="activityTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="任职日期开始"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="任职日期结束"
        />
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
        <el-button class="filter-item" style="" round type="warning" @click="reset" size="mini">
          重置
        </el-button>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="活动主题" prop="theme"/>
        <el-table-column label="社团" prop="clubName" show-overflow-tooltip/>
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
          current: 1,
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
        activityTime: null
      }
    },
    created() {
      this.search();
    },
    methods: {
      getData() {
        this.loading = true;
        const sendData = Object.assign({}, this.pageInfo, this.listQuery);
        if (this.activityTime) {
          sendData.activityTimeStart = this.activityTime[0];
          sendData.activityTimeEnd = this.activityTime[1];
        }
        this.$api.studentActivities.getPage(sendData)
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
            this.$api.studentActivities.remove(row.id).then(res=>{
              this.search();
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
      },
      search() {
        this.pageInfo.current = 1;
        this.getData();
        this.getStatisticsData()
      },
      reset() {
        this.listQuery = {descs: 'id'};
        this.search();
      }
    },
  }
</script>

<style scoped lang="scss">
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
