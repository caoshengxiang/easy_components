/**
 * 团学活动-社员管理
 */
import request from '@/utils/request';

export default {
  page(params) { // 分页
    return request.get(`clubMember`, { params })
  },
  add(data) { // 新增
    return request.post(`clubMember`, data)
  },
  remove(id) { // 删除
    return request.delete(`clubMember/${id}`)
  },
  detail(id) { // 详情
    return request.get(`clubMember/${id}`)
  },
  update(data) { // 更新
    return request.put(`clubMember`, data)
  },
  dutySimpleAll(id) { // 根据社团获取职位列表
    return request.get('clubDuty/getListByClubId', { params: { id } })
  },
  filterStudent(name) { // 模糊查询学生（简单信息）
    return request.get('student/searchByName', { params: { name } })
  }
};
