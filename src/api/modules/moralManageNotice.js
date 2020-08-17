import request from '@/utils/request'

export default {
  page(params) {
    return request.get(`staff`, { params })
  }
};
