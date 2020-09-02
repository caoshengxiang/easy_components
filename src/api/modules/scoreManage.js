import request from '@/utils/request'

export default {
  /*操行评定相关接口*/
  getPage(params){
    return request.get('conductAssessment', { params: params })
  },
  edit(params){
    return request.put('conductAssessment', params )
  },
  getDetail(params) {
    return request.get('/conductAssessment/'+ params)
  },
  add(params){
    return request.post('conductAssessment' , params )
  },
  remove(params){
    return request.delete('conductAssessment/' + params )
  },
  stat(params){
    return request.get('conductAssessment/stat/', { params })
  },
}
