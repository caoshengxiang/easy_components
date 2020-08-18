import request from '@/utils/request'
import { fileDown } from '../../utils/file'

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
  add(params) {
    return request.post(`dormitoryWeeklyAssessment`, params)
  },
  download(params) { // 宿舍周考核导出
    return fileDown('dormitoryWeeklyAssessment/download/exportExcel', params)
  },
  dayDownload(params) { // 宿舍当天得分导出
    return fileDown('dormitoryWeeklyAssessment/day/download/exportExcel', params)
  },
  dormitoryStuRecordDownload(params) { // 扣分记录导出
    return fileDown('dormitoryStuRecord/download/exportExcel', params)
  },
  dormitoryStuWeeklyAssessment(params) {
    return request.get(`dormitoryStuWeeklyAssessment`, {params: params})
  },
  dormitoryStuWeeklyAssessmentAdd(params) {
    return request.post(`dormitoryStuWeeklyAssessment`, params)
  },
  studentRocords(params) {
    return request.get(`dormitoryStuRecord`, {params: params})
  },
  studentRocordsAdd(params) {
    return request.post(`dormitoryStuRecord`, params)
  },
  studentRocordsDel(params) {
    return request.delete(`dormitoryStuRecord/${params}`)
  },
  dormitoryClbumTimeAssessmentList(params) { // 考核统计
    return request.get(`dormitoryClbumTimeAssessment`, { params: params })
  },
  dormitoryClbumTimeAssessmentListAdd(params) { // 考核统计
    return request.post(`dormitoryClbumTimeAssessment`, params)
  },
  dormitoryClbumTimeAssessmentExportExcel(params) { // 扣分记录导出
    return fileDown('dormitoryClbumTimeAssessment/download/exportExcel', params)
  },
  years(params) {
    return request.get(`dormitoryWeeklyAssessment/years`, { params: params })
  },
  terms(params) {
    return request.get(`dormitoryWeeklyAssessment/terms`, { params: params })
  },
  weeks(params) {
    return request.get(`dormitoryWeeklyAssessment/weeks`, { params: params })
  },
}
