import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`term`, { params: params })
  },
  detail(params) {
    return request.get(`term/${params}`)
  },
  add(params) {
    return request.post(`term`, params)
  },
  edit(params) {
    return request.put(`term/${params.id}`, params)
  },
  delete(params) {
    return request.delete(`term/${params}`)
  },
  // simpleAll(params) { // 下拉
  //   return request.get(`term/simpleAll`, { params: params })
  // }
}
