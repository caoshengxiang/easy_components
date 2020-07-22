import request from '@/utils/request'
import md5 from 'js-md5'
/*
* 账号用户
*/
export default {
  login(params) {
    return request.post(`user/login`, {
      account: params.account,
      pwd: md5(params.pwd),
      userType: params.userType
    })
  },
  userInfo(params) {
    return request.get('user/baseInfo', { params: params })
  },
  userMenus(params) {
    return request.get(`user/privilegesTree`, { params: params })
  },
  // update(params) {
  //   return request.post(`system/user/updateBySelf`, params)
  // },
  // resetPwd(params) {
  //   return request.post(`system/user/resetSelfPwd`, params)
  // },
  // userList(params) {
  //   return request.get(`system/user/page`, { params: params })
  // }
}
