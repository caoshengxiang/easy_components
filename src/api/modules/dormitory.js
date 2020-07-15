import request from '@/utils/request'

export default {
  /*宿舍相关接口*/
  getPage(params){
    return request.get('dormitory', { params: params })
  },
  editDormitory(params){
    return request.put('dormitory/' +  params.id, params )
  },
  getDetail(params) {
    return request.get('/dormitory/'+ params)
  },
  addDormitory(params){
    return request.post('dormitory' , params )
  },

  /*宿舍床位相关接口*/
  getDormitoryBedPage(params){
    return request.get('dormitoryBed', { params: params })
  },
  editDormitoryBed(params){
    return request.put('dormitoryBed/' +  params.id, params )
  },
  getDormitoryBed(params) {
    return request.get('/dormitoryBed/'+ params)
  },
  addDormitoryBed(params){
    return request.post('dormitoryBed' , params )
  },
  deleteDormitoryBed(params){
    return request.delete('dormitoryBed/'+  params.id , params )
  },
  exchangeDormitoryBed(params){
    return request.put('/dormitoryBed/exchange', params )
  },
  dormitoryBedState(params){
    return request.get('/dormitoryBed/state',{ params: params } )
  },

}
