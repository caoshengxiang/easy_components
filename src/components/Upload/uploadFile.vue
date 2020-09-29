<template>
  <el-upload
    class="upload-demo"
    action="/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :handlePreview="handlePreview"
    multiple
    :limit="limit"
    :on-exceed="handleExceed"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传文件，且不超过{{imageSize}}MB</div>
  </el-upload>
</template>

<script>

  export default {
    name: "uploadFile",
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
        default: 20
      },
      limit: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        tempUrl: '',
      }
    },
    computed: {
      imageUrl() {
        return this.prefix + this.value
      },
      fileList() {
        if (this.value) {
          return [{url: this.prefix + this.value, name: this.prefix + this.value}]
        } else {
          return []
        }
      },
    },
    methods: {
      handlePreview(file) {
        window.open(file.url)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
        this.emitInput('')
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      beforeAvatarUpload(file, key) {
        // const isImg = file.type.indexOf('image') > -1
        const isLt10M = file.size / 1024 / 1024 < this.imageSize

        // if (!isImg) {
        //   this.$message.error('上传图片只能是 图片 格式!')
        //   return false
        // }
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

<style scoped>

</style>
