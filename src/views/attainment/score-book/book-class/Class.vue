<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left;"
          round
          type="primary"
          @click="open"
        >+新增分类</el-button>
        <el-input
          v-model="input"
          placeholder="分类名称"
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
        <el-table-column label="计分项分类名称" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.classificationName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.founder }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template>
            <el-button size="mini" type="primary" @click="open">编辑</el-button>
            <PermissionButton
              menu-no="_views_attainment_scoreBook_bookClass_ScoringList"
              type="warning"
              name
              :page-jump="true"
            />
            <el-button size="mini" type="danger" @click="handleWarrant()">授权</el-button>
            <el-button size="mini" @click="handleDelete()">删除</el-button>
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

      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          classificationName: "测试分类1",
          time: "2012-9-7 9:30",
          founder: "超级管理员",
        },
        {
          classificationName: "测试分类2",
          time: "2012-9-7 10:30",
          founder: "超级管理员",
        },
      ],
    };
  },
  methods: {
    //弹窗
    open() {
      this.$prompt("分类名称", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "您添加的分类名称为: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    //重置
    reset() {
      this.input = "";
      this.value = "";
      this.value1 = "";
      this.options = [];
    },
    getList() {
      const that = this;
      console.log("计分项分页");
    },

    // 计分项
    handleScoring() {
      console.log("计分项");
    },
    // 授权
    handleWarrant() {
      this.$confirm(
        "<p><input type='checkbox' />班主任</p><p><input type='checkbox' />任课老师</p>",
        "中思远研究院",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消选择",
          });
        });
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