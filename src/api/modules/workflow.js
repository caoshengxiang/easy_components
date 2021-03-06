import request from '@/utils/request'

export default {
  getList(params){
    return request.get('approvalConfig', {params:params})
  },
  getDetail(id) {
    return request.get(`approvalConfig/${id}`)
  },
  save(params){
    return request.put(`approvalConfig/definition/${params.id}`, params)
  },
  add(params){
    return request.post(`approvalConfig`, params)
  },
  deleteInfo(id) {
    return request.delete(`approvalConfig/${id}`)
  },
  saveInfo(params){
    return request.put(`approvalConfig/${params.id}`, params)
  }
}
