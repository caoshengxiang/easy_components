/*
url 和 路由文件映射

方便后面维护做一些 约定/说明

url 和 编码 都和组件路径对应
（配置请咨询管理员,配置前请确认router/urlMap.js文件是否有相应配置）。
菜单和绑定页面的按钮约定为页面url 以下划线连接（url为组件的路径）,
按钮约定为 页面编码_按钮标识（如：岗位列表的新增按钮编码为  _views_set_post_add）
* */

import _views_set_menu from '@/views/set/menu'
import _views_set_post from '@/views/set/post'
import _views_set_post_auth from '@/views/set/post/auth'
import _views_set_data from '@/views/set/data'
import _views_set_info from '@/views/set/info'
import _views_set_teaching from '@/views/set/teaching'
import _views_set_cof from '@/views/set/cof'
import _views_staff_list from '@/views/staff/list'
import _views_staff_detail from '@/views/staff/detail'
import _views_staff_eduDetail from '@/views/staff/eduDetail'
import _views_staff_wageDetail from '@/views/staff/wageDetail'
import _views_teachingAffairs_semester_list from '@/views/teachingAffairs/semester/list'
import _views_teachingAffairs_semester_detail from '@/views/teachingAffairs/semester/detail'
import _views_teachingAffairs_semester_edit from '@/views/teachingAffairs/semester/edit'
import _views_teachingAffairs_semester_classTime from '@/views/teachingAffairs/semester/classTime'
import _views_dormitory_dormitoryInfo_list from '@/views/dormitory/dormitoryInfo/list'
import _views_dormitory_dormitoryInfo_dormitoryStdList from '@/views/dormitory/dormitoryInfo/dormitoryStdList'
import _views_dormitory_dormitoryCheck_list from '@/views/dormitory/dormitoryCheck/list'
import _views_dormitory_dormitoryCheck_dormitoryChecklist from '@/views/dormitory/dormitoryCheck/dormitoryChecklist'
import _views_dormitory_dormitoryCheck_checkRecord from '@/views/dormitory/dormitoryCheck/checkRecord'
import _views_dormitory_classRecord_list from '@/views/dormitory/classRecord/list'
import _views_baseinfo_userinfo_list from '@/views/baseinfo/userinfo/list'
import _views_baseinfo_userinfo_detail from '@/views/baseinfo/userinfo/detail'
import _views_baseinfo_userinfo_detailInfo from '@/views/baseinfo/userinfo/detailInfo'
import _views_baseinfo_assetinfo_list from '@/views/baseinfo/assetinfo/list'
import _views_baseinfo_assetinfo_detail from '@/views/baseinfo/assetinfo/detail'
import _views_baseinfo_assetinfo_roomlist from '@/views/baseinfo/assetinfo/roomlist'
import _views_baseinfo_assetinfo_roomdetail from '@/views/baseinfo/assetinfo/roomdetail'
import _views_baseinfo_assetinfo_buildinglist from '@/views/baseinfo/assetinfo/buildinglist'
import _views_baseinfo_assetinfo_buildingdetail from '@/views/baseinfo/assetinfo/buildingdetail'
import _views_baseinfo_assetinfo_traininglist from '@/views/baseinfo/assetinfo/traininglist'
import _views_baseinfo_assetinfo_trainingdetail from '@/views/baseinfo/assetinfo/trainingdetail'
import _views_baseinfo_assetinfo_facilitieslist from '@/views/baseinfo/assetinfo/facilitieslist'
import _views_baseinfo_assetinfo_facilitiesdetail from '@/views/baseinfo/assetinfo/facilitiesdetail'
import _views_baseinfo_department_list from '@/views/baseinfo/department/list'
import _views_baseinfo_department_detail from '@/views/baseinfo/department/detail'
import _views_baseinfo_department_edit from '@/views/baseinfo/department/edit'
import _views_baseinfo_major_list from '@/views/baseinfo/major/list'
import _views_baseinfo_major_detail from '@/views/baseinfo/major/detail'
import _views_baseinfo_major_edit from '@/views/baseinfo/major/edit'
import _views_baseinfo_grade_list from '@/views/baseinfo/grade/list'
import _views_baseinfo_grade_detail from '@/views/baseinfo/grade/detail'
import _views_baseinfo_grade_edit from '@/views/baseinfo/grade/edit'
import _views_baseinfo_class_list from '@/views/baseinfo/class/list'
import _views_baseinfo_class_detail from '@/views/baseinfo/class/detail'
import _views_baseinfo_class_edit from '@/views/baseinfo/class/edit'

/*
* 字段说明：
* 页面全路径url: 对应的路由组件
* */
export default {
  _views_set_menu, // 菜单设置 /views/set/menu
  _views_set_post, // 岗位管理 /views/set/post
  _views_set_post_auth, // 岗位权限
  _views_set_data, // 数据字典
  _views_set_info, // 基础信息
  _views_set_teaching, // 教学相关
  _views_set_cof, // 系统配置
  _views_staff_list, // 教职工信息
  _views_staff_detail, // 教职工详情
  _views_staff_eduDetail, // 学历证书
  _views_staff_wageDetail, // 工资情况
  _views_teachingAffairs_semester_list, // 学期管理
  _views_teachingAffairs_semester_edit, // 学期编辑
  _views_teachingAffairs_semester_detail, // 学期详情
  _views_teachingAffairs_semester_classTime, // 上课时间设置
  _views_dormitory_dormitoryInfo_list, // 宿舍列表
  _views_dormitory_dormitoryInfo_dormitoryStdList, // 宿舍人员
  _views_dormitory_dormitoryCheck_list, // 宿舍考核列表
  _views_dormitory_dormitoryCheck_dormitoryChecklist, // 宿舍人员考核管理
  _views_dormitory_dormitoryCheck_checkRecord, // 扣分记录
  _views_dormitory_classRecord_list, // 班级考核记录
  _views_baseinfo_userinfo_list, // 学生列表
  _views_baseinfo_userinfo_detail, // 学生信息采集
  _views_baseinfo_userinfo_detailInfo, // 学生信息采集
  _views_baseinfo_assetinfo_list, // 用地管理
  _views_baseinfo_assetinfo_detail, // 用地登记信息
  _views_baseinfo_assetinfo_roomlist, // 教室管理
  _views_baseinfo_assetinfo_roomdetail, // 建筑物信息登记
  _views_baseinfo_assetinfo_buildinglist, // 建筑物管理
  _views_baseinfo_assetinfo_buildingdetail, // 建筑物详情
  _views_baseinfo_assetinfo_traininglist, // 实训室管理
  _views_baseinfo_assetinfo_trainingdetail, // 实训室详情
  _views_baseinfo_assetinfo_facilitieslist, // 设施管理
  _views_baseinfo_assetinfo_facilitiesdetail, // 设施详情
  _views_baseinfo_department_list, // 系部信息管理
  _views_baseinfo_department_detail, // 系部信息管理
  _views_baseinfo_department_edit, // 系部信息管理
  _views_baseinfo_major_list, // 专业信息管理
  _views_baseinfo_major_detail, // 专业信息管理
  _views_baseinfo_major_edit, // 专业信息管理
  _views_baseinfo_grade_list, // 年级信息管理
  _views_baseinfo_grade_detail, // 年级信息管理
  _views_baseinfo_grade_edit, // 年级信息管理
  _views_baseinfo_class_list, // 班级信息管理
  _views_baseinfo_class_detail, // 班级信息管理
  _views_baseinfo_class_edit, // 班级信息管理
}
