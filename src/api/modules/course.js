import request from '@/utils/request'

/*
* 课程相关接口
*/
export default {
  list(params) {
    return request.get(`course`, { params: params })
  },
  detail(params) {
    return request.get(`course/${params}`)
  },
  add(params) {
    return request.post(`course`, params)
  },
  edit(params) {
    return request.put(`course/`+ +  params.id, params)
  },
  delete(params) {
    return request.delete(`course/${params}`)
  },
}
