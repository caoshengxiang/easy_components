import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`organization`, { params: params })
  },
  detail(params) {
    return request.get(`organization/${params}`)
  },
  add(params) {
    return request.post(`organization`, params)
  },
  edit(params) {
    return request.put(`organization`, params)
  },
  delete(params) {
    return request.delete(`organization/${params}`)
  },
  simpleAll(params) { // 下拉
    return request.get(`organization/simpleAll`, { params: params })
  }
}
