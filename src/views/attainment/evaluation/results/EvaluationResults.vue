<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input
          v-model="input"
          placeholder="评价名称"
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
        <el-button round type="warning" style="float: left" @click="reset">重置</el-button>
      </template>
      <parentTable :data="tableData" slot="table" style="width: 100%;">
        <el-table-column label="评价名称" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.evaluationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.founder }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creationTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template>
            <PermissionButton
              menu-no="_views_attainment_evaluation_results_Details"
              type="success"
              name
              :page-jump="true"
            />
            <el-button size="mini" type="danger" @click="handleDelete()">删除</el-button>
          </template>
        </el-table-column>
      </parentTable>
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
      value1: true,
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          evaluationName: "测评结果1",
          founder: "超级管理员",
          creationTime: "2020-09-02 14:45:49",
        },
        {
          evaluationName: "测评结果2",
          founder: "超级管理员",
          creationTime: "2020-09-02 14:45:49",
        },
      ],
    };
  },
  methods: {
    // 搜索
    searchList() {
      console.log("搜索");
    },
    //重置
    reset() {
      this.input = "";
    },
    getList() {
      const that = this;
      console.log("评定结果分页");
    },

    // 详情
    handleDetails() {
      console.log("详情");
    },
    // 删除
    handleDelete() {
      console.log("删除");
    },
  },
  created() {
    let that = this;
    that.getList(); //分页列表
  },
};
</script>

<style lang="sass" scoped>

</style>