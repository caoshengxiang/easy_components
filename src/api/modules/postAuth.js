import request from '@/utils/request'
/*
* 岗位权限
*/
export default {
  list(params) {
    return request.get(`postPrivilege`, { params: params })
  },
  detail(params) {
    return request.get(`postPrivilege/${params}`)
  },
  add(params) {
    return request.post(`postPrivilege`, params)
  },
  edit(params) {
    return request.put(`postPrivilege`, params)
  },
  delete(params) {
    return request.delete(`postPrivilege/${params}`)
  },
  simpleAll(params) { // 下拉
    return request.get(`postPrivilege/simpleAll`, { params: params })
  },
  tree(params) { // 下拉
    return request.get(`postPrivilege/tree`, { params: params })
  },
}
