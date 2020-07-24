import request from '@/utils/request'
/*
* 专业
*/
export default {
  simpleAll(params) { // 下拉
    return request.get(`specialty/list`, { params: params })
  }
}
