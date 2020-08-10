<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true" menu-no="_views_set_cof_edit">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            ref="postForm"
            label-width="200px"
            :model="postForm"
            style="width: 1000px;margin: auto"
            class="form-container"
          >

            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="系统名称：" prop="SYS_NAME" class="postInfo-container-item">
                      <el-input v-model="postForm.SYS_NAME.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="教师编号前缀：" prop="TEACHER_PREFIX" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHER_PREFIX.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="预报名失效（小时）：" prop="SIGN_OUT_OF_HOUR" class="postInfo-container-item">
                      <el-input v-model="postForm.SIGN_OUT_OF_HOUR.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="短信平台用户名：" prop="SMS_USER" class="postInfo-container-item">
                      <el-input v-model="postForm.SMS_USER.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="短信平台密码：" prop="SMS_PWD" class="postInfo-container-item">
                      <el-input v-model="postForm.SMS_PWD.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="左上角logo：" prop="LOGO" class="postInfo-container-item">
                      <div>
                        <el-upload
                          class="avatar-uploader"
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="(file) => {return beforeAvatarUpload(file, 'LOGO')}"
                        >
                          <el-image
                            v-if="postForm.LOGO.value"
                            style="width: 300px; min-height: 50px;margin-right: 5px;"
                            :src="postForm.LOGO.value"
                          />
                          <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
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
                    <el-form-item label="登录背景图：" prop="BACKGROUND" class="postInfo-container-item">
                      <div>
                        <el-upload
                          class="avatar-uploader"
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="(file) => { return beforeAvatarUpload(file, 'BACKGROUND')}"
                        >
                          <el-image
                            v-if="postForm.BACKGROUND.value"
                            style="width: 300px;  min-height: 50px;margin-right: 5px;"
                            :src="postForm.BACKGROUND.value"
                          />
                          <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
                        <div>请上传图片（jpg、png、jpej、gif等格式）</div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="承诺书：" prop="PROMISE_LETTER" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.PROMISE_LETTER" class="filter-item"/>-->
                      <y-ueditor
                        ref="contentUEditor1"
                        :content="postForm.PROMISE_LETTER.value"
                        :config="{
                          initialFrameWidth: null,
                          initialFrameHeight: 350,
                          readonly:false
                        }"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="协议：" prop="PROTOCOL" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.PROTOCOL" class="filter-item" />-->
                      <y-ueditor
                        ref="contentUEditor2"
                        :content="postForm.PROTOCOL.value"
                        :config="{
                          initialFrameWidth: null,
                          initialFrameHeight: 350,
                          readonly:false
                        }"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="通知书：" prop="NOTICE" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.NOTICE" class="filter-item" />-->
                      <y-ueditor
                        ref="contentUEditor3"
                        :content="postForm.NOTICE.value"
                        :config="{
                          initialFrameWidth: null,
                          initialFrameHeight: 350,
                          readonly:false
                        }"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
  import YUeditor from '@/components/YUeditor'

  const defaultForm = {
    SYS_NAME: { value: '' },
    TEACHER_PREFIX: { value: '' },
    NOTICE: { value: '' },
    PROMISE_LETTER: { value: '' },
    SIGN_OUT_OF_HOUR: { value: '' },
    SMS_USER: { value: '' },
    LOGO: { value: '' },
    PROTOCOL: { value: '' },
    BACKGROUND: { value: '' },
    SMS_PWD: { value: '' }
  }

  export default {
    name: 'SetInfo',
    components: {
      Breadcrumb,
      YDetailPageLayout,
      YUeditor
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
        dialogImageUrl: ''
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        this.$api.globalConfig.getValuesByKey({ key: 'sys' }).then(res => {
          this.postForm = res.data.fieldValues
        })
      },
      handleCreate() {
        this.postForm.PROMISE_LETTER.value = this.$refs.contentUEditor1.getUEContent()
        this.postForm.PROTOCOL.value = this.$refs.contentUEditor2.getUEContent()
        this.postForm.NOTICE.value = this.$refs.contentUEditor3.getUEContent()
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.globalConfig.edit({
              key: 'sys',
              fieldValues: this.postForm
            }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeAvatarUpload(file, key) {
        // const isJPG = file.type === 'image/jpeg'
        // const isPNG = file.type === 'image/png'
        const isImg = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < 10

        if (!isImg) {
          this.$message.error('上传头像图片只能是 图片 格式!')
          return false
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!')
          return false
        }

        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.common.upload(param).then((res) => {
          this.postForm[key]['value'] = res.data.url
          // this.postForm[key]['value'] = res.data.fileName
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
            font-size: 14px;
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
