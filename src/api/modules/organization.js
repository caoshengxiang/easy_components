import request from '@/utils/request'
import { fileDown } from '../../utils/file'
/*
* 部门
*/
export default {
  list(params) {
    return request.get(`organization`, { params: params })
  },
  tree(params) {
    return request.get(`organization/tree`, { params: params })
  },
  detail(params) {
    return request.get(`organization/${params}`)
  },
  add(params) {
    return request.post(`organization`, params)
  },
  edit(params) {
    return request.put(`organization`, params)
  },
  delete(params) {
    return request.delete(`organization/${params}`)
  },
  simpleAll(params) { // 下拉
    return request.get(`organization/simpleAll`, { params: params })
  },
  download(params) {
    return fileDown('organization/download/exportExcel', params)
  },
  sta(params) { // 统计
    return request.get(`organization/stat`, { params: params })
  },
}
