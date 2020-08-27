import request from '@/utils/request'

export default {
  /*学生干部相关接口*/
  getPage(params){
    return request.get('studentLeader', { params: params })
  },
  edit(params){
    return request.put('studentLeader', params )
  },
  getDetail(params) {
    return request.get('/studentLeader/'+ params)
  },
  add(params){
    return request.post('studentLeader' , params )
  },
  remove(params){
    return request.delete('studentLeader/' + params )
  },
  stat(params){
    return request.get('studentLeader/stat/', { params })
  },
  term(params){
    return request.get('term/list', { params })
  },
}
