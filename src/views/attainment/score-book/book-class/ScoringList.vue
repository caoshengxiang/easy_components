<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <PermissionButton
          menu-no="_views_attainment_scoreBook_bookClass_ScoringList_ClassAdd"
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
        >+新增计分项</el-button>-->
        <el-input
          v-model="input"
          placeholder="记分项名称"
          prefix-icon="el-icon-search"
          style="width: 200px;float: left;margin-left: 20px;"
          clearable
        />
        <el-select
          v-model="value"
          placeholder="计分项状态"
          style="width: 200px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in state"
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

        <parentTable :data="tableData" slot="table" style="width: 100%;margin-top:60px">
          <el-table-column label="计分项名称" prop="id" align="center" highlight-current-row>
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属分类" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.classification }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计分项状态" align="center">
            <template slot-scope="{row}">
              <span>{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分值" align="center">
            <template slot-scope="{row}">
              <span>{{ row.score }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="300px" fixed="right">
            <template slot-scope="{row}">
              <PermissionButton
                menu-no="_views_attainment_scoreBook_bookClass_ScoringList_ClassEdit"
                type="primary"
                name
                :page-jump="true"
              />
              <!-- <el-button size="mini" type="danger" @click="handleDelete()">编辑</el-button> -->
              <el-switch
                v-model="row.value1"
                active-text="禁用"
                inactive-text="启用"
                style="margin:0 10px"
              ></el-switch>
              <el-button size="mini" type="danger" @click="handleDelete()">删除</el-button>
            </template>
          </el-table-column>
        </parentTable>
        <el-button type="primary" @click="handReturn()" style="margin-top:20px">返回</el-button>
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
      value: "",
      value1: true,
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      state: [
        { value: "选项1", label: "启用" },
        { value: "选项2", label: "禁用" },
      ],
      tableData: [
        {
          name: "上课积极回答老师提问",
          classification: "测试分类1",
          status: "启用",
          score: "+5",
        },
        {
          name: "上课睡觉",
          classification: "测试分类2",
          status: "禁用",
          score: "-5",
        },
      ],
    };
  },
  methods: {
    getList() {
      const that = this;
      console.log("记分项列表分页");
    },
    searchList() {
      console.log("搜索");
    },
    handReturn() {
      this.$router.push("/views/attainment/scoreBook/bookClass/Class");
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