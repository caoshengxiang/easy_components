import request2 from '@/utils/request2'
import md5 from 'js-md5'
export default {
  login(params) {
    return request2.post('auth/loginV2', {
      username: params.username,
      password: md5(params.password)
    }, {
      headers: {
        pos: 3
      }
    })
  },
  userInfo(params) {
    return request2.get('system/user/info/front', { params: params })
  },
  update(params) {
    return request2.post('system/user/updateBySelf', params)
  },
  resetPwd(params) {
    return request2.post('system/user/resetSelfPwd', params)
  },
  userList(params) {
    return request2.get('system/user/page', { params: params })
  }
}
