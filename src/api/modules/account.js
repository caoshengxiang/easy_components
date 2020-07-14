import request2 from '@/utils/request2'
import md5 from 'js-md5'

export default {
  login(params) {
    return request2.post(`user/login`, {
      account: params.account,
      pwd: md5(params.pwd),
      userType: params.userType
    })
  },
  userInfo(params) {
    return request2.get('system/user/info/front', { params: params })
  },
  userMenus(params) {
    return request2.get(`menu`, { params: params })
  },
  update(params) {
    return request2.post(`system/user/updateBySelf`, params)
  },
  resetPwd(params) {
    return request2.post(`system/user/resetSelfPwd`, params)
  },
  userList(params) {
    return request2.get(`system/user/page`, { params: params })
  }
}
