import request from '@/utils/request'

export default {
  getGradeList(params){ ////年级列表
    return request.get('grade/list/base', { params: params })
  },
  getSpecialtyList(params){ ////专业列表
    return request.get('specialty/list/base', { params: params })
  },
  getClbumList(params){ ////班级列表
    return request.get('clbum/list/base', { params: params })
  },
  getStaffList(params){ ////教职工列表
    return request.get('staff', { params: params })
  },
  getDepartmentList(params){ ////获取系部
    return request.get('department', { params: params })
  },
  organizationSimpleAll(params){ ////获取系部
    return request.get('organization/simpleAll', { params: params })
  },
  areaList(){
    return request.get('districts/list')
  }
}
