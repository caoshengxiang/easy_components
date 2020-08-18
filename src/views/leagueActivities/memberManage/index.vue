<template>
  <common-layout>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <index-query-form ref="queryForm" :query="getData" />
      </template>
      <template slot="right">
        <el-form inline>
          <el-form-item>
            <el-upload
              class="filter-item"
              style="display: inline-block;margin-left: 10px;"
              action=""
              :before-upload="beforeUpload"
            >
              <PermissionButton
                menu-no="_views_leagueActivities_memberManage_import"
                name="导入"
                round
                type="primary"
                icon="el-icon-upload2"
              />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_download"
              round
              icon="el-icon-download"
              name="学生信息模板下载"
              @click="downloadTemplate"
            />
          </el-form-item>
        </el-form>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="社团名称" prop="communityName" />
        <el-table-column label="社员姓名" prop="name" />
        <el-table-column label="班级" prop="class" />
        <el-table-column label="年级" align="center" prop="grade" />
        <el-table-column label="专业" prop="specialty" />
        <el-table-column label="社团职务" prop="jobs" />
        <el-table-column label="任职日期" align="center" prop="jobDate" />
        <el-table-column label="入社日期" align="center" prop="createdDate" />
        <el-table-column label="工作内容" prop="workContent" />
        <el-table-column label="社团评价" prop="comment" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_detail"
              name="详情"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_memberManage_delete"
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
  import IndexQueryForm from './components/IndexQueryForm'

  export default {
    name: 'memberManage',
    components: {
      YPageListLayout,
      CommonLayout,
      PermissionButton,
      IndexQueryForm
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
        filters: {
          communityName: this.$route.query.communityName
        }
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
      beforeUpload(file) {
        const param = new FormData();
        param.append('file', file, file.name);
        // todo 对接口
        this.$api.staff.importExcel(param).then((res) => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '导入成功',
              type: 'success',
              duration: 2000
            });
            this.$refs.queryForm.search();
          }
        });
        return false
      },
      downloadTemplate() {
        // todo 对接口
        this.$utils.exportUtil('/student/download/importTemplate', null, '学生信息模板')
      },
    }
  };
</script>
