import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`dictType`, { params: params })
  },
  detail(params) {
    return request.get(`dictType/${params}`)
  },
  add(params) {
    return request.post(`dictType`, params)
  },
  edit(params) {
    return request.put(`dictType`, params)
  },
  delete(params) {
    return request.delete(`dictType/${params}`)
  },
  simpleAll(params) { // 下拉
    return request.get(`dictType/simpleAll`, { params: params })
  },
  getByTypeId(params) { // 类型列表
    return request.get(`dictData/getByTypeId`, { params: params })
  },
  saveOrUpdate(params) {
    return request.post(`dictType/saveOrUpdate`, params)
  },
  getByCode(params) { // 类型列表
    return request.get(`dictData/getByCode`, { params: params })
  },
}
