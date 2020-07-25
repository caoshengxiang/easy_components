import request from '@/utils/request'

export default {
  /*系部相关接口*/
  list(params){
    return request.get('clbum', { params: params })
  },
  edit(params){
    return request.put('clbum/' +  params.id, params )
  },
  detail(params) {
    return request.get('/clbum/'+ params)
  },
  add(params){
    return request.post('clbum' , params )
  },
  delete(params){
    return request.delete('clbum/'+  params.id , params )
  },
  /*系部相关接口*/
  listbase(params){
    return request.get('/clbum/list/base')
  },

}
