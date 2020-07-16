import request from '@/utils/request'
import request2 from '@/utils/request2'

export default {
  upload(params) {
    return request2.post('', params)
  },
  getOrganizationList(params){
    return request.get('organization', {params:params})
  }
}
