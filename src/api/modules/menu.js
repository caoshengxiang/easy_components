import request2 from '@/utils/request2'

export default {
  list(params) {
    return request2.get(`menu`, { params: params })
  },
  menuTree(params) {
    return request2.get(`menu/tree`, { params: params })
  },
  detail(params) {
    return request2.get(`menu/${params}`)
  },
  add(params) {
    return request2.post(`menu`, params)
  },
  edit(params) {
    return request2.put(`menu`, params)
  },
  delete(params) {
    return request2.delete(`menu/${params}`)
  },
  simpleAll(params) {
    return request2.get(`menu/simpleAll`, {params: params})
  }
}
