<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <parentTable :data="tableData" slot="table" style="width: 100%;">
          <el-table-column label="计分项" prop="id" align="center" highlight-current-row width="150">
            <template slot-scope="{row}">
              <span>{{ row.scoring }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分值" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="id" align="center" highlight-current-row width="200">
            <template slot-scope="{row}">
              <span>{{ row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="附件" prop="id" align="center" highlight-current-row>
            <template>
              <el-button size="mini" type="primary">下载</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="id" align="center" highlight-current-row width="150">
            <template slot-scope="{row}">
              <span>{{ row.operator }}</span>
            </template>
          </el-table-column>
        </parentTable>
        <el-button type="primary" @click="handReturn()" style="margin-top:20px">返回</el-button>
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
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          scoring: "上课睡觉",
          score: "-2",
          time: "2020-09-02 15:39:06",
          operator: "超级管理员",
        },
        {
          scoring: "上课玩手机",
          score: "-2",
          time: "2020-09-02 15:39:06",
          operator: "超级管理员",
        },
      ],
    };
  },

  methods: {
    getList() {
      const that = this;
      console.log("记分册详情操作详情分页");
    },
    // 返回
    handReturn() {
      this.$router.push("/views/attainment/score-book/book-list/Details");
      //   console.log("返回");
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