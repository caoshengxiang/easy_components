import request from '@/utils/request'

export default {
  getDetail(params) {
    return request.get('/diagram.bpmn')
  }
}
