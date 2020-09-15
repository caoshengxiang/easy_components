<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_evaluation_dimension_AddData"
          type="primary"
          name
          round
          :page-jump="true"
          style="float: left;"
        />
        <!-- <el-button
          class="filter-item"
          style="margin-left: 20px;float: left;"
          round
          type="primary"
        >+批量增加数据源</el-button>-->
        <el-select
          v-model="value1"
          placeholder="年级"
          style="width: 200px;float: left;margin-left: 20px;margin-bottom: 20px;"
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
          style="width: 200px;float: left;margin-left: 20px;margin-bottom: 20px;"
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
          style="width: 200px;float: left;margin-left: 20px;margin-bottom: 20px;"
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
        <el-button type="primary" @click="handReturn" round>返回</el-button>
        <parentTable :data="tableData" slot="table" style="width: 100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="专业" prop="id" align="center" highlight-current-row width="100px">
            <template slot-scope="{row}">
              <span>{{ row.major }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年级" align="center">
            <template slot-scope="{row}">
              <span>{{ row.grade }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" align="center">
            <template slot-scope="{row}">
              <span>{{ row.classes }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <PermissionButton
                menu-no="_views_attainment_evaluation_dimension_SetData"
                type="warning"
                name
                :page-jump="true"
                :page-query="{id: row.id}"
              />
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
          id: "1",
          major: "计算机专业",
          grade: "2019级",
          classes: "计算机一班",
        },
        {
          id: "2",
          major: "计算机专业",
          grade: "2019级",
          classes: "计算机一班",
        },
      ],
      grade: [
        { value: "选项1", label: "2018级" },
        { value: "选项2", label: "2019级" },
        { value: "选项3", label: "2020级" },
      ],
      major: [
        { value: "选项1", label: "计算机专业" },
        { value: "选项2", label: "平面设计专业" },
        { value: "选项3", label: "学前教育专业" },
        { value: "选项4", label: "航空服务专业" },
        { value: "选项5", label: "建筑工程专业" },
      ],
      classes: [
        { value: "选项1", label: "计算机一班" },
        { value: "选项2", label: "计算机二班" },
        { value: "选项3", label: "计算机三班" },
      ],
    };
  },
  methods: {
    getList() {
      const that = this;
      console.log("数据源分页");
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    handReturn() {
      this.$router.push(
        "/views/attainment/evaluation/dimension/DimensionManagement"
      );
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