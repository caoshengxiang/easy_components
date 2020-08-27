import request from '@/utils/request'
/*
* 招生计划
*/
export default {
  list(params) {
    return request.get(`loseStudent`, { params: params })
  },
  detail(params) {
    return request.get(`loseStudent/${params}`)
  },
  add(params) {
    return request.post(`loseStudent`, params)
  },
  edit(params) {
    return request.put(`loseStudent`, params)
  },
  delete(params) {
    return request.delete(`loseStudent/${params}`)
  },
}
