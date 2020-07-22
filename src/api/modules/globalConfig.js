import request from '@/utils/request'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`globalConfig`, { params: params })
  },
  detail(params) {
    return request.get(`globalConfig/${params}`)
  },
  add(params) {
    return request.post(`globalConfig`, params)
  },
  edit(params) {
    return request.put(`globalConfig`, params)
  },
  delete(params) {
    return request.delete(`globalConfig/${params}`)
  },
  getValuesByKey(params) { // 根据key获取配置列表
    return request.get(`globalConfig/getValuesByKey`, { params: params })
  }
}
