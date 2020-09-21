import request from '@/utils/request'

export default {
  login(params) {
    return request.get(`vue-element-admin/user/login`, { params: params })
  },
}
