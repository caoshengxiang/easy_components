/**
 * 团学活动-团员管理
 */
import request from '@/utils/request';

export default {
  page(params) { // 分页
    return request.get(`leagueMember`, { params })
  },
  add(data) { // 新增
    return request.post(`leagueMember`, data)
  },
  remove(id) { // 删除
    return request.delete(`leagueMember/${id}`)
  },
  detail(id) { // 详情
    return request.get(`leagueMember/${id}`)
  },
  update(data) { // 更新
    return request.put(`leagueMember`, data)
  },
};
