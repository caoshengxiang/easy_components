<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <el-form inline :model="form">
          <el-form-item>
            <PermissionButton
              round
              menu-no="_views_leagueActivities_leagueMember_add"
              type="primary"
              name="新增团员"
              :page-jump="true"
              :page-query="initQuery"
            />
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
              v-model="form.duty"
              name="name"
              field="name"
              :data-service="$api.dictData.getByCode"
              :default-query="{ code: 'leagueBranch' }"
              clearable
              placeholder="职位"
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.memberName" placeholder="团员姓名" />
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
      <template slot="right">
        <PermissionButton
          menu-no="_views_leagueActivities_leagueMember_import"
          name="导入"
          round
          type="text"
        >
          <excelImport
            ref="uploadControl"
            :limit="1"
            flag="leagueMember/importExcel"
            :style-type="2"
            title="导入"
            @fath="search"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_leagueActivities_leagueMember_download"
          round
          icon="el-icon-download"
          name="团员导入模板下载"
          @click="downloadTemplate"
        />
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="团支部名称" prop="leagueName" min-width="120" />
        <el-table-column label="团员" prop="memberName" min-width="120" />
        <el-table-column label="职位" prop="duty" min-width="120" />
        <el-table-column label="任职日期" align="center" prop="employeeDate" min-width="140" />
        <el-table-column label="入团时间" align="center" prop="entryDate" min-width="140" />
        <el-table-column label="创建时间" align="center" prop="created" min-width="180" />
        <el-table-column label="创建人" prop="creator" min-width="120" />
        <el-table-column label="备注" prop="remark" min-width="180" />
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_delete"
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
  import ServiceSelect from '@/components/ServiceSelect';
  import excelImport from '@/components/excelImport'

  export default {
    name: 'leagueMember',
    components: {
      YPageListLayout,
      PermissionButton,
      Breadcrumb,
      ServiceSelect,
      excelImport
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
        initQuery: {
          youthLeagueBranchId: this.$route.query.youthLeagueBranchId,
          leagueName: this.$route.query.leagueName,
        }
      }
    },
    created() {
      this.search();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        this.$api.LALeagueMember.page(Object.assign({}, this.pageInfo, this.form))
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
            this.$api.LALeagueMember.remove(id)
              .then(() => {
                this.search();
              })
          });
      },
      // 下载模板
      downloadTemplate() {
        this.$utils.exportUtil('/leagueMember/download/importTemplate', null, '团员导入模板')
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
