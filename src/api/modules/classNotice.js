import request from '@/utils/request'
import {fileDown} from '../../utils/file';

export default {
  /*通知单相关接口*/
  getPage(params){
    return request.get('adviceNote', { params: params })
  },
  edit(params){
    return request.put('adviceNote', params)
  },
  getDetail(params) {
    return request.get('/adviceNote/'+ params)
  },
  add(params){
    return request.post('adviceNote', params)
  },
  remove(params){
    return request.delete('adviceNote/' + params)
  },
  /*打包下载*/
  downloadPkg(params){
    return fileDown('adviceNote/downloadPkg', params)
  },
  /*设置通知书时间*/
  timeSet(params) {
    return request.post('adviceNote/timeSet', params)
  },
  /*设置评语*/
  setComment(data) {
    return request.put('adviceNote/evaluate', data)
  },
  /*批量设置评语*/
  batchSetComment(data) {
    return request.put('adviceNote/batchEvaluate', data)
  },
  /*生成通知书*/
  generateNote(params) {
    return request.post('adviceNote/generateNote', params)
  },
  /*通知书预览*/
  preview(params) {
    return request.get('adviceNote/preview/' + params)
  },
}
