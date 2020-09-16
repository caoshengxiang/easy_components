<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <p>
          数据源1
          <el-button type="primary" round>增加</el-button>
        </p>
        <div class="choice">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            style="width:30%;margin-left:10px"
            v-model="input"
            clearable
            size="mini"
            type="number"
          ></el-input>
          <span>%</span>
        </div>

        <p>数据源2</p>
        <div class="choice">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            style="width:30%;margin-left:10px"
            v-model="input1"
            clearable
            size="mini"
            type="number"
          ></el-input>
          <span>%</span>
        </div>

        <p>数据源3</p>
        <div class="choice">
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            style="width:30%;margin-left:10px"
            v-model="input2"
            clearable
            size="mini"
            type="number"
          ></el-input>
          <span>%</span>
        </div>
        <el-button style="margin-top:20px" type="primary">保存</el-button>
        <el-button type="info" @click="cancel()">取消</el-button>
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
      input2: "",
      options: [
        {
          value: "选项1",
          label: "外部数据导入",
        },
        {
          value: "选项2",
          label: "记分册",
        },
        {
          value: "选项3",
          label: "问卷调查",
        },
        {
          value: "选项4",
          label: "实习就业",
        },
        {
          value: "选项5",
          label: "学生体质健康",
        },
      ],
      options1: [
        {
          value: "选项1",
          label: "外部数据导入",
        },
        {
          value: "选项2",
          label: "记分册",
        },
        {
          value: "选项3",
          label: "问卷调查",
        },
        {
          value: "选项4",
          label: "实习就业",
        },
        {
          value: "选项5",
          label: "学生体质健康",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "外部数据导入",
        },
        {
          value: "选项2",
          label: "记分册",
        },
        {
          value: "选项3",
          label: "问卷调查",
        },
        {
          value: "选项4",
          label: "实习就业",
        },
        {
          value: "选项5",
          label: "学生体质健康",
        },
      ],
      value1: "",
      value: "",
      value2: "",
    };
  },
  methods: {
    //   取消
    cancel() {
      this.$router.push("/views/attainment/evaluation/dimension/DataSource");

      //   console.log("quxiao");
    },
  },
};
</script>

<style lang="scss" scoped>
.choice {
  display: flex;
  justify-content: flex-start;
}
</style>