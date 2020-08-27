import request from '@/utils/request'
/*
* 诊改
*/
export default {
  indicatorListPage(params) {
    return request.get(`indicator`, { params: params })
  },
  indicatorList(params) {
    return request.get(`indicator/list`, { params: params })
  },
  indicatorAdd(params) { // 指标新增
    return request.post(`indicator`, params)
  },
  indicatorEdit(params) {
    return request.put(`indicator/${params.id}`, params)
  },
  // list(params) {
  //   return request.get(`post`, { params: params })
  // },
  // detail(params) {
  //   return request.get(`post/${params}`)
  // },
  // add(params) {
  //   return request.post(`post`, params)
  // },
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
