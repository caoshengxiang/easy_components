import request from '@/utils/request'

export default {
  getPage(params){
    return request.get('student', { params: params })
  },
  getList(params){
    return request.get('system/user/info/front', { params: params })
  },
  getDetail(params) {
    return request.get('/student/'+ params)
  },
  editStudent(params){
    return request.put('student/' +  params.id, params )
  },
}
