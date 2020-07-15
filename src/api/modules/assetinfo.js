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

  /*教室相关接口*/
  getTeachingRoomPage(params){
    return request.get('teachingRoom', { params: params })
  },
  editTeachingRoom(params){
    return request.put('teachingRoom/' +  params.id, params )
  },
  getTeachingRoomDetail(params) {
    return request.get('/teachingRoom/'+ params)
  },
  addTeachingRoom(params){
    return request.post('teachingRoom' , params )
  },
  deleteTeachingRoom(params){
    return request.delete('teachingRoom/'+  params.id , params )
  },


  /*设施相关接口*/
  getFacilityPage(params){
    return request.get('facility', { params: params })
  },
  editFacility(params){
    return request.put('facility/' +  params.id, params )
  },
  getFacilityDetail(params) {
    return request.get('/facility/'+ params)
  },
  addFacility(params){
    return request.post('facility' , params )
  },
  deleteFacility(params){
    return request.delete('facility/'+  params.id , params )
  },

  /*建筑物相关接口*/
  getConstructionPage(params){
    return request.get('construction', { params: params })
  },
  editConstruction(params){
    return request.put('construction/' +  params.id, params )
  },
  getConstructionDetail(params) {
    return request.get('/construction/'+ params)
  },
  addConstruction(params){
    return request.post('construction' , params )
  },
  deleteConstruction(params){
    return request.delete('construction/'+  params.id , params )
  },

  /*实训室相关接口*/
  getTrainingRoomPage(params){
    return request.get('trainingRoom', { params: params })
  },
  editTrainingRoom(params){
    return request.put('trainingRoom/' +  params.id, params )
  },
  getTrainingRoomDetail(params) {
    return request.get('/trainingRoom/'+ params)
  },
  addTrainingRoom(params){
    return request.post('trainingRoom' , params )
  },
  deleteTrainingRoom(params){
    return request.delete('trainingRoom/'+  params.id , params )
  },
}
