import request from '@/utils/request'

export default {
  /*系部相关接口*/
  list(params){
    return request.get('department', { params: params })
  },
  edit(params){
    return request.put('department/' +  params.id, params )
  },
  detail(params) {
    return request.get('/department/'+ params)
  },
  add(params){
    return request.post('department' , params )
  },
  delete(params){
    return request.delete('department/'+  params.id , params )
  },

}
