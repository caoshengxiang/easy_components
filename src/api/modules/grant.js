import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`grant`, { params: params })
  },
  detail(params) {
    return request.get(`grant/${params}`)
  },
  add(params) {
    return request.post(`grant`, params)
  },
  edit(params) {
    return request.put(`grant`, params)
  },
  delete(params) {
    return request.delete(`grant/${params}`)
  },
}
