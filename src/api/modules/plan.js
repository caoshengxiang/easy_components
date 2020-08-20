import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`admissionPlan`, { params: params })
  },
  detail(params) {
    return request.get(`admissionPlan/${params}`)
  },
  add(params) {
    return request.post(`admissionPlan`, params)
  },
  edit(params) {
    return request.put(`admissionPlan`, params)
  },
  delete(params) {
    return request.delete(`admissionPlan/${params}`)
  },
}
