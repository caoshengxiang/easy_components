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
}
