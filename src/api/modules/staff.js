import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`staff`, { params: params })
  },
  detail(params) {
    return request.get(`staff/${params}`)
  },
  detailBase(params) {
    return request.get(`staff/base/${params}`)
  },
  add(params) {
    return request.post(`staff`, params)
  },
  edit(params) {
    return request.put(`staff/${params.id}`, params)
  },
  editBase(params) {
    return request.put(`staff/base/${params.id}`, params)
  },
  // delete(params) {
  //   return request.delete(`staff/${params}`)
  // },
  // simpleAll(params) { // 下拉
  //   return request.get(`post/simpleAll`, { params: params })
  // }
}
