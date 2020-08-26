/**
 * 团学活动-团支部管理
 */
import request from '@/utils/request';

export default {
  page(params) { // 分页
    return request.get(`youthLeagueBranch`, { params })
  },
  add(data) { // 新增
    return request.post(`youthLeagueBranch`, data)
  },
  remove(id) { // 删除
    return request.delete(`youthLeagueBranch/${id}`)
  },
  detail(id) { // 详情
    return request.get(`youthLeagueBranch/${id}`)
  },
  update(data) { // 更新
    return request.put(`youthLeagueBranch`, data)
  },
  stat(params) { // 统计信息
    return request.get(`youthLeagueBranch/stat`, { params })
  },
  simpleAll(params) { // 统计信息
    return request.get(`youthLeagueBranch/simpleAll`, { params })
  }
};
