/* Layout */
import Layout from '@/layout'

export default {
  path: '/staff',
  component: Layout,
  redirect: '/staff/list',
  children: [
    {
      path: 'list',
      component: () => import('@/views/staff/list'),
      meta: { title: '教职工信息' },
      name: 'staffList'
    },
    {
      path: 'detail',
      component: () => import('@/views/staff/detail'),
      meta: { title: '教职工详情' },
      name: 'staffDetail'
    }
  ]
}
