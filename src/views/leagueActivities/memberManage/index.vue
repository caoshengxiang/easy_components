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
              menu-no="_views_leagueActivities_memberManage_add"
              type="primary"
              name="新增社员"
              :page-jump="true"
              :page-query="initQuery"
            />
          </el-form-item>
          <el-form-item>
            <service-select
              v-model="form.clubId"
              name="name"
              field="id"
              :data-service="$api.LACommunityManage.simpleAll"
              placeholder="社团"
              clearable
              :immediate="false"
            />
          </el-form-item>
          <el-form-item>
            <service-select
              v-model="form.clubDutyId"
              name="name"
              field="id"
              :data-service="$api.LAMemberManage.dutySimpleAll"
              :default-query="form.clubId"
              placeholder="职务"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="employeeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="任职日期开始"
              value-format="yyyy-MM-dd"
              end-placeholder="任职日期结束"
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.studentName" placeholder="姓名" />
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
          menu-no="_views_leagueActivities_memberManage_import"
          name="导入"
          round
          type="text"
        >
          <excelImport
            ref="uploadControl"
            :limit="1"
            flag="clubMember/importExcel"
            :style-type="2"
            title="导入"
            @fath="search"
          />
        </PermissionButton>
        <PermissionButton
          menu-no="_views_leagueActivities_memberManage_download"
          round
          icon="el-icon-download"
          name="社员导入模板下载"
          @click="downloadTemplate"
        />
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="社团名称" prop="clubName" min-width="160" show-overflow-tooltip />
        <el-table-column label="社员姓名" prop="studentName" min-width="120" />
        <el-table-column label="班级" prop="clbum" min-width="120" />
        <el-table-column label="年级" align="center" prop="grade" min-width="120" />
        <el-table-column label="专业" prop="specialty" min-width="160" />
        <el-table-column label="社团职务" prop="dutyName" min-width="120" />
        <el-table-column label="任职日期" align="center" prop="employeeDate" min-width="160" />
        <el-table-column label="入社日期" align="center" prop="entryDate" min-width="160" />
<!--        <el-table-column label="工作内容" prop="content" width="180" show-overflow-tooltip />-->
<!--        <el-table-column label="社团评价" prop="evaluation" width="180" show-overflow-tooltip />-->
        <el-table-column label="状态" align="center" prop="state" min-width="120" />
<!--        <el-table-column label="备注" prop="remark" width="180" />-->
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_detail"
              name="编辑"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_delete"
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
  import excelImport from '@/components/excelImport'
  import ServiceSelect from '@/components/ServiceSelect';
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'memberManage',
    components: {
      YPageListLayout,
      PermissionButton,
      excelImport,
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
          clubId: Number(this.$route.query.clubId)
        },
        initQuery: {
          clubId: this.$route.query.clubId,
          clubName: this.$route.query.clubName,
        },
        employeeDate: null
      }
    },
    created() {
      this.search();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        const sendData = Object.assign({}, this.pageInfo, this.form);
        if (this.employeeDate) {
          sendData.employeeDateStart = this.employeeDate[0];
          sendData.employeeDateEnd = this.employeeDate[1];
        }
        this.$api.LAMemberManage.page(sendData)
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
            this.$api.LAMemberManage.remove(id)
              .then(() => {
                this.search();
              })
          });
      },
      // 下载模板
      downloadTemplate() {
        this.$utils.exportUtil('/clubMember/download/importTemplate', null, '社员导入模板')
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
