<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <el-form inline :model="form">
          <el-form-item>
            <PermissionButton round menu-no="_views_leagueActivities_leagueFee_add" type="primary" name="新增团费" :page-jump="true" />
          </el-form-item>
          <el-form-item>
            <service-select
              v-model="form.youthLeagueBranchId"
              name="name"
              field="id"
              :data-service="$api.LABranchManage.simpleAll"
              clearable
              placeholder="支部名称"
              :immediate="false"
            />
          </el-form-item>
          <el-form-item>
            <service-select
              v-model="form.cate"
              :data-service="$api.LACommunityManage.characterList"
              :default-query="{ key: '收支类型' }"
              placeholder="收支类型"
              clearable
              pureList
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="occurTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="时间开始"
              value-format="yyyy-MM-dd HH:mm:ss"
              end-placeholder="时间结束"
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
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="团支部" prop="leagueName" min-width="120" />
        <el-table-column label="收支类型" prop="cate" min-width="100" />
        <el-table-column label="金额" prop="amount" min-width="100" />
        <el-table-column label="时间" align="center" prop="occurTime" min-width="180" />
        <el-table-column label="备注" prop="remark" min-width="180" show-overflow-tooltip />
        <el-table-column label="创建时间" align="center" prop="created" min-width="140" />
        <el-table-column label="创建人" prop="creator" min-width="120" />
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_leagueFee_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueFee_delete"
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
  import ServiceSelect from '@/components/ServiceSelect';
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'leagueFee',
    components: {
      YPageListLayout,
      PermissionButton,
      ServiceSelect,
      Breadcrumb
    },
    data() {
      return {
        loading: false,
        pageInfo: {
          current: 1,
          size: 10,
          descs: 'id'
        },
        tableData: { records: [] },
        form: {
          youthLeagueBranchId: Number(this.$route.query.youthLeagueBranchId)
        },
        occurTime: null
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        const sendData = Object.assign({}, this.pageInfo, this.form);
        if (this.occurTime) {
          sendData.occurTimeStart = this.occurTime[0];
          sendData.occurTimeStart = this.occurTime[1];
        }
        this.$api.LALeagueFee.page(sendData)
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
            this.$api.LALeagueFee.remove(id)
              .then(() => {
                this.search();
              })
          });
      },
      // 查询
      search() {
        this.pageInfo.current = 1;
        this.getData();
      },
      // 重置
      reset() {
        this.form = {};
        this.search();
      }
    }
  };
</script>
