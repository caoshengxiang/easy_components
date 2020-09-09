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
            <div class="analysis-text"><span class="tag">{{ statisticsData.total || '无' }}</span></div>
            <div class="analysis-text-small">社团总数</div>
          </div>
        </div>
        <div class="menu-2-item hvr-underline-from-center" v-for="(item, index) in statisticsData.list" :key="index">
          <img src="../../../assets/a2.png" class="item-img" alt="">
          <div class="text">
            <div class="analysis-text"><span class="tag">{{ item.value || 0 }}</span></div>
            <div class="analysis-text-small">{{ item.key }}</div>
          </div>
        </div>
      </div>
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
              <el-date-picker
                v-model="approvalDate"
                type="daterange"
                range-separator="至"
                start-placeholder="批准日期开始"
                value-format="yyyy-MM-dd"
                end-placeholder="批准日期结束"
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
        <el-table-column label="名称" prop="name" width="160" show-overflow-tooltip />
        <el-table-column label="创始人" prop="founder" width="120" />
        <el-table-column label="负责人" prop="principalName" width="160" />
        <el-table-column label="电话" align="center" prop="phone" width="120" />
        <el-table-column label="性质" align="center" prop="character" width="120" />
        <el-table-column label="批准部门" prop="department" width="160" />
        <el-table-column label="批准日期" align="center" prop="approvalDate" width="140" />
<!--        <el-table-column label="宗旨" prop="purpose" width="180" show-overflow-tooltip />-->
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
          current: 1,
          size: 10,
          descs: 'id'
        },
        tableData: { records: [] },
        form: {}, // 查询条件
        approvalDate: null,
        statisticsData: {
          list: []
        }, // 统计信息
      }
    },
    created () {
      this.search();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        const sendData = Object.assign({}, this.pageInfo, this.form);
        if (this.approvalDate) {
          sendData.approvalDateStart = this.approvalDate[0];
          sendData.approvalDateEnd = this.approvalDate[1];
        }
        this.$api.LACommunityManage.page(sendData)
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
        this.pageInfo.current = 1;
        this.getData();
        this.getStatisticsData();
      },
      // 重置
      reset() {
        this.form = {};
        this.search();
      },
      getStatisticsData() {
        this.statisticsLoading = true;
        this.$api.LACommunityManage.stat(this.form)
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
