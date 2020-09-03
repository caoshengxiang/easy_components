<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="评语设置" name="first">
          <el-form ref="postForm" class="form-container" :model="postForm" label-width="70px" :rules="rules" >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="标题：" prop="title">
                      <el-input v-model="postForm.title" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="内容：" prop="content" >
                      <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.content" show-word-limit />
                    </el-form-item>
                  </el-col>
                </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'ComplexTable',
    components: {
      ServiceSelect,
      Breadcrumb,
      YDetailPageLayout
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        editStatus: true,
        postForm: {},
        rules: {
          title: [{
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请填写内容',
            trigger: 'blur'
          }]
        },
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = true
      }

    },
    methods: {
      getDetail() {
        const that = this
        that.$api.commentManage.getDetail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save() {
        const that = this
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.commentManage.edit({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 250) {

                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑评语成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/moralManage/commentManage/list',
                    query: {
                      menuLevel1: this.$route.query.menuLevel1
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              that.$api.commentManage.add({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 250) {
                  that.$router.push({
                    path: '/views/moralMange/notification/list',
                    query: {
                      menuLevel1: this.$route.query.menuLevel1
                    }
                  })
                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增评语成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/moralManage/commentManage/list',
                    query: {
                      menuLevel1: this.$route.query.menuLevel1
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

.form-container {
  max-width: 600px;
  margin: auto;
}
</style>
