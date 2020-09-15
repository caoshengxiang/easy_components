<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_scoreBook_bookList_List_Add"
          style="margin-left: 20px;float: left;"
          type="primary"
          icon="el-icon-plus"
          round
          name
          :page-jump="true"
        />
        <!-- <el-button
          class="filter-item"
          style="margin-left: 20px;float: left;"
          round
          type="primary"
        >+新建记分册学期</el-button>-->
        <el-select
          v-model="value1"
          placeholder="学期"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in semester"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          v-model="value2"
          placeholder="年级"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in grade"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          v-model="value3"
          placeholder="专业"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in major"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-input
          v-model="input"
          placeholder="记分册名称"
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
        <el-table-column label="学期" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.semester }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" align="center">
          <template slot-scope="{row}">
            <span>{{ row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属课程" align="center">
          <template slot-scope="{row}">
            <span>{{ row.courses }}</span>
          </template>
        </el-table-column>
        <el-table-column label="记分册名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.recordName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template>
            <PermissionButton
              menu-no="_views_attainment_scoreBook_bookList_List_Edit"
              type="primary"
              name
              :page-jump="true"
            />
            <PermissionButton
              menu-no="_views_attainment_scoreBook_bookList_List_details"
              type="warning"
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
      value1: "",
      value2: "",
      value3: "",

      semester: [
        { value: "选项1", label: "2019-2020年上学期" },
        { value: "选项2", label: "2019-2020年下学期" },
      ],
      grade: [
        { value: "选择1", label: "2018级" },
        { value: "选择2", label: "2019级" },
        { value: "选择3", label: "2020级" },
      ],
      major: [
        { value: "专业1", label: "计算机专业" },
        { value: "专业2", label: "平面设计专业" },
        { value: "专业3", label: "学前教育专业" },
        { value: "专业4", label: "航空服务专业" },
        { value: "专业5", label: "建筑工程专业" },
      ],
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          semester: "2019-2020年上学期",
          grade: "2018级",
          major: "计算机专业",
          courses: "语文",
          recordName: "测试记分册名称1",
          time: "2012-9-7 9:30",
        },
        {
          semester: "2019-2020年上学期",
          grade: "2018级",
          major: "计算机专业",
          courses: "语文",
          recordName: "测试记分册名称2",
          time: "2012-9-7 9:30",
        },
        {
          semester: "2019-2020年下学期",
          grade: "2018级",
          major: "计算机专业",
          courses: "数学",
          recordName: "测试记分册名称3",
          time: "2012-9-7 9:30",
        },
        {
          semester: "2019-2020年下学期",
          grade: "2018级",
          major: "计算机专业",
          courses: "数学",
          recordName: "测试记分册名称4",
          time: "2012-9-7 9:30",
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
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.options = [];
      this.grade = [];
      this.semester = [];
      this.major = [];
    },
    getList() {
      const that = this;
      console.log("记分册列表分页");
    },
    // 编辑
    handleEdit() {
      console.log("编辑");
    },
    // 删除
    handleDelete() {
      console.log("删除");
    },
    // 详情
    handleDetails() {
      console.log("详情");
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