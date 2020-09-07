import request from '@/utils/request'
/*
* 岗位
*/
export default {
  sendCode(params) {
    return request.get(`sms/sendCode`, { params: params })
  },
  checkSmsCode(params) {
    return request.get(`sms/checkSmsCode`, { params: params })
  },
}
