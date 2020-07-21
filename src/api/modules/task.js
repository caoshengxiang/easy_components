import request from '@/utils/request'

/*工作流审批相关接口*/
export default {
  getList(params){
    return request.get('approval/task/pending', {params:params})
  },
  getAttendList(params){
    return request.get('approval/task/attend', {params:params})
  },
  getDetail(id) {
    return request.get(`/approval/task/history/${id}`)
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
