<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-select v-model="value" placeholder="请选择年级" style="margin-left: 20px;">
          <el-option
            v-for="item in grade"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value1" placeholder="请选择专业" style="margin-left: 20px;">
          <el-option
            v-for="item in major"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="value2" placeholder="请选择班级" style="margin-left: 20px;">
          <el-option
            v-for="item in classes "
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="input"
          placeholder="请输入学号"
          style="width: 200px;margin-left: 20px;"
          clearable
        />
        <el-input
          v-model="input1"
          placeholder="请输入学生姓名"
          style="width: 200px;margin-left: 20px;"
          clearable
        />
        <el-button round type="warning" style="margin-left: 20px;" @click="reset">重置</el-button>
        <el-button style="margin-left: 20px;" round type="primary" @click="searchList">搜索</el-button>
        <el-button style="margin-left: 20px;" round type="info" @click="handReturn">返回</el-button>

        <parentTable :data="tableData" slot="table" style="width: 100%;">
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
          <el-table-column label="专业" prop="id" align="center" highlight-current-row width="150px">
            <template slot-scope="{row}">
              <span>{{ row.major }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年级" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.grade }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" prop="id" align="center" highlight-current-row width="150px">
            <template slot-scope="{row}">
              <span>{{ row.classes }}</span>
            </template>
          </el-table-column>
          <el-table-column label="思想道德素质" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.ethics }}</span>
            </template>
          </el-table-column>
          <el-table-column label="科学文化素质" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.scientific }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专业素质" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.professionalQuality }}</span>
            </template>
          </el-table-column>
          <el-table-column label="职业素质" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.occupation }}</span>
            </template>
          </el-table-column>
          <el-table-column label="身心素质" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.mental }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <PermissionButton
              menu-no="_views_attainment_evaluation_results_DetailsForm"
              type="success"
              name
              :page-jump="true"
            />
            <!-- <el-button size="mini" type="success">详情</el-button> -->
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
      input1: "",
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      grade: [
        { value: "选项1", label: "一年级" },
        { value: "选项2", label: "二年级" },
      ],
      value: "",
      major: [
        { value: "选项1", label: "计算机多媒体专业" },
        { value: "选项2", label: "航空航天专业" },
      ],
      value1: "",
      classes: [
        { value: "选项1", label: "计算机一班" },
        { value: "选项2", label: "计算机二班" },
      ],
      value2: "",
      tableData: [
        {
          number: "180104096",
          name: "周煜杰",
          major: "汽车运用与维修",
          grade: "2018级",
          classes: "2018级网络2班",
          ethics: "0.0",
          scientific: "0.0",
          professionalQuality: "0.0",
          occupation: "0.0",
          mental: "0.0",
        },
      ],
    };
  },
  methods: {
    //   评价分页
    getList() {
      const that = this;
      console.log("评定结果详情分页");
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    // 重置
    reset() {
      this.value = "";
      this.value1 = "";
      this.value2 = "";
      this.input = "";
      this.input1 = "";
    },
    // 返回
    handReturn() {
      this.$router.push(
        "/views/attainment/evaluation/results/EvaluationResults"
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