import request from '@/utils/request_dev'

export default {
  login(params) {
    return request.post(`vue-element-admin/user/login`, params)
  },
}
