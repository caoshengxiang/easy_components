<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-page-list-layout :page-list="tableData" :page-para="pageInfo" :get-page-list="getData">
      <template slot="left">
        <el-form inline :model="form">
          <el-form-item>
            <PermissionButton round menu-no="_views_leagueActivities_leagueFee_add" type="primary" name="新增社员" :page-jump="true" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.communityName" placeholder="支部名称" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.fee">
              <el-option label="收入" value="收入" />
              <el-option label="支出" value="支出" />
              <el-option label="上缴" value="上缴" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="form.timeStart" placeholder="时间开始" value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item label-width="20px" label="-">
            <el-date-picker v-model="form.timeStart" placeholder="时间结束" value-format="yyyy-MM-dd" />
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
        <el-table-column label="团支部" prop="name" />
        <el-table-column label="收入" prop="fee" />
        <el-table-column label="金额" prop="amount" />
        <el-table-column label="时间" align="center" prop="createdDate" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="创建时间" align="center" prop="createDate" />
        <el-table-column label="创建人" prop="creator" />
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="{ row }">
            <PermissionButton
              menu-no="_views_leagueActivities_leagueFee_detail"
              name="详情"
              type="primary"
              :page-jump="true"
              :page-query="{ id: row.id }"
              round
            />
            <PermissionButton
              menu-no="_views_leagueActivities_leagueFee_delete"
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
    name: 'leagueFee',
    components: {
      YPageListLayout,
      PermissionButton
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
