<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <el-button type="primary" @click="handReturn">返回</el-button>
        <div id="myChart" :style="{width: '1000px', height: '600px'}"></div>
      </template>
    </y-page-list-layout>
  </div>
</template>

<script>
// import echarts from "echarts";
// import Details from "@/views/attainment/evaluation/results/Details"
import Breadcrumb from "@/components/Breadcrumb";
import YDetailPageLayout from "@/components/YDetailPageLayout";
// var myChart = echarts.init(document.getElementById("main"));

export default {
  components: {
    Breadcrumb,
    YDetailPageLayout,
  },
  data() {
    return {
      tableData: [{ ethics: "20" }],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "个人综合素质评测表",
        },
        tooltip: {},
        legend: {
          data: ["数据"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "思想道德素质", max: 100 },
            { name: "科学文化素质", max: 100 },
            { name: "专业素质", max: 100 },
            { name: "职业素质", max: 100 },
            { name: "身心素质", max: 100 },
          ],
        },
        series: [
          {
            name: "数据",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [80, 90, 60, 50, 50],
                name: "数据",
              },
            ],
          },
        ],
      });
    },
    handReturn() {
      this.$router.push("/views/attainment/evaluation/results/Details");
      // console.log("返回");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>