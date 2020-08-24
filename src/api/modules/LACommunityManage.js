/**
 * 团学活动-社团管理
 */
import { fileDown } from '@/utils/file';
import request from '@/utils/request';

export default {
  page(params) { // 分页
    return request.get(`club`, { params })
  },
  add(data) { // 新增
    return request.post(`club`, data)
  },
  remove(id) { // 删除
    return request.delete(`club/${id}`)
  },
  detail(id) { // 详情
    return request.get(`club/${id}`)
  },
  update(id) { // 更新
    return request.put(`club/${id}`)
  },
  stat(params) { // 统计信息
    return request.get(`club/stat`, { params })
  },
  characterList(params) { // 性质下拉
    return request.get(`globalConfig/getEnumByKey`, { params })
  }
};
