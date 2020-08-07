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
    return request.get(`/approval/task/${id}`)
  },
  getAttendDetail(id) {
    return request.get(`/approval/task/history/${id}`)
  },
  agree(params) {
    return request.post(`approval/task/agree/${params.id}`, params)
  },
  refuse(params) {
    return request.post(`/approval/task/refuse/${params.id}`, params)
  },
  myTask(params){
    return request.get('approval/process/apply', {params:params})
  },
  cancle(params) {
    return request.put('approval/process/cancel/' +  params.id, {params:params} )
  },
  getProcess(params) {
    return request.get('approval/task/' +  params)
  },
  getProcessNew(params) {
    return request.get('approval/task/process/' +  params)
  },

  batchAgree(params) {
    return request.post(`approval/task/batch/agree`, params)
  },
  batchRefuse(params) {
    return request.post(`/approval/task/batch/refuse`, params)
  },
}
