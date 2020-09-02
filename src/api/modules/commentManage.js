import request from '@/utils/request'

export default {
  /*通用评语相关接口*/
  getPage(params){
    return request.get('reviews', { params: params })
  },
  edit(params){
    return request.put('reviews', params )
  },
  getDetail(params) {
    return request.get('/reviews/'+ params)
  },
  add(params){
    return request.post('reviews' , params )
  },
  remove(params){
    return request.delete('reviews/' + params )
  },
}
