import request from '@/utils/request'

export default {
  list(params) {
    return request.get(`menu`, { params: params })
  },
  menuTree(params) {
    return request.get(`menu/tree`, { params: params })
  },
  detail(params) {
    return request.get(`menu/${params}`)
  },
  add(params) {
    return request.post(`menu`, params)
  },
  edit(params) {
    return request.put(`menu`, params)
  },
  delete(params) {
    return request.delete(`menu/${params}`)
  },
  simpleAll(params) {
    return request.get(`menu/simpleAll`, {params: params})
  }
}
