<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <el-form inline :model="form">
          <el-form-item>
            <PermissionButton round menu-no="_views_leagueActivities_leagueMember_add" type="primary" name="新增团员" :page-jump="true" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.communityName" placeholder="支部名称" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.jobs" placeholder="职位" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="团员姓名" />
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
        <el-form inline>
          <el-form-item>
            <el-upload
              class="filter-item"
              style="display: inline-block;margin-left: 10px;"
              action=""
              :before-upload="beforeUpload"
            >
              <PermissionButton
                menu-no="_views_leagueActivities_leagueMember_import"
                name="导入"
                round
                type="primary"
                icon="el-icon-upload2"
              />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_download"
              round
              icon="el-icon-download"
              name="导入模板下载"
              @click="downloadTemplate"
            />
          </el-form-item>
        </el-form>
      </template>
      <parentTable v-loading="loading" :data="tableData.records" slot="table" style="width: 100%;">
        <el-table-column label="团支部名称" prop="communityName" />
        <el-table-column label="团员" prop="name" />
        <el-table-column label="职位" prop="jobs" />
        <el-table-column label="任职日期" align="center" prop="jobDate" />
        <el-table-column label="工作内容" prop="workContent" />
        <el-table-column label="入团时间" align="center" prop="createdDate" />
        <el-table-column label="创建时间" align="center" prop="createDate" />
        <el-table-column label="创建人" prop="creator" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_add"
              name="详情"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueMember_add"
              name="删除"
              type="danger"
              @click="deleteRow(row)"
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

  export default {
    name: 'leagueMember',
    components: {
      YPageListLayout,
      PermissionButton,
    },
    data() {
      return {
        loading: false,
        pageInfo: {
          page: 1,
          size: 10,
          descs: 'id'
        },
        tableData: { records: [] },
        form: {
          communityName: this.$route.query.communityName
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取列表数据
      getData() {
        this.loading = true;
        // todo 对接口
        this.$api.moralManageNotice.page(Object.assign({}, this.pageInfo, this.form))
          .then(res => {
            this.tableData = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      // 删除行项
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
      // 上传
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
      // 下载模板
      downloadTemplate() {
        // todo 对接口
        this.$utils.exportUtil('/student/download/importTemplate', null, '学生信息模板')
      },
      // 查询
      search() {
        this.getData();
      },
      // 重置
      reset() {
        this.form = {};
        this.getData();
      }
    }
  };
</script>
