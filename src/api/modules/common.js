import request from '@/utils/request'

export default {
  upload(params) {
    return request.post('upload', params)
  },
  getOrganizationAllList(params) {
    return request.get('organization/simpleAll', { params: params })
  }
}
