import request from '@/utils/request'

export default {
  getPage(params){
    return request.get('dormitory', { params: params })
  },
  editDormitory(params){
    return request.put('dormitory/' +  params.id, params )
  },
  getDetail(params) {
    return request.get('/dormitory/'+ params)
  },
  addDormitory(params){
    return request.post('dormitory' , params )
  },
}
