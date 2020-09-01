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
            <div class="analysis-text"><span class="tag">{{ branchTotal }}</span></div>
            <div class="analysis-text-small">团支部总数</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center" v-for="(item, index) in statisticsData.list" :key="index">
          <img src="../../../assets/a2.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ item.value || 0 }}</span></div>
            <div class="analysis-text-small">{{ `${item.key || ''}团员数` }}</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a2.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsData.incomeTotal || 0 }}</span></div>
            <div class="analysis-text-small">收入合计</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a2.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsData.outComeTotal || 0 }}</span></div>
            <div class="analysis-text-small">支出合计</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center">
          <img src="../../../assets/a2.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ statisticsData.restTotal || 0 }}</span></div>
            <div class="analysis-text-small">当前结余</div>
          </div>
        </div>
      </div>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <div class="top-container">
          <el-form inline :model="form">
            <el-form-item>
              <PermissionButton round menu-no="_views_leagueActivities_branchManage_add" type="primary" name="新增团支部" :page-jump="true"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.name" placeholder="支部名称"/>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="buildDate"
                type="daterange"
                range-separator="至"
                start-placeholder="成立日期开始"
                value-format="yyyy-MM-dd"
                end-placeholder="成立日期结束"
              />
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
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="名称" prop="name" min-width="120"/>
        <el-table-column label="负责人" prop="principal" min-width="120"/>
        <el-table-column label="电话" align="center" prop="phone" min-width="120"/>
        <el-table-column label="成立日期" align="center" prop="buildDate" min-width="140"/>
        <el-table-column label="创建时间" align="center" prop="created" min-width="140"/>
        <el-table-column label="创建人" prop="creator" min-width="120"/>
        <el-table-column label="操作" align="center" width="360" fixed="right">
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
        tableData: {records: []},
        form: {}, // 查询条件
        buildDate: null,
        statisticsData: {
          list: []
        }, // 统计信息
        branchTotal: 0 // 团支部总数
      }
    },
    created() {
      this.getData();
      this.getStatisticsData();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        const sendData = Object.assign({}, this.pageInfo, this.form);
        if (this.buildDate) {
          sendData.buildDateStart = this.buildDate[0];
          sendData.buildDateEnd = this.buildDate[1];
        }
        this.$api.LABranchManage.page(sendData)
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
                this.getStatisticsData();
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
    .item-img {
      width: 50px;
      height: 50px;
    }
  }
</style>
