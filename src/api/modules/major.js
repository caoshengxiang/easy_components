import request from '@/utils/request'

export default {
  /*系部相关接口*/
  list(params){
    return request.get('specialty', { params: params })
  },
  edit(params){
    return request.put('specialty/' +  params.id, params )
  },
  detail(params) {
    return request.get('/specialty/'+ params)
  },
  add(params){
    return request.post('specialty' , params )
  },
  delete(params){
    return request.delete('specialty/'+  params.id , params )
  },
  /*系部相关接口*/
  listbase(params){
    return request.get('/specialty/list/base')
  },

}
