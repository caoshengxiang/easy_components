import request from '@/utils/request'
import { fileDown } from '../../utils/file'
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
  indicatorWarn(params) {
    return request.put(`indicator/warn`, params)
  },
  indicatorYearList(params) {
    return request.get(`indicatorYear`, { params: params })
  },
  indicatorYear(params) {
    return request.get(`indicatorYear/year`, { params: params })
  },
  indicatorYearAdd(params) { // 新增
    return request.post(`indicatorYear`, params)
  },
  indicatorExportExcel(params) {
    return fileDown('indicatorYearData/download/exportExcel', params)
  },
  indicatorImportExcel(params) {
    return request.post('indicatorYearData/importExcel', params)
  },
  indicatorTree(params) {
    return request.get(`indicator/tree`)
  },
  indicatorYearData(params) { // 指标年标准列表，数据填写
    return request.get(`indicatorYearData`, { params: params })
  },
  indicatorYearDataModifyNum(params) { // 填写数据保存
    return request.post(`indicatorYearData/batch`, params)
  },
  indicatorYearDataModify(params) { // 填写数据保存
    return request.post(`indicatorYearData`, params)
  },
  indicatorYearDataById(params) { // 指标年标准列表，数据填写
    return request.get(`indicatorYearData/${params.id}`, { params: params })
  },
  // detail(params) {
  //   return request.get(`post/${params}`)
  // },
  // delete(params) {
  //   return request.delete(`post/${params}`)
  // },
}
