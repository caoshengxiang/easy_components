import request from '@/utils/request'
import request2 from '@/utils/request2'

export default {
  upload(params) {
    return request2.post('upload', params)
  },
  getOrganizationAllList(params) {
    return request.get('organization/simpleAll', { params: params })
  }
}
