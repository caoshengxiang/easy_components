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
              <PermissionButton round menu-no="_views_leagueActivities_communityManage_add" type="primary" name="新增社团" :page-jump="true" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.name" placeholder="社团名称" />
            </el-form-item>
            <el-form-item>
              <service-select
                v-model="form.character"
                :data-service="$api.LACommunityManage.characterList"
                :default-query="{ key: '社团性质' }"
                placeholder="性质"
                clearable
                pureList
              />
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="form.approvalDateStart" placeholder="批准日期开始" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label-width="20px" label="-">
              <el-date-picker v-model="form.approvalDateEnd" placeholder="批准日期结束" value-format="yyyy-MM-dd" />
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
                <div class="item-head">社团总数</div>
                <div class="item-data">{{ statisticsData.total || '无' }}</div>
              </div>
            </div>
            <div class="statistics-item" v-for="(item, index) in statisticsData.list" :key="index">
              <img class="item-img" src="../../../assets/a1.png" alt="" >
              <div class="item-info">
                <div class="item-head">{{ item.key }}</div>
                <div class="item-data">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="名称" prop="name" width="120" />
        <el-table-column label="创始人" prop="founder" width="120" />
        <el-table-column label="负责人" prop="principalName" width="120" />
        <el-table-column label="电话" align="center" prop="phone" width="120" />
        <el-table-column label="性质" align="center" prop="character" width="120" />
        <el-table-column label="批准部门" prop="department" width="160" />
        <el-table-column label="批准日期" align="center" prop="approvalDate" width="140" />
        <el-table-column label="宗旨" prop="purpose" width="180" />
        <el-table-column label="活动形式" prop="form" width="120" />
        <el-table-column label="编码" prop="code" width="120" />
        <el-table-column label="创建时间" align="center" prop="created" width="180" />
        <el-table-column label="创建人" prop="creator" width="120" />
        <el-table-column label="操作" align="center" width="260" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_communityManage_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_communityManage_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row.id)"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_list"
              name="社员管理"
              :page-jump="true"
              :page-query="{ clubId: row.id }"
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
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'communityManage',
    components: {
      YPageListLayout,
      PermissionButton,
      Breadcrumb,
      ServiceSelect
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
        this.$api.LACommunityManage.page(Object.assign({}, this.pageInfo, this.form))
          .then(res => {
            this.tableData = res.data;
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
            this.$api.LACommunityManage.remove(id)
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
        this.$api.LACommunityManage.stat()
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
