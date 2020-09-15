<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout :pageList="pageData" :pagePara="pagePara" :getPageList="getList">
      <template slot="left">
        <el-select
          v-model="value"
          placeholder="请选择班级"
          style="width: 250px;float: left;margin-left: 20px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="input"
          placeholder="学生（学号或者姓名）"
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

        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
        >导出模板</el-button>

        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
        >导入记分册</el-button>

        <el-button
          class="filter-item"
          style="margin-left: 20px;float: left"
          round
          type="success"
        >导出结果</el-button>

        <p>
          <el-button
            style="margin-top: 20px;"
            round
            type="primary"
            @click="open"
            :disabled="selected.length==0"
          >批量记分</el-button>
          <el-button style="margin-top: 20px;" round type="warning">重置分数</el-button>
        </p>

        <parentTable
          :data="tableData"
          slot="table"
          style="width: 100%;"
          @selectionChange="selectionChange"
          @select-all="selectAll"
          @select="selectCheck"
        >
          <!-- <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData"> -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="学期" prop="id" align="center" highlight-current-row width="150">
            <template slot-scope="{row}">
              <span>{{ row.semester }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年级" align="center">
            <template slot-scope="{row}">
              <span>{{ row.grade }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专业" align="center">
            <template slot-scope="{row}">
              <span>{{ row.major }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" align="center">
            <template slot-scope="{row}">
              <span>{{ row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程" align="center">
            <template slot-scope="{row}">
              <span>{{ row.curriculum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="得分" align="center">
            <template slot-scope="{row}">
              <span>{{ row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template>
              <PermissionButton
                menu-no="_views_attainment_scoreBook_bookList_List_Record"
                type="warning"
                name
                :page-jump="true"
              />
              <!-- <el-button size="mini" type="warning">详情</el-button> -->
            </template>
          </el-table-column>
          <!-- </el-table> -->
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
      selectIndex: [], //table勾选存放用户
      selected: [],
      disabled: true,
      value: "",
      input: "",
      pageData: {},
      pagePara: {
        current: 0,
        size: 10,
      },
      options: [
        { value: "选项1", label: "计算机一班" },
        { value: "选项2", label: "计算机二班" },
        { value: "选项3", label: "计算机三班" },
      ],
      tableData: [
        {
          semester: "2019-2020年上学期",
          grade: "2018级",
          major: "计算机专业",
          class: "计算机一班",
          name: "赵钱",
          curriculum: "语文",
          score: "100",
        },
        {
          semester: "2019-2020年上学期",
          grade: "2018级",
          major: "计算机专业",
          class: "计算机一班",
          name: "孙李",
          curriculum: "语文",
          score: "100",
        },
        {
          semester: "2019-2020年下学期",
          grade: "2018级",
          major: "计算机专业",
          class: "计算机二班",
          name: "王五",
          curriculum: "数学",
          score: "100",
        },
        {
          semester: "2019-2020年下学期",
          grade: "2018级",
          major: "计算机专业",
          class: "计算机二班",
          name: "马六",
          curriculum: "数学",
          score: "100",
        },
      ],
    };
  },
  methods: {
    getList() {
      const that = this;
      console.log("记分册详情分页");
    },
    // 搜索
    searchList() {
      console.log("搜索");
    },
    // 弹框
    open() {
      this.$alert(
        "<p>计分项：<select><option>上课睡觉</option><option>上课玩手机</option></select></p><p>分值：0</p><p>附件：</p>",

        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "保存",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    // 返回
    handReturn() {
      this.$router.push("/views/attainment/scoreBook/bookList/List");
      //   console.log("返回");
    },
    selectionChange(val) {
      this.selected = val;
    },
    //全选触发
    selectAll(selection) {
      if (selection.length != 0) {
        for (let i = 0; i < selection.length; i++) {
          this.selectIndex[i] = selection[i].userId;
        }
      } else {
        this.selectIndex = [];
      }
    },
    //选中触发
    selectCheck(selection, row) {
      for (var i = 0; i < this.selectIndex.length + 1; i++) {
        if (this.selectIndex.length < selection.length) {
          this.selectIndex[this.selectIndex.length] = row.userId;

          break;
        } else if (this.selectIndex.length > selection.length) {
          if (this.selectIndex[i] == row.userId) {
            this.selectIndex.splice(i, 1);
            break;
          }
        }
      }
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