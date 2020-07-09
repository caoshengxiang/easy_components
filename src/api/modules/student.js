import request from '@/utils/request'

export default {
  getPage(params){
    return request.get('student', { params: params })
  },
  getList(params){
    return request.get('system/user/info/front', { params: params })
  },
  getDetail(params) {
    return request.get('/diagram.bpmn', { params: params })
  },
  saveInfo(params) {
    return request.post('/diagram.bpmn', { params: params })
  },
  deleteInfo(params) {
    return request.post('/diagram.bpmn', { params: params })
  },
  updateInfo(params) {
    return request.post('/diagram.bpmn', { params: params })
  },
}
