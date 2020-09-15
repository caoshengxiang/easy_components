<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <p>
          计分项名称:
          <el-input v-model="input" style="width: 200px;margin-left: 20px;" clearable />
        </p>
        <p>
          所属分类:
          <el-select v-model="value" placeholder="所属分类" style="width: 200px;margin-left: 20px;">
            <el-option
              v-for="item in classification"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          计分项状态:
          <el-select v-model="value1" placeholder="计分项状态" style="width: 200px;margin-left: 20px;">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          分值:
          <el-input
            v-model="input1"
            placeholder="0"
            style="width: 200px;margin-left: 20px;"
            clearable
          />
        </p>
        <el-button size="mini" type="primary">保存</el-button>
        <el-button size="mini" type="info" @click="handleDelete()">取消</el-button>
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
      value: "",
      value1: "",
      input: "",
      input1: "",
      classification: [
        { value: "选项1", label: "测试分类1" },
        { value: "选项2", label: "测试分类2" },
      ],
      state: [
        { value: "选项1", label: "启用" },
        { value: "选项2", label: "禁用" },
      ],
    };
  },
  methods: {
    handleDelete() {
      this.$router.push("/views/attainment/scoreBook/bookClass/ScoringList");
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align-last: justify;

  text-align: justify;

  text-justify: distribute-all-lines; // 这行必加，兼bai容ie浏览器
}
</style>