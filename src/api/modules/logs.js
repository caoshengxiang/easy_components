import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`operateLog`, { params: params })
  },
  detail(params) {
    return request.get(`operateLog/${params}`)
  },
  add(params) {
    return request.post(`operateLog`, params)
  },
  edit(params) {
    return request.put(`operateLog`, params)
  },
  delete(params) {
    return request.delete(`operateLog/${params}`)
  },
  // simpleAll(params) { // 下拉
  //   return request.get(`post/simpleAll`, { params: params })
  // }
}
