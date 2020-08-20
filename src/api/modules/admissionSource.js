import request from '@/utils/request'
/*
* 生源地
*/
export default {
  list(params) {
    return request.get(`admissionSource`, { params: params })
  },
  detail(params) {
    return request.get(`admissionSource/${params}`)
  },
  add(params) {
    return request.post(`admissionSource`, params)
  },
  edit(params) {
    return request.put(`admissionSource`, params)
  },
  delete(params) {
    return request.delete(`admissionSource/${params}`)
  },
  listAll(params) {
    return request.get(`admissionSource/simpleAll`, { params: params })
  },
}
