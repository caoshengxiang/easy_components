import request from '@/utils/request'
/*
* 年级
*/
export default {
  simpleAll(params) { // 下拉
    return request.get(`grade/list`, { params: params })
  }
}
