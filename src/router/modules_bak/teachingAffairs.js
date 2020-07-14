/* Layout */
import Layout from '@/layout'

export default {
  path: '/teachingAffairs',
  component: Layout,
  // redirect: '/teachingAffairs/semester/list',
  meta: { title: '教务管理' },
  children: [
    {
      path: 'semester/list',
      component: () => import('@/views/teachingAffairs/semester/list'),
      meta: { title: ' 学期管理' }
    },
    {
      path: 'semester/detail',
      component: () => import('@/views/teachingAffairs/semester/detail'),
      meta: { title: ' 学期详情' }
    },
    {
      path: 'semester/edit',
      component: () => import('@/views/teachingAffairs/semester/edit'),
      meta: { title: ' 学期编辑' }
    },
    {
      path: 'semester/classTime',
      component: () => import('@/views/teachingAffairs/semester/classTime'),
      meta: { title: ' 上课时间设置' }
    }
  ]
}
