import { getToken } from '@/utils/auth'
import $qs from 'qs'

export function fileDown(url, params = {}, name = '') { // 导出
  const link = document.createElement('a') // 创建事件对象
  const query = $qs.stringify(Object.assign({}, {
    token: getToken()
  }, params))

  link.setAttribute('href', process.env.VUE_APP_BASE_API2 + '/' + url + '?' + query)
  link.setAttribute('download', name)
  link.setAttribute('target', '_blank')
  const event = document.createEvent('MouseEvents') // 初始化事件对象
  event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
    null) // 触发事件
  link.dispatchEvent(event)
}

export function UploadImg(file) {
  const isImage = (file.type === 'image/jpeg' ||
    file.type === 'image/gif' ||
    file.type === 'image/png' ||
    file.type === 'image/bmp')
  const isLt2M = file.size / 1024 / 1024 < 10

  if (!isImage) {
    this.$message.error('上传图片只能是 JPG、JPEG、GIF、PNG、BMP 格式!')
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 10MB!')
  }

  if (isImage && isLt2M) {
    const param = new FormData()
    param.append('file', file, file.name)

    // API.file.upload(param, (res) => {
    //   if (res.status) {
    //     this.ruleForm.demandHeadImg = res.data.url
    //   }
    // })
  }
}

export function upload() {

}
