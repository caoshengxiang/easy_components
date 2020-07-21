import request2 from '@/utils/request2'
/*
* 岗位
*/
export default {
  list(params) {
    return request2.get(`dictType`, { params: params })
  },
  detail(params) {
    return request2.get(`dictType/${params}`)
  },
  add(params) {
    return request2.post(`dictType`, params)
  },
  edit(params) {
    return request2.put(`dictType`, params)
  },
  delete(params) {
    return request2.delete(`dictType/${params}`)
  },
  simpleAll(params) { // 下拉
    return request2.get(`dictType/simpleAll`, { params: params })
  },
  getByTypeId(params) { // 类型列表
    return request2.get(`dictData/getByTypeId`, { params: params })
  },
  saveOrUpdate(params) {
    return request2.post(`dictType/saveOrUpdate`, params)
  },
}
