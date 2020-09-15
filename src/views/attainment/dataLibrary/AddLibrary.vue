<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button
          style="margin-left: 20px;float: left;margin-bottom:20px"
          round
          type="primary"
          @click="handReturn"
        >返回</el-button>
        <el-select
          v-model="value1"
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
          v-model="value2"
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

        <el-select
          v-model="value3"
          placeholder="班级"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in classes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="primary"
          @click="searchList"
        >搜索</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="warning"
        >重置分数</el-button>

        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
        >下载模板</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
        >导入数据</el-button>
        <parentTable :data="tableData" slot="table" style="width: 100%; ">
          <el-table-column label="学号" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年级" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row. grade}}</span>
            </template>
          </el-table-column>
          <el-table-column label="专业" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.major }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.classes }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分数" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <el-input-number v-model="row.num" @change="handleChange" :min="1" :max="100"></el-input-number>
            </template>
          </el-table-column>

          <el-table-column label="评价" prop="id" align="center" highlight-current-row>
            <template>
              <el-button size="mini" type="primary" @click="handWrite()">填写分数</el-button>
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
      num: 100,
      value1: "",
      value2: "",
      value3: "",
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          number: "111",
          name: "张三",
          grade: "2019级",
          major: "计算机专业",
          classes: "计算机一班",
        },
        {
          number: "222",
          name: "李四",
          grade: "2019级",
          major: "计算机专业",
          classes: "计算机一班",
        },
      ],
      classes: [
        { value: "选项1", label: "计算机一班" },
        { value: "选项2", label: "计算机二班" },
        { value: "选项3", label: "计算机三班" },
      ],
      major: [
        { value: "选择1", label: "计算机专业" },
        { value: "选择2", label: "平面设计专业" },
        { value: "选择3", label: "学前教育专业" },
        { value: "选择4", label: "航空服务专业" },
        { value: "选择5", label: "建筑工程专业业" },
      ],
      grade: [
        { value: "年级1", label: "2018级" },
        { value: "年级2", label: "2019级" },
        { value: "年级3", label: "2020级" },
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

    handWrite() {
      console.log("填写分数");
    },

    handleChange(value) {
      console.log(value);
    },
    handReturn() {
      //   console.log("123");
      this.$router.push("/views/attainment/dataLibrary/Library");
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