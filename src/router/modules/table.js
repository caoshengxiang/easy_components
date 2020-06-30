/* Layout */
import Layout from '@/layout'

export default {
  path: '/table',
  component: Layout,
  meta: { title: '表单' },
  redirect: '/table/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/complex-table'),
      meta: { title: '基础表单' },
      name: '表单'
    },
    {
      path: 'detail',
      component: () => import('@/views/table/detail'),
      meta: { title: ' 表单详情' }

    },
    {
      path: 'detailNew',
      component: () => import('@/views/table/detail1'),
      meta: { title: ' 表单详情' }

    }]
}
