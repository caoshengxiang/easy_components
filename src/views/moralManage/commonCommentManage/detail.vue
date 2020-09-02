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
                <el-form-item label="类型：" prop="cate" >
                  <el-select
                    v-model="postForm.cate"
                    placeholder="类型"
                    clearable
                    class="filter-item"
                    style="width: 100%"
                  >
                    <el-option v-for="item in cates" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
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
        area: [{
          required: true,
          message: '请填写平时成绩比例',
          trigger: 'change'
        }],
        certificateNum: [{
          required: true,
          message: '请填写期中考试成绩比例',
          trigger: 'change'
        }],
        price: [{
          required: true,
          message: '请填写期末考试成绩比例',
          trigger: 'change'
        }],
        addr: [{
          required: true,
          message: '请填写实作成绩比例',
          trigger: 'change'
        }],
      },
      cates: []
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
    that.getAllEnum()
  },
  methods: {
    getDetail() {
      const that = this
      that.$api.commonCommentManage.getDetail(that.id).then(data => {
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
            that.$api.commonCommentManage.edit({ ...that.postForm }).then(data => {
              that.loading = false
              if (data.code === 250) {

              } else if (data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '编辑通用评语成功',
                  type: 'success',
                  duration: 2000
                })
                that.$router.push({
                  path: '/views/moralManage/commonCommentManage/list',
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
            that.$api.commonCommentManage.add({ ...that.postForm }).then(data => {
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
                  message: '新增通用评语成功',
                  type: 'success',
                  duration: 2000
                })
                that.$router.push({
                  path: '/views/moralManage/commonCommentManage/list',
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
    },
    getAllEnum() {
      this.$api.globalConfig.getAllEnum().then(res=>{
        this.cates = res.data['评语类型']
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
