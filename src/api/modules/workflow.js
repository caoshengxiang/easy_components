import request from '@/utils/request'

export default {
  getList(params){
    return request.get('approvalConfig', { params: params })
  },
  getDetail(params) {
    return request.get('/diagram.bpmn')
  }
}
