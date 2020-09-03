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

  /*获取学生操行分月统计历史曲线*/
  conductPointMonthly(params){
    return request.get('conductPointMonthly/getStatHistory',{ params: params } )
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
    return request.get('conductType', {params})
  },
  conductTypeAdd(params) {
    return request.post('conductType' , params )
  },
  conductTypeRemove(params){
    return request.delete('conductType/' + params )
  },
  conductTypeSimpleAll(params){
    return request.get('conductType/simpleAll')
  },
  /*根据类型id获取项目列表*/
  getConductTypeItem(params) {
    return request.get('conductTypeItem/getByTypeId', {params:params})
  },
  /*更新操行分类型项目*/
  conductTypeItemAdd(params) {
    return request.put('conductType', params)
  },

  /*生成学生操行分*/
  conductPointGenerate() {
    return request.put('conductPoint/generate')
  },

  /*重置学生操行分*/
  conductPointReset() {
    return request.put('conductPoint/reset')
  },
  /*操行分扣分记录新增*/
  conductDeductRecordAdd(params) {
    return request.post('conductDeductRecord',params)
  },
}
