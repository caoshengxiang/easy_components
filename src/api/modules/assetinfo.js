import request from '@/utils/request'

export default {
  /*用地相关接口*/
  getLandPage(params){
    return request.get('land', { params: params })
  },
  editLand(params){
    return request.put('land/' +  params.id, params )
  },
  getLandDetail(params) {
    return request.get('/land/'+ params)
  },
  addLand(params){
    return request.post('land' , params )
  },
  deleteLand(params){
    return request.delete('land/'+  params.id , params )
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
