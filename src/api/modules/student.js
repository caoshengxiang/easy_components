import request from '@/utils/request'
import file from '@/utils/file'

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
  getStdNoBedList(params){
    return request.get('student/list/noBed', { params: params })
  },
  download(params){
    return file.fileDown('student', params)
  },
  recoverStudentType(params){
    return request.put('student/recoverStudentType/' +  params )
  },
}
