<template>
  <common-layout>
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
        <PermissionButton round menu-no="_views_leagueActivities_memberManage_add" type="primary" name="新增社员"
                          :page-jump="true"/>
        <el-input v-model="listQuery.communityName" placeholder="主题"  style=" margin-left:10px;width: 180px"/>
        <el-input v-model="listQuery.jobs" placeholder="地点" style=" margin-left:10px;width: 180px"/>
        <el-date-picker v-model="listQuery.timeStart" placeholder="活动时间开始" value-format="yyyy-MM-dd" style="margin-left:10px;width: 140px"/>
        <span>-</span>
        <el-date-picker v-model="listQuery.timeStart" placeholder="活动时间结束" value-format="yyyy-MM-dd" style="width: 140px"/>
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
              <div class="item-data">{{ data.communitySum || 0 }}</div>
            </div>
          </div>
          <div class="statistics-item">
            <img class="item-img" src="../../../assets/a1.png" alt="">
            <div class="item-info">
              <div class="item-head">活动最多的社团及活动数量</div>
              <div class="item-data">{{data.community || ''}} {{ data.communitySum || 0 }}</div>
            </div>
          </div>
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="活动主题" prop="activitySubject"/>
        <el-table-column label="社团" prop="community"/>
        <el-table-column label="负责人" prop="chargePerson"/>
        <el-table-column label="活动时间" align="center" prop="activityDate"/>
        <el-table-column label="活动地点" prop="activityLocation"/>
        <el-table-column label="活动内容" prop="activityContent"/>
        <el-table-column label="创建时间" align="center" prop="createDate"/>
        <el-table-column label="创建人" align="center" prop="founder"/>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_studentActivities_detail"
              name="详情"
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
  </common-layout>
</template>

<script>
  import YPageListLayout from '@/components/YPageListLayout'
  import CommonLayout from '../common/CommonLayout'
  import PermissionButton from '@/components/PermissionButton/PermissionButton'

  export default {
    name: 'studentActivities',
    components: {
      YPageListLayout,
      CommonLayout,
      PermissionButton,
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
        data: {
          community: '乒乓球社团'
        },
        gradeInfo: [],
        calendarTypeOptions1: [
          {
            key: 1,
            display_name: '春季'
          },
          {
            key: 2,
            display_name: '秋季'
          }
        ],
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(query) {
        this.loading = true;
        // todo 对接口
        if (query) {
          this.filters = query;
        }
        this.$api.moralManageNotice.page(Object.assign({}, this.pageInfo, this.filters))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteRow() {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // todo 对接口
          });
      },
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
