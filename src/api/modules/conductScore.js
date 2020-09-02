import request from '@/utils/request'

export default {
  /*操行分相关接口*/
  /*操行分*/
  getPage(params){
    return request.get('conductPoint', { params: params })
  },
  edit(params){
    return request.put('conductPoint', params )
  },
  getDetail(params) {
    return request.get('/conductPoint/'+ params)
  },
  add(params){
    return request.post('conductPoint' , params )
  },
  remove(params){
    return request.delete('conductPoint/' + params )
  },
  conductScoreDetail(params){
    return request.get('conductDeductRecord/getByStudentId',{ params: params } )
  },

  /*操行分审核*/
  getConductDeductRecord(params) {
    return request.get('conductDeductRecord', { params: params })
  },
  check(params) {
    return request.put('conductDeductRecord/audit', params)
  },

  /*操行分类型*/
  conductType(params) {
    return request.get('conductType', params)
  },
  conductTypeAdd(params) {
    return request.post('conductType' , params )
  },
  conductTypeRemove(params){
    return request.delete('conductPoint/' + params )
  },
}
