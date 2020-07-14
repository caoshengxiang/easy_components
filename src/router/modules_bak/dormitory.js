/* Layout */
import Layout from '@/layout'

export default {
  path: '/dormitory',
  component: Layout,
  redirect: '/dormitory/index',
  meta: { title: '宿舍管理' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/dormitory/dormitoryInfo/list'),
      meta: { title: ' 宿舍列表' }
    },
    {
      path: 'userIndex',
      component: () => import('@/views/dormitory/dormitoryInfo/dormitoryStdList'),
      meta: { title: ' 宿舍人员' }
    },
    {
      path: 'checkIndex',
      component: () => import('@/views/dormitory/dormitoryCheck/list'),
      meta: { title: ' 宿舍考核列表' }
    },
    {
      path: 'userManage',
      component: () => import('@/views/dormitory/dormitoryCheck/dormitoryChecklist'),
      meta: { title: ' 宿舍人员考核管理' }
    },
    {
      path: 'checkRecord',
      component: () => import('@/views/dormitory/dormitoryCheck/checkRecord'),
      meta: { title: ' 扣分记录' },
      name: '宿舍管理'
    },
    {
      path: 'classRecord',
      component: () => import('@/views/dormitory/classRecord/list'),
      meta: { title: ' 班级考核记录' }
    }
  ]
}
