<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout :save="handleCreate" :edit-status="false" menu-no="_views_set_cof_edit">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            ref="postForm"
            label-width="200px"
            :model="postForm"
            :rules="rules"
            style="width: 1000px;margin: auto"
            class="form-container"
          >

            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="系统名称：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="教师编号前缀：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="预报名失效（小时）：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="左上角logo：" prop="type" class="postInfo-container-item">
                      <div>
                        <el-upload
                          action=""
                          class="avatar-uploader"
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeAvatarUpload"
                        >
                          <el-image
                            v-if="postForm.type"
                            style="width: 300px; height: 200px;margin-right: 5px;"
                            :src="postForm.type"
                          />
                          <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="postForm.type" alt="">
                        </el-dialog>
                        <div>请上传图片（jpg、png、jpej、gif等格式）</div>
                      </div>
<!--                      <div v-else>-->
<!--                        <el-image-->
<!--                          style="width: 300px; height: 200px;margin-right: 5px;"-->
<!--                          :src="postForm.type"-->
<!--                        />-->
<!--                      </div>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="登录背景图：" prop="type" class="postInfo-container-item">
                      <div>
                        <el-upload
                          action=""
                          class="avatar-uploader"
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeAvatarUpload"
                        >
                          <el-image
                            v-if="postForm.type"
                            style="width: 300px; height: 200px;margin-right: 5px;"
                            :src="postForm.type"
                          />
                          <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="postForm.type" alt="">
                        </el-dialog>
                        <div>请上传图片（jpg、png、jpej、gif等格式）</div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="承诺书：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="协议：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="通知书：" prop="type" class="postInfo-container-item">
                      <el-input v-model="postForm.type" class="filter-item"/>
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
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    id: ''
  }

  export default {
    name: 'SetInfo',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    data() {
      return {
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }]
        },
        dialogVisible: false,
        fileList: [],
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        this.$api.globalConfig.list().then(res => {
          this.postForm = res.data
        })
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            //
          }
        })
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList)
        this.fileList = fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isPNG = file.type === 'image/png'
        const isImg = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < 10

        if (!isImg) {
          this.$message.error('上传头像图片只能是 图片 格式!')
          return false
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }

        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.common.upload(param).then((res) => {
          this.fileList.push({ url: res.data.url })
        })
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
