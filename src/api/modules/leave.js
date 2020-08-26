import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`leave`, { params: params })
  },
  detail(params) {
    return request.get(`leave/${params}`)
  },
  add(params) {
    return request.post(`leave`, params)
  },
  edit(params) {
    return request.put(`leave`, params)
  },
  delete(params) {
    return request.delete(`leave/${params}`)
  },
}
