import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`post`, { params: params })
  },
  detail(params) {
    return request.get(`post/${params}`)
  },
  add(params) {
    return request.post(`post`, params)
  },
  edit(params) {
    return request.put(`post`, params)
  },
  delete(params) {
    return request.delete(`post/${params}`)
  },
  simpleAll(params) { // 下拉
    return request.get(`post/simpleAll`, { params: params })
  }
}
