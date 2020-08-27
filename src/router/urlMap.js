/*
url/编码 和 路由文件映射

方便后面维护做一些 约定/说明

url 和 编码, 组件映射 都和组件路径对应
url: 就以/view/ 下的文件路径
编码： 必须唯一，url 下划线连接
组件映射：url 下划线连接

新增编辑同一个页面的情况：
组件映射按上面的规则设置成一样，URL 做区分（新增页面 path 在加一级 /add, 如：新增 /views/baseinfo/assetinfo/detail/add 编辑 /views/baseinfo/assetinfo/detail）
编码还是url下划线连接
注意 URL 在同一个系统下 是不能重复！ URL 为router的path，因此切记不能重复
* */

import _views_home_dataCenter from '@/views/home/dataCenterIndex'
import _views_set_menu from '@/views/set/menu'
import _views_set_post from '@/views/set/post'
import _views_set_post_auth from '@/views/set/post/auth'
import _views_set_organization from '@/views/set/organization'
import _views_set_data from '@/views/set/data'
import _views_set_info from '@/views/set/info'
import _views_set_teaching from '@/views/set/teaching'
import _views_set_cof from '@/views/set/cof'
import _views_set_logs from '@/views/set/logs/list'
import _views_staff_list from '@/views/staff/list'
import _views_staff_detail from '@/views/staff/detail'
import _views_staff_eduDetail from '@/views/staff/eduDetail'
import _views_staff_wageDetail from '@/views/staff/wageDetail'
import _views_teachingAffairs_semester_list from '@/views/teachingAffairs/semester/list'
import _views_teachingAffairs_semester_edit from '@/views/teachingAffairs/semester/edit'
import _views_teachingAffairs_semester_classTime from '@/views/teachingAffairs/semester/classTime'
import _views_dormitory_dormitoryInfo_list from '@/views/dormitory/dormitoryInfo/list'
import _views_dormitory_dormitoryInfo_detail from '@/views/dormitory/dormitoryInfo/detail'
import _views_dormitory_dormitoryInfo_dormitoryStdList from '@/views/dormitory/dormitoryInfo/dormitoryStdList'
import _views_dormitory_dormitoryCheck_list from '@/views/dormitory/dormitoryCheck/list'
import _views_dormitory_dormitoryCheck_dormitoryChecklist from '@/views/dormitory/dormitoryCheck/dormitoryChecklist'
import _views_dormitory_dormitoryCheck_checkRecord from '@/views/dormitory/dormitoryCheck/checkRecord'
import _views_dormitory_classRecord_list from '@/views/dormitory/classRecord/list'
import _views_baseinfo_course_list from '@/views/baseinfo/course/list'
import _views_baseinfo_course_detail from '@/views/baseinfo/course/detail'
import _views_baseinfo_userinfo_list from '@/views/baseinfo/userinfo/list'
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
import _views_baseinfo_department_edit from '@/views/baseinfo/department/edit'
import _views_baseinfo_major_list from '@/views/baseinfo/major/list'
import _views_baseinfo_major_edit from '@/views/baseinfo/major/edit'
import _views_baseinfo_grade_list from '@/views/baseinfo/grade/list'
import _views_baseinfo_grade_edit from '@/views/baseinfo/grade/edit'
import _views_baseinfo_class_list from '@/views/baseinfo/class/list'
import _views_baseinfo_class_edit from '@/views/baseinfo/class/edit'
import _views_workflow_List from '@/views/workflow/List'
import _views_workflow_Design from '@/views/workflow/Design'
import _views_workflow_Detail from '@/views/workflow/Detail'
import _views_workflow_task_list from '@/views/workflow/task/List'
import _views_workflow_task_AttendList from '@/views/workflow/task/AttendList'
import _views_workflow_task_Detail from '@/views/workflow/task/Detail'
import _views_workflow_task_TaskDetail from '@/views/workflow/task/TaskDetail'
import _views_workflow_task_MyTaskList from '@/views/workflow/task/MyTaskList'

/*二期*/
import _views_baseinfo_userinfo6_list from '../views/baseinfo/userinfo6/list'
import _views_baseinfo_userinfo6_detail from '../views/baseinfo/userinfo6/detailInfo'
import _views_student_grant_list from '../views/student/grant/list'
import _views_student_grant_detail from '../views/student/grant/detail'
import _views_student_leave_list from '../views/student/leave/list'
import _views_student_leave_detail from '../views/student/leave/detail'
import _views_student_leave_audit from '../views/student/leave/audit'

import _views_recruit_plan_list from '@/views/recruit/plan/list'
import _views_recruit_plan_detail from '@/views/recruit/plan/detail'
import moralManage from './urlMapModules/moralManage'
import leagueActivities from './urlMapModules/leagueActivities'
import rewardsAndPunishments from "./urlMapModules/rewardsAndPunishments";
import diagnosis from './urlMapModules/diagnosis'

/*
* 字段说明：
* 页面全路径url: 对应的路由组件
* */
export default {
  _views_home_dataCenter, // 数据中心默认页
  _views_workflow_task_list, // 待办列表
  _views_workflow_task_Detail, // 任务详情
  _views_workflow_task_TaskDetail, // 任务详情
  _views_workflow_task_MyTaskList, // 我的申请
  _views_workflow_task_AttendList, // 已办列表
  _views_workflow_List, // 工作流列表
  _views_workflow_Design, // 工作流
  _views_workflow_Detail, // 工作流
  _views_set_menu, // 菜单设置 /views/set/menu
  _views_set_post, // 岗位管理 /views/set/post
  _views_set_post_auth, // 岗位权限
  _views_set_organization, // 机构管理
  _views_set_data, // 数据字典
  _views_set_info, // 基础信息
  _views_set_teaching, // 教学相关
  _views_set_cof, // 系统配置
  _views_set_logs, // 操作日志
  _views_staff_list, // 教职工信息
  _views_staff_detail, // 教职工详情
  _views_staff_eduDetail, // 学历证书
  _views_staff_wageDetail, // 工资情况
  _views_teachingAffairs_semester_list, // 学期管理
  _views_teachingAffairs_semester_edit, // 学期编辑
  _views_teachingAffairs_semester_classTime, // 上课时间设置
  _views_dormitory_dormitoryInfo_list, // 宿舍列表
  _views_dormitory_dormitoryInfo_detail, //宿舍详情
  _views_dormitory_dormitoryInfo_dormitoryStdList, // 宿舍人员
  _views_dormitory_dormitoryCheck_list, // 宿舍考核列表
  _views_baseinfo_course_list, // 课程列表
  _views_baseinfo_course_detail, // 课程详情
  _views_baseinfo_userinfo_list, // 学生列表
  _views_baseinfo_userinfo_detailInfo, // 学生信息采集
  _views_baseinfo_assetinfo_list, // 用地管理
  _views_baseinfo_assetinfo_detail, // 用地登记信息
  _views_baseinfo_assetinfo_roomlist, // 教室管理
  _views_baseinfo_assetinfo_roomdetail, // 教室信息登记
  _views_baseinfo_assetinfo_buildinglist, // 建筑物管理
  _views_baseinfo_assetinfo_buildingdetail, // 建筑物详情
  _views_baseinfo_assetinfo_traininglist, // 实训室管理
  _views_baseinfo_assetinfo_trainingdetail, // 实训室详情
  _views_baseinfo_assetinfo_facilitieslist, // 设施管理
  _views_baseinfo_assetinfo_facilitiesdetail, // 设施详情
  _views_baseinfo_department_list, // 系部信息管理
  _views_baseinfo_department_edit, // 系部信息管理
  _views_baseinfo_major_list, // 专业信息管理
  _views_baseinfo_major_edit, // 专业信息管理
  _views_baseinfo_grade_list, // 年级信息管理
  _views_baseinfo_grade_edit, // 年级信息管理
  _views_baseinfo_class_list, // 班级信息管理
  _views_baseinfo_class_edit, // 班级信息管理
  /* 二期  start */
  _views_dormitory_dormitoryCheck_dormitoryChecklist, // 宿舍考核管理
  _views_dormitory_dormitoryCheck_list_add: () => import('../views/dormitory/dormitoryCheck/add'),
  _views_dormitory_dormitoryCheck_checkRecord, // 扣分记录
  _views_dormitory_classRecord_list, // 班级考核记录
  _views_dormitory_classRecord_list_add: () => import('../views/dormitory/classRecord/add'), // 班级考核记录
  _views_baseinfo_userinfo6_list, // 六类学生
  _views_baseinfo_userinfo6_detail, // 六类学生打印
  _views_student_grant_list, // 助学金
  _views_student_grant_detail, // 助学金详情
  _views_student_leave_list, // 请假
  _views_student_leave_detail, // 请假详情
  _views_student_leave_audit,//请假审核
  _views_recruit_birthplace_list: () => import('../views/recruit/birthplace/list'), // 生源地
  _views_recruit_birthplace_detail: () => import('../views/recruit/birthplace/detail'), // 生源地编辑/详情
  _views_recruit_plan_list: () => import('../views/recruit/plan/list'), // 招生计划
  _views_recruit_plan_detail: () => import('../views/recruit/plan/detail'), // 招生计划编辑/详情
  _views_recruit_task_list: () => import('../views/recruit/task/list'), // 招生任务
  _views_recruit_task_detail: () => import('../views/recruit/task/detail'), // 招生任务编辑/详情
  _views_recruit_preregistration_list: () => import('../views/recruit/preregistration/list'), // 预报名
  _views_recruit_preregistration_detail: () => import('../views/recruit/preregistration/detail'), // 预报名编辑/详情
  _views_recruit_registration_list: () => import('../views/recruit/registration/list'), // 报到注册
  _views_recruit_registration_detail: () => import('../views/recruit/registration/detail'), // 报到注册编辑/详情
  _views_recruit_expiration_list: () => import('../views/recruit/expiration/list'), // 预报名失效
  _views_recruit_expiration_edit: () => import('../views/recruit/expiration/edit'), // 预报名失效编辑/详情
  ...moralManage, // 德育管理界面
  ...leagueActivities, //团学活动管理
  ...rewardsAndPunishments,
  /* 二期  end */
}
