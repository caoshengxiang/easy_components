import request2 from '@/utils/request2'
/*
* 岗位
*/
export default {
  list(params) {
    return request2.get(`globalConfig`, { params: params })
  },
  detail(params) {
    return request2.get(`globalConfig/${params}`)
  },
  add(params) {
    return request2.post(`globalConfig`, params)
  },
  edit(params) {
    return request2.put(`globalConfig`, params)
  },
  delete(params) {
    return request2.delete(`globalConfig/${params}`)
  },
  getValuesByKey(params) { // 根据key获取配置列表
    return request2.get(`globalConfig/getValuesByKey`, { params: params })
  }
}
