<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <div class="top-container">
          <el-form inline :model="form">
            <el-form-item>
              <PermissionButton round menu-no="_views_leagueActivities_branchManage_add" type="primary" name="新增团支部" :page-jump="true" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.name" placeholder="支部名称" />
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="form.buildDateStart" placeholder="成立时间开始" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label-width="20px" label="-">
              <el-date-picker v-model="form.buildDateEnd" placeholder="成立时间结束" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item>
              <el-button
                class="filter-item"
                style="margin-left: 10px;float: left;"
                type="primary"
                @click="search"
                round
                size="mini"
              >
                搜索
              </el-button>
              <el-button class="filter-item" style="float: left;" round type="warning" @click="reset" size="mini">
                重置
              </el-button>
            </el-form-item>
          </el-form>
          <div class="statistics-container" v-loading="statisticsLoading">
            <div class="statistics-item">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">团支部总数</div>
                <div class="item-data">{{ branchTotal }}</div>
              </div>
            </div>
            <div class="statistics-item" v-for="(item, index) in statisticsData.list" :key="index">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">{{ `${item.key}团员数` }}</div>
                <div class="item-data">{{ item.value || 0 }}</div>
              </div>
            </div>
            <div class="statistics-item">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">收入合计</div>
                <div class="item-data">{{ statisticsData.incomeTotal || 0 }}</div>
              </div>
            </div>
            <div class="statistics-item">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">支出合计</div>
                <div class="item-data">{{ statisticsData.outComeTotal || 0 }}</div>
              </div>
            </div>
            <div class="statistics-item">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">当前结余</div>
                <div class="item-data">{{ statisticsData.restTotal || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="名称" prop="name" min-width="120" />
        <el-table-column label="负责人" prop="principal" min-width="120" />
        <el-table-column label="电话" align="center" prop="phone" min-width="120" />
        <el-table-column label="成立日期" align="center" prop="buildDate" min-width="140" />
        <el-table-column label="创建时间" align="center" prop="created" min-width="180" />
        <el-table-column label="创建人" prop="creator" min-width="120" />
        <el-table-column label="操作" align="center" width="380" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_branchManage_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_branchManage_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row.id)"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_list"
              name="团员管理"
              :page-jump="true"
              :page-query="{ youthLeagueBranchId: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueFee_list"
              name="团费管理"
              :page-jump="true"
              :page-query="{ youthLeagueBranchId: row.id }"
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
    name: 'branchManage',
    components: {
      YPageListLayout,
      PermissionButton,
      Breadcrumb
    },
    data() {
      return {
        loading: false,
        statisticsLoading: false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        tableData: { records: [] },
        form: {}, // 查询条件
        statisticsData: {
          list: []
        }, // 统计信息
        branchTotal: 0 // 团支部总数
      }
    },
    created () {
      this.getData();
      this.getStatisticsData();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        this.$api.LABranchManage.page(Object.assign({}, this.pageInfo, this.form))
          .then(res => {
            this.tableData = res.data;
            this.branchTotal = res.data.total;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      // 删除行项
      deleteRow(id) {
        this.$confirm('此操作将删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$api.LABranchManage.remove(id)
              .then(() => {
                this.search();
              })
          });
      },
      // 查询
      search() {
        this.getData();
      },
      // 重置
      reset() {
        this.form = {};
        this.getData();
      },
      getStatisticsData() {
        this.statisticsLoading = true;
        this.$api.LABranchManage.stat()
          .then(res => {
            this.statisticsData = res.data;
            this.statisticsLoading = false;
          })
      }
    }
  };
</script>

<style lang="scss" scoped>
.app-container {
  .statistics-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .statistics-item {
      width: 240px;
      display: flex;
      align-items: center;
      margin-right: 24px;
      margin-bottom: 12px;
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
}
</style>
