import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`termCourseSchedule`, { params: params })
  },
  detail(params) {
    return request.get(`termCourseSchedule/${params}`)
  },
  add(params) {
    return request.post(`termCourseSchedule`, params)
  },
  edit(params) {
    return request.put(`termCourseSchedule/${params.id}`, params)
  },
  delete(params) {
    return request.delete(`termCourseSchedule/${params}`)
  },
  // simpleAll(params) { // 下拉
  //   return request.get(`termCourseSchedule/list`, { params: params })
  // }
}
