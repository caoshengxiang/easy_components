import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`morningExam`, { params: params })
  },
  detail(params) {
    return request.get(`morningExam/${params}`)
  },
  add(params) {
    return request.post(`morningExam`, params)
  },
  edit(params) {
    return request.put(`morningExam`, params)
  },
  delete(params) {
    return request.delete(`morningExam/${params}`)
  },
}
