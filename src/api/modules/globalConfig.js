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
  },
  getAllEnum(params) { // 获取全部枚举
    return request.get(`globalConfig/getAllEnum`, { params: params })
  },
  getEnumByKey(params) { // 根据key获取枚举值
    return request.get(`globalConfig/getEnumByKey`, { params: params })
  },
  getSysCfg(params) { // 根据key获取枚举值
    return request.get(`globalConfig/getSysCfg`, { params: params })
  }
}
