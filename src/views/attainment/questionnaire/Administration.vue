<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_questionnaire_eidt_add"
          type="primary"
          name
          round
          icon="el-icon-plus"
          style="float: left"
          :page-jump="true"
        />
        <el-input
          v-model="input"
          placeholder="问卷名称"
          prefix-icon="el-icon-search"
          style="width: 200px;float: left;margin-left: 20px;"
          clearable
        />

        <el-select
          v-model="value"
          placeholder="问卷状态"
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
        <el-table-column label="问卷名称" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.questionnaireName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问卷状态" width="150px" align="center">
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
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template slot-scope="{row}">
            <!-- <el-button size="mini" type="success" @click="preview()">预览</el-button> -->
            <PermissionButton
              menu-no="_views_attainment_questionnaire_preview"
              type="success"
              :pageQuery="{status:true,submit:false}"
              name
              :_target="true"
              :page-jump="true"
              :page-query="{id: row.id}"
            />
            <PermissionButton
              menu-no="_views_attainment_questionnaire_eidt"
              type="primary"
              name
              :page-jump="true"
            />
            <!-- <el-button size="mini" type="primary">编辑</el-button> -->
            <el-switch
              style="margin-left: 20px;"
              v-model="row.value2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
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
      importance: [],
      value2: true,
      input: "",
      value: "",
      value1: "",
      options: [
        { value: "选项1", label: "禁用" },
        { value: "选项2", label: "启用" },
      ],
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },

      tableData: [
        {
          questionnaireName: "测试问卷1",
          questionnaireState: "启用",
          time: "2012-9-7 9:30",
          founder: "测试人员1",
        },
        {
          questionnaireName: "测试问卷2",
          questionnaireState: "禁用",
          time: "2012-9-8 10:00",
          founder: "测试人员2",
        },
      ],
    };
  },
  created() {
    let that = this;
    that.getList(); //分页列表
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
    // 预览
    preview() {
      console.log("预览");
    },
    // 编辑
    // handleEdit() {
    //   console.log("编辑");
    // },
    // 禁用
    handleDisable() {
      console.log("禁用");
    },
    getList() {
      const that = this;
      console.log("问卷分页");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>