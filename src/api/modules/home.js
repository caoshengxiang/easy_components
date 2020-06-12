import request2 from '@/utils/request2'

export default {
  homeSpotList(params) {
    return request2.get('supervisor/statistic/homeSpotList', { params: params })
  }
}
