import request from '@/utils/request'

export default {
  homeSpotList(params) {
    return request.get('', { params: params })
  }
}
