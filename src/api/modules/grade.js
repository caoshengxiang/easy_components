import request from '@/utils/request'

export default {
  /*班级*/
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
  simpleAll(params) { // 下拉
    return request.get(`grade/list`, { params: params })
  },
  /*班级*/
  listbase(params){
    return request.get('/grade/list/base')
  },

}
