<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-input
          v-model="input"
          placeholder="评价项名称"
          style="width: 200px;float: left;margin-left: 20px;margin-bottom:20px"
          clearable
        />
        <el-select
          v-model="value"
          placeholder="评价项类型"
          style="width: 200px;float: left;margin-left: 20px;margin-bottom:20px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <p>
          <el-link disabled type="primary">增加答案</el-link>
        </p>
        <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="200" label="选择试题答案">
            <template slot-scope="scope">{{ scope.row.addAnswer }}</template>
          </el-table-column>
          <el-table-column width="200" label="分值">
            <el-input v-model="input1" placeholder="请输入分值"></el-input>
          </el-table-column>
        </el-table>
        <el-button type="primary" round @click="keep()" style="margin-top:40px">保存</el-button>
        <el-button type="info" round @click="cancel()">取消</el-button>
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
      input1: "",
      value: "",
      // score: "",
      options: [
        { value: "选项1", label: "单选题" },
        { value: "选项2", label: "多选题" },
      ],
      tableData: [{ addAnswer: "多选题答案1" }, { addAnswer: "多选题答案2" }],
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
    };
  },
  methods: {
    getList() {
      const that = this;
      console.log("试题分页");
    },
    //保存
    keep() {
      console.log("保存");
    },
    //取消
    cancel() {
      this.$router.push("/views/attainment/questionnaire/Examination");
      console.log("取消");
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