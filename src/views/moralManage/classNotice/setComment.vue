<template>
  <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
    <el-tabs value="first">
      <el-tab-pane label="设置评语" name="first">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="160px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="1S-整理：" prop="importance">
                <el-checkbox-group  v-model="postForm.importance" style="float: left;">
                  <div v-for="item in classInfo">
                    <el-checkbox :label="item.name" :value="item.name"/>
                  </div>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="请选择评语：" prop="importance1">
                <el-checkbox-group  v-model="postForm.importance1" style="float: left;">
                  <div v-for="item in classInfo">
                    <el-checkbox :label="item.name" :value="item.name"/>
                  </div>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="评语内容：" prop="content">
                <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.content" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </y-detail-page-layout>
</template>

<script>
import YDetailPageLayout from '@/components/YDetailPageLayout'
import {getState} from "./noticeStore";

export default {
  name: 'setNotice',
  components: {
    YDetailPageLayout,
  },
  data() {
    return{
      importance:[],
      editStatus:true,
      postForm:{
        importance:[],
        importance1:[]
      },
      classInfo:[],
      rules: {
        importance: [{ required: true, message: '请选择1S-整理', trigger: 'change' }],
        importance1: [{ required: true, message: '请选择评语', trigger: 'change' }],
        content: [{ required: true, message: '请输入评语内容', trigger: 'change' }],
      },
      loading: false
    }
  },
  created() {
    let that = this
    that.getGradeList()
  },
  methods: {
    getGradeList() {
      let that = this
      that.$api.baseInfo.getGradeList().then(data => {
        that.loading = false
        if (data.code === 200) {
          //返回成功
          that.classInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
      that.listLoading = false
    },
    save() {
      const selection = getState('listSelection') || [];
      let ids = selection.map(item=>item.id)
      console.log(ids)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const selection = getState('listSelection') || [];
          let ids = selection.map(item=>item.id)
          console.log(ids)
        } else {
          this.$message.warning('请完善表单信息！');
        }
      })
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
}
</style>
