/**
 * 团学活动-团员管理
 */
import request from '@/utils/request';

export default {
  page(params) { // 分页
    return request.get(`leagueCost`, { params })
  },
  add(data) { // 新增
    return request.post(`leagueCost`, data)
  },
  remove(id) { // 删除
    return request.delete(`leagueCost/${id}`)
  },
  detail(id) { // 详情
    return request.get(`leagueCost/${id}`)
  },
  update(data) { // 更新
    return request.put(`leagueCost`, data)
  },
};
