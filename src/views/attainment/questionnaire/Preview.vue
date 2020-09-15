<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <y-page-list-layout>
      <template slot="left">
        <img src="../../../assets/PC-校园1.png" height="250" width="894" alt />
        <p>
          网课问卷调查
          <span style="color:#3498db">-学生版</span>
        </p>
        <div
          class="mtop"
        >亲爱的同学们，在延迟开学期间，请您花一点时间，填答以下有关网络课程的调查问卷。问卷采取匿名方式，请认真作答。“固居于室，得以静心，专注于学，突破提升”。希望你秉持学校和老师的教诲，在家长的悉心关怀下，合理规划居家学习与生活，讲安全、讲卫生、少出门、不聚集，科学防控病毒，静候春暖花开。</div>
        <div class="wjhr"></div>
        <el-form
          :model="ruleForm"
          ref="rules"
          class="demo-dynamic"
          style="margin-top:40px;margin-left:20px;line-height: 30px;"
        >
          <el-form-item label="请选择您所在的学段：" prop="name" required>
            <el-select v-model="ruleForm.name" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请问您家中有以下哪些电子设备？（多选）:" prop="type" required>
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="IPTV" name="type"></el-checkbox>
              <el-checkbox label="投影仪" name="type"></el-checkbox>
              <el-checkbox label="笔记本电脑" name="type"></el-checkbox>
              <el-checkbox label="Pad" name="type"></el-checkbox>
              <el-checkbox label="手机" name="type"></el-checkbox>
              <el-checkbox label="以上均无" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="您在疫情之前有过上网络课程的体验吗？（单选）:" prop="resource" required>
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="有"></el-radio>
              <el-radio label="没有"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="疫情期间需要延迟返校，对于新学期课程的安排，您更愿意是哪种形式？（单选）：" prop="modality" required>
            <el-radio-group v-model="ruleForm.modality">
              <el-radio label="先通过网络上课学习新学期课程"></el-radio>
              <el-radio label="等可以回学校了再开始学习新学期课程，可以用周末和其它假期补课"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="如果是网络授课，您更喜欢哪种形式的网络课程？（单选）：" prop="teaching" required>
            <el-radio-group v-model="ruleForm.teaching">
              <el-radio label="直播课程（可以和老师互动或者举手答题等）"></el-radio>
              <el-radio label="录播课程（录制好的课程，不能互动只能观看）"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="您觉得比较合适的网络课程每节课应该多长时间？（单选）：" prop="time" required>
            <el-radio-group v-model="ruleForm.time">
              <el-radio label="30分钟以内"></el-radio>
              <el-radio label="30-60分钟"></el-radio>
              <el-radio label="61-90分钟"></el-radio>
              <el-radio label="91-120分钟"></el-radio>
              <el-radio label="超过120分钟"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button type="primary" v-if="status" @click="handReturn()">返回</el-button>
        <el-button type="primary" v-if="submit" @click="handSubmit()">提交</el-button>

        <p class="foot">此问卷只供预览</p>
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
      status: true,
      submit: true,
      value: "",
      ruleForm: {
        name: "",
        type: [],
        resource: "",
        modality: "",
        teaching: "",
        time: "",
      },
      options: [
        { value: "选项1", label: "小学一到三年级" },
        { value: "选项2", label: "小学四到六年级" },
        { value: "选项3", label: "初中生" },
        { value: "选项4", label: "高中生/职校生/中专生" },
        { value: "选项5", label: "大学生" },
      ],
      rules: {
        name: [
          {
            type: "array",
            required: true,
            message: "请选择学段",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择体验", trigger: "change" },
        ],
        modality: [
          { required: true, message: "请选择课程安排形式", trigger: "change" },
        ],
        teaching: [
          { required: true, message: "请选择授课形式", trigger: "change" },
        ],
        time: [
          { required: true, message: "请选择授课时间", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handReturn() {
      this.$router.push("/views/attainment/questionnaire/Administration");
    },
    handSubmit() {
      console.log("提交");
    },
  },
  mounted() {
    /*  if (this.status === false || this.submit === false) {
      this.status = true;
      this.submit = false;
    } else {
      this.status = true;
      this.submit = false;
    } */
    // console.log(this.$route.query);
  },
  created() {
    this.status = JSON.parse(this.$route.query.status);
    this.submit = JSON.parse(this.$route.query.submit);
    // console.log("-------------", this.status, this.submit);
  },
};
</script>

<style lang="scss" scoped>
p {
  display: block;
  font-size: 18px;
  color: #4c4c4c;
  font-weight: bold;
}
.mtop {
  //   display: block;
  font-size: 16px;
  color: #4c4c4c;
  width: 800px;
  height: 96px;
  //   text-align: center;
  padding: 0px 34px;
  line-height: 24px;
}
.wjhr {
  width: 800px;
  height: 3px;
  background-color: #53a4f4;
  margin: 0px 30px;
  margin-top: 20px;
}
.foot {
  padding-top: 40px;
  font-size: 12px;
  text-align: center;
  color: rgb(150, 148, 148);
}
</style>