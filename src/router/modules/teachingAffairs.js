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
      meta: { title: ' 学期管理' }
    }
  ]
}
