<!--单图上传  通过v-model绑定-->
<template>
  <div class="upload-container">
    <el-upload
      v-if="preview"
      class="avatar-uploader"
      :class="{'uploadDisabled': value}"
      list-type="picture-card"
      :show-file-list="true"
      :limit="1"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      :on-remove="rmImage"
      action="/"
    >
      <i class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
    <el-upload
      v-if="!preview"
      class="avatar-uploader"
      :class="{'uploadDisabled': value}"
      list-type="picture-card"
      :show-file-list="true"
      :limit="1"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-remove="rmImage"
      action="/"
    >
      <i class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%;z-index: 99;" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  // import common from '../../api/modules/common'
  export default {
    name: 'SingleImageUpload',
    props: {
      value: {
        type: String,
        default: ''
      },
      prefix: { // 相对路径的地址，展示图片需添加的前缀
        type: String,
        default: ''
      },
      imageSize: { // 单位Mb
        type: Number,
        default: 10
      },
      preview: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        tempUrl: '',
        dataObj: {token: ''},
        dialogVisible: false,
      }
    },
    computed: {
      imageUrl() {
        return this.prefix + this.value
      },
      fileList() {
        if (this.value) {
          return [{url: this.prefix + this.value}]
        } else {
          return []
        }
      }
    },
    methods: {
      rmImage() {
        this.emitInput('')
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      beforeAvatarUpload(file, key) {
        // const isJPG = file.type === 'image/jpeg'
        // const isPNG = file.type === 'image/png'
        const isImg = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < this.imageSize

        if (!isImg) {
          this.$message.error('上传图片只能是 图片 格式!')
          return false
        }
        if (!isLt10M) {
          this.$message.error(`上传图片大小不能超过 ${this.imageSize}MB!`)
          return false
        }
        const param = new FormData()
        param.append('file', file, file.name)
        this.$api.common.upload(param).then((res) => {
          this.emitInput(res.data.url)
        })
        return false
      },
      handlePictureCardPreview(file) {
        this.dialogVisible = true
      },
    }
  }
</script>
<style lang="scss">
  /* 超过限制隐藏上传 */
  .uploadDisabled .el-upload {
    display: none !important;
  }
</style>
<style lang="scss" scoped>

  .upload-container {
    width: 146px;
    position: relative;
  }
</style>
