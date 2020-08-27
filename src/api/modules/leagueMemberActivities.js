import request from '@/utils/request'

export default {
  /*团员活动相关接口*/
  getPage(params){
    return request.get('leagueActivity', { params: params })
  },
  edit(params){
    return request.put('leagueActivity', params )
  },
  getDetail(params) {
    return request.get('/leagueActivity/'+ params)
  },
  add(params){
    return request.post('leagueActivity' , params )
  },
  remove(params){
    return request.delete('leagueActivity/' + params )
  },
  stat(params){
    return request.get('leagueActivity/stat/', { params })
  },
}
