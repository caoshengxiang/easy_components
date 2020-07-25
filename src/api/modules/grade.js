import request from '@/utils/request'

export default {
  /*系部相关接口*/
  list(params){
    return request.get('grade', { params: params })
  },
  edit(params){
    return request.put('grade/' +  params.id, params )
  },
  detail(params) {
    return request.get('/grade/'+ params)
  },
  add(params){
    return request.post('grade' , params )
  },
  delete(params){
    return request.delete('grade/'+  params.id , params )
  },

}
