import request2 from '@/utils/request2'
/*
* 岗位
*/
export default {
  list(params) {
    return request2.get(`organization`, { params: params })
  },
  detail(params) {
    return request2.get(`organization/${params}`)
  },
  add(params) {
    return request2.post(`organization`, params)
  },
  edit(params) {
    return request2.put(`organization`, params)
  },
  delete(params) {
    return request2.delete(`organization/${params}`)
  },
  simpleAll(params) { // 下拉
    return request2.get(`organization/simpleAll`, { params: params })
  }
}
