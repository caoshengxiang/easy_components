import request from '@/utils/request'

export default {
  getList(params){
    return request.get('approvalConfig', params)
  },
  getDetail(id) {
    return request.get(`approvalConfig/${id}`)
  },
  save(params){
    return request.put(`approvalConfig/${params.id}`, params)
  },
  add(params){
    return request.post(`approvalConfig`, params)
  },
  deleteInfo(id) {
    return request.delete(`approvalConfig/${id}`)
  }
}
