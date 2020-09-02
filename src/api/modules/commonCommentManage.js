import request from '@/utils/request'

export default {
  /*通用评语相关接口*/
  getPage(params){
    return request.get('reviewsCommon', { params: params })
  },
  edit(params){
    return request.put('reviewsCommon', params)
  },
  getDetail(params) {
    return request.get('/reviewsCommon/'+ params)
  },
  add(params){
    return request.post('reviewsCommon' , params)
  },
  remove(params){
    return request.delete('reviewsCommon/' + params)
  },
  list(params){
    return request.get('reviewsCommon/list', { params: params })
  },
}
