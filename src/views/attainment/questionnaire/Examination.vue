<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_questionnaire_AddEvaluate"
          type="primary"
          name
          round
          icon="el-icon-plus"
          style="float: left"
          :page-jump="true"
        />
        <el-input
          v-model="input"
          placeholder="试题名称"
          prefix-icon="el-icon-search"
          style="width: 200px;float: left;margin-left: 20px;"
          clearable
        />
        <el-select
          v-model="value"
          placeholder="试题类型"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          style="width: 200px;float: left;margin-left: 20px;"
        ></el-date-picker>
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
        <el-table-column label="试题名称" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.questionnaireName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试题类型" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.questionnaireState }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.founder }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template>
            <PermissionButton
              menu-no="_views_attainment_questionnaire_Examination_eidt"
              type="primary"
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
      value: "",
      value1: "",
      options: [
        { value: "选项1", label: "单选题" },
        { value: "选项2", label: "多选题" },
      ],
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          questionnaireName: "测试题干1",
          questionnaireState: "问答题",
          time: "2012-9-7 9:30",
          founder: "超级管理员",
        },
        {
          questionnaireName: "测试题干2",
          questionnaireState: "填空题",
          time: "2012-9-8 10:00",
          founder: "超级管理员",
        },
        {
          questionnaireName: "测试题干3",
          questionnaireState: "单选题",
          time: "2012-9-8 10:00",
          founder: "超级管理员",
        },
        {
          questionnaireName: "测试题干4",
          questionnaireState: "多选题",
          time: "2012-9-8 10:00",
          founder: "超级管理员",
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
      this.value = "";
      this.value1 = "";
      this.options = [];
    },
    getList() {
      const that = this;
      console.log("试题分页");
    },
    // 编辑
    handleEdit() {
      console.log("编辑");
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