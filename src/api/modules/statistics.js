import request from '@/utils/request'
import md5 from 'js-md5'
/*
* 账号用户
*/
export default {
  getStatistics(url, params){
    return request.get(url, { params: params })
  },
}
