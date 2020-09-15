<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="学号" width="120">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="grade" label="年级" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="major" label="专业" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="class" label="班级" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="status" label="评价状态" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="evaluation " label="评价" show-overflow-tooltip width="150">
            <PermissionButton
              menu-no="_views_attainment_questionnaire_preview_evaluate"
              type="success"
              name
              :pageQuery="{status:false,submit:true}"
              :page-jump="true"
            />
            <!-- <el-button>评价</el-button> -->
          </el-table-column>
        </el-table>
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
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          number: "11111",
          name: "王小虎",
          grade: "2019级",
          major: "计算机专业",
          class: "计算机一班",
          status: "已评",
        },
        {
          number: "22222",
          name: "王小虎",
          grade: "2019级",
          major: "计算机专业",
          class: "计算机一班",
          status: "未评",
        },
      ],
    };
  },
  methods: {
    //   评价分页
    getList() {
      const that = this;
      console.log("评价列表分页");
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    // 评价
    evaluate() {
      console.log("评价");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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