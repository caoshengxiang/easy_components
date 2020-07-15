import request2 from '@/utils/request2'
/*
* 岗位
*/
export default {
  list(params) {
    return request2.get(`post`, { params: params })
  },
  detail(params) {
    return request2.get(`post/${params}`)
  },
  add(params) {
    return request2.post(`post`, params)
  },
  edit(params) {
    return request2.put(`post`, params)
  },
  delete(params) {
    return request2.delete(`post/${params}`)
  },
  simpleAll(params) { // 下拉
    return request2.get(`post/simpleAll`, { params: params })
  }
}
