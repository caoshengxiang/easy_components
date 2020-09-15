<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="成绩设置编辑" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="平时成绩（%）：" prop="area" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.area" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="期中考试成绩（%）："
                      prop="certificateNum"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.certificateNum" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="期末考试成绩（%）：" prop="price" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.price" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实作成绩（%）：" prop="addr" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.addr" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'ComplexTable',
    components: {
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
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = false
      }

    },
    methods: {
      getDetail() {
        const that = this;
        that.$api.assetinfo.getLandDetail(that.id).then(data => {
          that.loading = false;
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
        const that = this;
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.assetinfo.editLand({ ...that.postForm }).then(data => {
                that.loading = false;
                if (data.code === 250) {

                } else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  });
                  that.$router.push({
                    path: '/views/moralMange/notification/list',
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
              }).catch(_ => this.loading = false);
            } else {
              that.$api.assetinfo.addLand({ ...that.postForm }).then(data => {
                that.loading = false;
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
                    message: '规则设置成功',
                    type: 'success',
                    duration: 2000
                  });
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/list',
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
              }).catch(_ => this.loading = false);
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
