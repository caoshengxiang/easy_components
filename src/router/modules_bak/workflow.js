/* Layout */
import Layout from '@/layout'

export default {
  path: '/workflow',
  component: Layout,
  redirect: '/workflow/index',
  meta: { title: '基础信息' },
  children: [
    // {
    //   path: 'index',
    //   component: () => import('@/views/workflow/List'),
    //   meta: { title: '流程管理' }
    // },
    // {
    //   path: 'detail',
    //   component: () => import('@/views/workflow/Detail'),
    //   meta: { title: '流程详情' }
    // }
  ]
}
