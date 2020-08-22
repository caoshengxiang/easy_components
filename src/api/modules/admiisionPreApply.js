import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  applyvalidPage(params) {
    return request.get(`admiisionPreApply/applyvalidPage`, { params: params })
  },
  list(params) {
    return request.get(`admiisionPreApply`, { params: params })
  },
  detail(params) {
    return request.get(`adminssionTask/${params}`)
  },
  add(params) {
    return request.post(`adminssionTask`, params)
  },
  edit(params) {
    return request.put(`adminssionTask`, params)
  },
  delete(params) {
    return request.delete(`adminssionTask/${params}`)
  },
}
