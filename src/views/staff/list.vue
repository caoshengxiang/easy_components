<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :page-list="pageData" :page-para="listQuery" :get-page-list="getList">
      <template slot="left">
        <!--        <el-button class="filter-item" style="margin-left: 0px;" type="primary" icon="el-icon-plus" @click="handleAdd">-->
        <!--          新增教职工-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_staff_add"
          class-name="filter-item"
          type="primary"
          icon="el-icon-plus"
          name
          size="mini"
          :page-jump="true"
          round
          style="float: left"
        />
        <el-select
          v-model="listQuery.sex"
          placeholder="性别"
          clearable
          filterable
          style="margin-left: 20px;width: 100px;float: left;"
          class="filter-item"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
        <el-input
          v-model="listQuery.description"
          placeholder="请输入内容"
          clearable
          style="margin-left: 20px;width: 320px;float: left;"
        >
          <el-select slot="prepend" v-model="listQueryKey" style="width: 90px;" placeholder="请选择">
            <el-option label="全部" value="keyword" />
            <el-option label="工号" value="staffNo" />
            <el-option label="姓名" value="name" />
            <el-option label="部门" value="organizationName" />
            <el-option label="岗位" value="postName" />
          </el-select>
        </el-input>
        <el-button
          class="filter-item"
          style="margin-left: 10px;float: left;"
          type="primary"
          @click="searchList"
          round
        >搜索</el-button>
        <el-button
          class="filter-item"
          style="float: left;"
          round
          type="warning"
          @click="resetSearch()"
        >重置</el-button>
      </template>
      <template slot="right">
        <!--        <el-button-->
        <!--          class="filter-item download-button"-->
        <!--          style="margin-left: 10px;"-->
        <!--          icon="el-icon-download"-->
        <!--          @click="handleCreate"-->
        <!--        >-->
        <!--          导入模板下载-->
        <!--        </el-button>-->
        <PermissionButton
          menu-no="_views_staff_list_import"
          class-name="filter-item"
          icon="el-icon-download"
          name="导入模板下载"
          @click="exportFile"
          round
        />
        <!--        <el-button-->
        <!--          class="filter-item download-button"-->
        <!--          style="margin-left: 10px;"-->
        <!--          type="primary"-->
        <!--          icon="el-icon-upload2"-->
        <!--          @click="handleCreate"-->
        <!--        >-->
        <!--          导入-->
        <!--        </el-button>-->
        <el-upload
          class="filter-item"
          style="display: inline-block;margin-left: 10px;"
          action
          :before-upload="beforeUpload"
        >
          <PermissionButton
            menu-no="_views_staff_list_import"
            class-name="filter-item"
            type="primary"
            icon="el-icon-upload2"
            name="导入"
            round
          />
        </el-upload>
      </template>
      <parentTable
        v-loading="listLoading"
        :data="pageData.records"
        slot="table"
        style="width: 100%;"
      >
        <!--      <el-table-->
        <!--        slot="table"-->
        <!--        v-loading="listLoading"-->
        <!--        :data="pageData.records"-->
        <!--        fit-->
        <!--        highlight-current-row-->
        <!--        style="width: 100%;"-->
        <!--      >-->
        <el-table-column label="职工编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.staffNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center" width="120">
          <template slot-scope="{row}">
            <span>{{ row.sex }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="管理员类型" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.teacherType }} </span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row}} </span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="所属部门-岗位" align="center">
          <template slot-scope="{row}">
            <span v-for="(item, index) in row.posts" :key="item.id">
              <span v-if="index > 0">、</span>
              {{ item.organizationName }}-{{ item.postName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="基本信息" align="center">
          <template slot-scope="{row}">
            <!--          <i class="el-icon-edit"></i>-->
            <PermissionButton
              menu-no="_views_staff_detail"
              class-name="filter-item"
              name
              type="text"
              :page-jump="true"
              :page-query="{id: row.id}"
              round
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <el-table-column label="学历证书" align="center">
          <template slot-scope="{row}">
            <!--          <i class="el-icon-edit"></i>-->
            <PermissionButton
              menu-no="_views_staff_eduDetail"
              class-name="filter-item"
              name
              type="text"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <el-table-column label="工资情况" align="center">
          <template slot-scope="{row}">
            <!--          <i class="el-icon-edit"></i>-->
            <PermissionButton
              menu-no="_views_staff_wageDetail"
              class-name="filter-item"
              name
              type="text"
              :page-jump="true"
              :page-query="{id: row.id}"
            >
              <svg-icon
                icon-class="edit"
                style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
              />
            </PermissionButton>
          </template>
        </el-table-column>
        <!--      </el-table>-->
      </parentTable>
    </y-page-list-layout>
  </div>
</template>
<script>
import YPageListLayout from "@/components/YPageListLayout";
import Breadcrumb from "@/components/Breadcrumb";
import PermissionButton from "@/components/PermissionButton/PermissionButton";
import { fileDown } from "../../utils/file";

export default {
  name: "ViewsStaffList",
  components: {
    Breadcrumb,
    YPageListLayout,
    PermissionButton,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      tableKey: 0,
      pageData: { records: [] },
      total: 20,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        // name: '',
        // staffNo: '',
        descs: "id",
      },
      listQueryKey: "keyword",
    };
  },
  created() {
    const that = this;
    that.getList();
  },
  methods: {
    resetSearch() {
      this.listQuery = {
        current: 1,
        size: 10,
        descs: "id",
      };
    },
    exportFile() {
      this.$api.staff.download();
    },
    beforeUpload(file) {
      const param = new FormData();
      param.append("file", file, file.name);
      this.$api.staff.fileDown(param).then((res) => {
        if (res.code === 200) {
          this.$notify({
            title: "成功",
            message: "导入成功",
            type: "success",
            duration: 2000,
          });
          this.getList();
        }
      });
      return false;
    },
    removeHandle(row) {
      // console.log(data)
      const that = this;
      that
        .$confirm("确认删除当前记录吗?", "警告", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          this.$api.term.delete(row.id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getList();
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    searchList() {
      // 重置分页
      this.listQuery.page = 1;
      this.listQuery.size = 20;
      this.getList();
    },
    getList() {
      const that = this;
      this.listLoading = true;
      // console.log(that.listQuery)
      const key = {};
      key[this.listQueryKey] = this.listQuery.description;
      this.$api.staff
        .list(Object.assign({}, that.listQuery, key))
        .then((res) => {
          that.pageData = res.data;
          setTimeout(() => {
            that.listLoading = false;
          }, 200);
        })
        .catch(() => {
          that.listLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  flex: 1;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 35px;
    margin-bottom: 8px;
  }

  .menu-2-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .menu-2-item {
    display: flex;
    align-items: center;
    color: #656565;
    font-size: 12px;
    width: 230px;
    height: 101px;
    background: rgb(255, 185, 129);
    border-radius: 3px;
    padding-left: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .text {
      margin-left: 16px;
    }
  }
}
</style>
