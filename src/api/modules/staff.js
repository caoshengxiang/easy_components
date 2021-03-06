import request from '@/utils/request'
import { fileDown } from '../../utils/file'
/*
* 岗位
*/
export default {
  list(params) {
    return request.get(`staff`, { params: params })
  },
  detail(params) {
    return request.get(`staff/${params}`)
  },
  detailBase(params) {
    return request.get(`staff/base/${params}`)
  },
  add(params) {
    return request.post(`staff`, params)
  },
  edit(params) {
    return request.put(`staff/${params.staff.id}`, params)
  },
  editEduBase(params) {
    return request.put(`staff/base/education/${params.staff.id}`, params)
  },
  editsalaryBase(params) {
    return request.put(`staff/base/salary/${params.staff.id}`, params)
  },
  // delete(params) {
  //   return request.delete(`staff/${params}`)
  // },
  // simpleAll(params) { // 下拉
  //   return request.get(`post/simpleAll`, { params: params })
  // }
  download(params) {
    return fileDown('staff/download', params)
  },
  importExcel(params) {
    return request.post('staff/importExcel', params)
  },
  staffpost(params) {
    return request.get('staff/post', { params: params }) // 根据岗位查询人员
  },
  staffUser(params) {
    return request.get('staff/user', { params: params })
  },
  stafflist(params) {
    return request.get('staff/list', { params: params }) // 根据岗位查询人员
  },
  resetPwd(params) {
    return request.put(`staff/${params}/reset`)
  },
}
