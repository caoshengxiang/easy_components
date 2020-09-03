import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`positionCard`, { params: params })
  },
}
