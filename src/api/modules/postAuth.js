import request2 from '@/utils/request2'
/*
* 岗位权限
*/
export default {
  list(params) {
    return request2.get(`postPrivilege`, { params: params })
  },
  detail(params) {
    return request2.get(`postPrivilege/${params}`)
  },
  add(params) {
    return request2.post(`postPrivilege`, params)
  },
  edit(params) {
    return request2.put(`postPrivilege`, params)
  },
  delete(params) {
    return request2.delete(`postPrivilege/${params}`)
  },
  simpleAll(params) { // 下拉
    return request2.get(`postPrivilege/simpleAll`, { params: params })
  },
  tree(params) { // 下拉
    return request2.get(`postPrivilege/tree`, { params: params })
  },
}
