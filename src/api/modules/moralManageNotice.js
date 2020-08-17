import request from '@/utils/request'

export default {
  page(params) {
    // todo 对接口
    return request.get(`staff`, { params })
  }
};
