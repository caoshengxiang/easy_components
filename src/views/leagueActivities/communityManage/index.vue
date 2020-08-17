<template>
  <common-layout>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <div class="top-container">
          <index-query-form :query="getData" />
          <list-statistics />
        </div>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="创始人" prop="originCreator" />
        <el-table-column label="负责人" prop="dutyPerson" />
        <el-table-column label="电话" align="center" prop="phone" />
        <el-table-column label="性质" align="center" prop="type" />
        <el-table-column label="批准部门" prop="org" />
        <el-table-column label="成立日期" align="center" prop="createdDate" />
        <el-table-column label="宗旨" prop="theme" />
        <el-table-column label="活动形式" prop="activityMethod" />
        <el-table-column label="编码" prop="code" />
        <el-table-column label="创建时间" align="center" prop="createDate" />
        <el-table-column label="创建人" prop="creator" />
        <el-table-column label="操作" align="center" width="260">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_communityManage_detail"
              name="详情"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_communityManage_delete"
              name="删除"
              type="danger"
              @click="deleteRow(row)"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_list"
              name="社员管理"
              :page-jump="true"
              :page-query="{ communityName: row.communityName }"
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
  import IndexQueryForm from './components/IndexQueryForm'
  import listStatistics from './components/listStatistics'

  export default {
    name: 'communityManage',
    components: {
      YPageListLayout,
      CommonLayout,
      PermissionButton,
      IndexQueryForm,
      listStatistics
    },
    data() {
      return {
        tableData: { records: [] },
        loading: false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        selection: [],
        filters: {}
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData(query) {
        this.loading = true;
        if (query) {
          this.filters = query;
        }
        // todo 对接口
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
      }
    }
  };
</script>
