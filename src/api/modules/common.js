import request2 from '@/utils/request2'

export default {
  upload(params) {
    return request2.post('', params)
  },
}
