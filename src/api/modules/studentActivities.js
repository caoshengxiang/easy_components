import request from '@/utils/request'

export default {
  /*学生活动相关接口*/
  getPage(params){
    return request.get('studentActivity', { params: params })
  },
  editStudentActivity(params){
    return request.put('studentActivity' , params )
  },
  getDetail(params) {
    return request.get('/studentActivity/'+ params)
  },
  addStudentActivity(params){
    return request.post('studentActivity' , params )
  },
  remove(params){
    return request.delete('studentActivity/' + params )
  },
  stat(params){
    return request.get('studentActivity/stat/', { params })
  },
}
