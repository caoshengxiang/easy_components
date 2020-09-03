<template>
  <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
    <el-tabs value="first">
      <el-tab-pane label="新增操行分类型" name="first">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="160px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="类型名称：" prop="name">
                <el-input v-model="postForm.name"  />
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
      loading:false,
      classInfo:[],
      rules: {
        name: [{ required: true, message: '请填写类型名称', trigger: 'change' }],
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
          this.$api.conductScore.conductTypeAdd({...this.postForm}).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '新增类型成功',
                type: 'success',
                duration: 2000
              })
              const back = this.$route.query.back
              if (back) {
                this.$router.push(back)
              }
            }
          })

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
