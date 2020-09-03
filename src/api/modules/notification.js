import request from '@/utils/request'

export default {
  /*通知书成绩相关接口*/
  getPage(params){
    return request.get('adviceNoteAchievement', { params: params })
  },
  edit(params){
    return request.put('adviceNoteAchievement', params )
  },
  getDetail(params) {
    return request.get('/adviceNoteAchievement/'+ params)
  },
  add(params){
    return request.post('adviceNoteAchievement' , params )
  },
  remove(params){
    return request.delete('adviceNoteAchievement/' + params )
  },
  setRule(params) {
    return request.put('adviceNoteAchievement/setRule', params)
  }
}
