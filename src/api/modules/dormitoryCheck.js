import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) { // 宿舍考核列表
    return request.get(`dormitoryWeeklyAssessment`, { params: params })
  },
  dormitoryStuRecordDormitory(params) { // 宿舍考核列表-扣分
    return request.post(`dormitoryStuRecord/dormitory`, params)
  },
  // detail(params) {
  //   return request.get(`post/${params}`)
  // },
  add(params) {
    return request.post(`dormitoryWeeklyAssessment`, params)
  },
  // edit(params) {
  //   return request.put(`post`, params)
  // },
  // delete(params) {
  //   return request.delete(`post/${params}`)
  // },
  // simpleAll(params) { // 下拉
  //   return request.get(`post/simpleAll`, { params: params })
  // },
  // copyPost(params) { // 下拉
  //   return request.put(`post/copy/${params}`)
  // },
}
