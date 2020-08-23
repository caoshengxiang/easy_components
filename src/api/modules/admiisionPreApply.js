import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  applyvalidPage(params) {
    return request.get(`admiisionPreApply/applyvalidPage`, { params: params })
  },
  applyvalidDelete(params) {
    return request.delete(`admiisionPreApply/deletewf/${params}`)
  },
  applyvalidRecover(params) {
    return request.get(`admiisionPreApply/recover/${params}`)
  },
  list(params) {
    return request.get(`admiisionPreApply`, { params: params })
  },
  detail(params) {
    return request.get(`admiisionPreApply/${params}`)
  },
  add(params) {
    return request.post(`admiisionPreApply`, params)
  },
  edit(params) {
    return request.put(`admiisionPreApply`, params)
  },
  delete(params) {
    return request.delete(`admiisionPreApply/${params}`)
  },
  regPage(params) {
    return request.get(`admiisionPreApply/regPage`, { params: params })
  },
  refund(params) {
    return request.delete(`admiisionPreApply/refund/${params}`)
  },
  changeStudentState(params) {
    return request.get(`admiisionPreApply/changeStudentState/${params}`)
  },
}
