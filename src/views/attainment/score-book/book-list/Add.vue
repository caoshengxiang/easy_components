<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-page-list-layout>
      <template slot="left">
        <p>
          学 期：
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in semester"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          年 级：
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          专 业：
          <el-select v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in major"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          班 级：
          <el-select v-model="value4" placeholder="请选择">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          课 程：
          <el-select v-model="value5" placeholder="请选择">
            <el-option
              v-for="item in curriculum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          名 称：
          <el-input v-model="input1" placeholder="请输入记分册名称" style="width: 200px;" clearable />
        </p>
        <p>
          初始分数：
          <el-input v-model="input2" placeholder="请输入初始分数" style="width: 200px;" clearable />
        </p>
        <el-button type="primary">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
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
      input1: "",
      input2: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",

      semester: [
        { value: "选项1", label: "2019-2020上学期" },
        { value: "选项2", label: "2019-2020下学期" },
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
      curriculum: [
        { value: "选项1", label: "语文" },
        { value: "选项2", label: "数学" },
        { value: "选项3", label: "英语" },
      ],
    };
  },
  methods: {
    cancel() {
      this.$router.push("/views/attainment/scoreBook/bookList/List");
    },
  },
};
</script>

<style lang="sass" scoped>

</style>