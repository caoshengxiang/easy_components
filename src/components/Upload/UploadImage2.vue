<!--多图上传  通过v-model绑定-->

<!--      :on-preview="handlePictureCardPreview"-->
<template>
  <div class="upload-container">
    <el-upload
      class="avatar-uploader"
      :class="{'uploadDisabled': fileList.length >= limit}"
      list-type="picture-card"
      :show-file-list="true"
      :limit="limit"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
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

  export default {
    name: 'ImageUpload2',
    props: {
      value: {
        type: String | Array, // 数组接口必须是 和elementUI 一致，[{url: '', name: ''}]
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
      limit: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        tempUrl: '',
        dataObj: { token: '' },
        dialogVisible: false,
      }
    },
    computed: {
      imageUrl() {
        return this.prefix + this.value
      },
      fileList() {
        if (this.value) {
          if (typeof this.value === 'string') {
            let arr = this.value.split(',')
            return arr.map(item => {
              let urlVal = this.prefix.indexOf(item) > -1 ? item : this.prefix + item
              return { url: urlVal, name: urlVal }
            })
          } else { // 数组
            return this.value
          }
        } else {
          return []
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList)
        let reg = new RegExp(this.prefix, 'g')
        if (typeof this.value === 'string') {
          let str = fileList.map(item => {
            return item.url
            // eslint-disable-next-line no-eval
          }).join(',').replace(eval(reg), '')

          console.log(str)
          this.emitInput(str)
        } else {
          this.emitInput(fileList)
        }
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
          let urlVal = this.prefix.indexOf() > -1 ? res.data.url : this.prefix + res.data.url

          let fileList = JSON.parse(JSON.stringify(this.fileList))
          fileList.push({ url: urlVal, name: urlVal })
          this.handleAdd(fileList)
        })
        return false
      },
      handleAdd(fileList) {
        // console.log(file, fileList)
        let reg = new RegExp(this.prefix, 'g')
        if (typeof this.value === 'string') {
          let str = fileList.map(item => {
            return item.url
            // eslint-disable-next-line no-eval
          }).join(',').replace(eval(reg), '')

          console.log(str)
          this.emitInput(str)
        } else {
          this.emitInput(fileList)
        }
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
    width: 100%;
    position: relative;
  }
</style>
