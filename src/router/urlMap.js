/*
url 和 路由文件映射
* */

import views_set_menu from '@/views/set/menu'
import views_set_post from '@/views/set/post'
import views_set_post_auth from '@/views/set/post/auth'
import views_set_data from '@/views/set/data'
import views_set_info from '@/views/set/info'
import views_set_teaching from '@/views/set/teaching'
import views_set_cof from '@/views/set/cof'
import views_staff_list from '@/views/staff/list'
import views_staff_detail from '@/views/staff/detail'
import views_staff_eduDetail from '@/views/staff/eduDetail'
import views_staff_wageDetail from '@/views/staff/wageDetail'
import views_teachingAffairs_semester_list from '@/views/teachingAffairs/semester/list'
import views_teachingAffairs_semester_detail from '@/views/teachingAffairs/semester/detail'
import views_teachingAffairs_semester_edit from '@/views/teachingAffairs/semester/edit'
import views_teachingAffairs_semester_classTime from '@/views/teachingAffairs/semester/classTime'

/*
* 字段说明：
* 页面全路径url: 对应的路由组件，// 菜单名称 菜单唯一编号(对象属性名 如：/views/set/menu)
* */
export default {
  '/views/set/menu': views_set_menu, // 菜单设置 /views/set/menu
  '/views/set/post': views_set_post, // 岗位管理 /views/set/post
}
