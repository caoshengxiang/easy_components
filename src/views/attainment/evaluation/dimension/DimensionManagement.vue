<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left;"
          round
          type="primary"
          @click="add"
        >+新增维度</el-button>
        <el-input
          v-model="input"
          placeholder="维度名称"
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
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="info"
          @click="file"
        >当前评价结果归档</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
          @click="weight"
        >权重设置</el-button>
      </template>
      <parentTable :data="tableData" slot="table" style="width: 100%;">
        <el-table-column label="维度名称" prop="id" align="center" highlight-current-row>
          <template slot-scope="{row}">
            <span>{{ row.dimensionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维度状态" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dimensionStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="初始分数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.initialScore }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维度权重" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dimensionWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template slot-scope="{row}">
            <PermissionButton
              menu-no="_views_attainment_evaluation_dimension_DataSource"
              type="primary"
              name
              :page-jump="true"
            />
            <el-switch
              style="margin-left:10px"
              v-model="row.value1"
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
      input: "",
      value1: true,
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      tableData: [
        {
          dimensionName: "身心素养",
          dimensionStatus: "启用",
          initialScore: "100",
          dimensionWeight: "20",
        },
        {
          dimensionName: "职业素养",
          dimensionStatus: "禁用",
          initialScore: "100",
          dimensionWeight: "50",
        },
        {
          dimensionName: "专业素养",
          dimensionStatus: "启用",
          initialScore: "100",
          dimensionWeight: "50",
        },
        {
          dimensionName: "科学文化素养",
          dimensionStatus: "启用",
          initialScore: "100",
          dimensionWeight: "30",
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
    },
    //新增
    add() {
      this.$confirm(
        "<p>维度名称:<input></p><p>初始分数:<input></p><p>是否启用:<input type='radio' value='1' name='ra' />是<span>&nbsp;&nbsp;</span><input type='radio' value='2'name='ra' />否</p>",

        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "保存",
          cancelButtonText: "取消",
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "您已新增成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您已取消",
          });
        });

      //

      // this.$prompt("请输入名称", {
      //   confirmButtonText: "保存",
      //   cancelButtonText: "取消",
      // })
      //   .then(({ value }) => {
      //     this.$message({
      //       type: "success",
      //       message: "你的命名是: " + value,
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "取消输入",
      //     });
      //   });
    },
    getList() {
      const that = this;
      console.log("维度管理分页");
    },
    // 编辑
    handleSet() {
      console.log("设置数据源");
    },

    // 归档
    file() {
      this.$prompt("请输入名称", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的命名是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 权重设置
    weight() {
      this.$confirm(
        "<p>身心素养:<input type='number' style='width:20%'>%</p><p>专业素养:<input type='number' style='width:20%'>%</p><p>科学文化素养:<input type='number' style='width:20%'>%</p>",

        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "保存",
          cancelButtonText: "取消",
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "您已保存成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您已取消",
          });
        });
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