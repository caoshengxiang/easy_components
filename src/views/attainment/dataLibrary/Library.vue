<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_dataLibrary_Library_AddLibrary"
          style="margin-left: 20px;float: left;margin-bottom:20px"
          type="primary"
          icon="el-icon-plus"
          round
          name
          :page-jump="true"
        />
        <el-input
          v-model="input"
          placeholder="数据源名称"
          prefix-icon="el-icon-search"
          style="width: 200px;float: left;margin-left: 20px;"
          clearable
        />
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="primary"
          @click="searchList"
        >搜索</el-button>
        <parentTable :data="tableData" slot="table" style="width: 100%; ">
          <el-table-column label="数据源名称" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.dataSourceName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.founder }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.creationTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="id" align="center" highlight-current-row>
            <template>
              <PermissionButton
                menu-no="_views_attainment_dataLibrary_Library_EditLibrary"
                type="primary"
                name
                :page-jump="true"
              />
              <el-button size="mini" type="danger" @click="handDelete()">删除</el-button>
            </template>
          </el-table-column>
        </parentTable>
      </template>
    </y-page-list-layout>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import YDetailPageLayout from "@/components/YDetailPageLayout";
export default {
  components: {
    Breadcrumb,
    YDetailPageLayout,
  },
  data() {
    return {
      input: "",
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          dataSourceName: "测试分类1",
          founder: "超级管理员",
          creationTime: "2020-09-02 14:45:49",
        },
        {
          dataSourceName: "测试分类2",
          founder: "超级管理员",
          creationTime: "2020-09-02 14:45:49",
        },
      ],
    };
  },
  methods: {
    getList() {
      const that = this;
      console.log("数据源库分页");
    },
    searchList() {
      console.log("搜索");
    },
    addLibrary() {
      console.log("新增");
    },
    handEdit() {
      console.log("编辑");
    },
    handDelete() {
      console.log("删除");
    },
  },
  created() {
    let that = this;
    that.getList(); //分页列表
  },
};
</script>

<style lang="scss" scoped>
</style>