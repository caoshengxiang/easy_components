<template>
  <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
    <el-tabs value="first">
      <el-tab-pane label="心中操行分类型" name="first">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="160px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="项目名称：" prop="importance">
                <el-input v-model="postForm.importance"  />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详情：" prop="importance1">
                <el-input v-model="postForm.importance1"  />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分值：" prop="content">
                <el-input v-model="postForm.content"  />
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
      }
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
      let that = this
      that.$refs.postForm.validate(valid => {
        if (valid) {
          const back = this.$route.query.back
          if (back) {
            this.$router.push(back)
          }
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
