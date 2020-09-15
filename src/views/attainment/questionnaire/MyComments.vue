<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input
          v-model="input"
          placeholder="评价表名称"
          prefix-icon="el-icon-search"
          style="width: 200px;float: left;margin-left: 20px; margin-bottom:20px;"
          clearable
        />
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="primary"
          @click="searchList"
        >搜索</el-button>

        <parentTable :data="tableData" slot="table" style="width: 100%;">
          <el-table-column label="评价表名称" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.evaluationName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.creationTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.founder }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300px" fixed="right">
            <PermissionButton
              menu-no="_views_attainment_questionnaire_EvaluateList"
              type="success"
              name
              :page-jump="true"
            />
            <!-- <el-button size="mini" type="success" @click="evaluate()">评价列表</el-button> -->
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
          evaluationName: "测试评价表1",
          creationTime: "2020-09-01 10:03:13",
          founder: "超级管理员",
        },
        {
          evaluationName: "测试评价表2",
          creationTime: "2020-09-01 10:03:13",
          founder: "超级管理员",
        },
      ],
    };
  },
  methods: {
    //   评价分页
    getList() {
      const that = this;
      console.log("我的评价分页");
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    // 评价
    evaluate() {
      console.log("评价");
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