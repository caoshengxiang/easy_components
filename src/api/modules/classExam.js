import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`classExam`, { params: params })
  },
  listDetail(params) {
    return request.get(`classExam/detailPage`, { params: params })
  },
  detail(params) {
    return request.get(`classExam/${params}`)
  },
  add(params) {
    return request.post(`classExam`, params)
  },
  edit(params) {
    return request.put(`classExam`, params)
  },
  delete(params) {
    return request.delete(`classExam/${params}`)
  },
  editScore(params) {
    return request.put(`/classExam/editDetail`, params)
  },
}
