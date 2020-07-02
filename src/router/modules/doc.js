/* Layout */
import Layout from '@/layout'

export default {
  path: '/doc',
  component: Layout,
  meta: { title: '表单' },
  redirect: '/table/base',
  children: [
    {
      path: 'table/base',
      component: () => import('@/views/DOC/table/complex-table'),
      meta: { title: '基础表单表格' },
      name: '表单'
    },
    {
      path: 'table/detail',
      component: () => import('@/views/DOC/table/detail'),
      meta: { title: ' 表单详情' }
    },
    {
      path: 'table/detailNew',
      component: () => import('@/views/DOC/table/detail1'),
      meta: { title: ' 表单详情' }
    },
    {
      path: 'table/list',
      component: () => import('@/views/DOC/table/list'),
      meta: { title: ' 表格 demo' }
    },
    {
      path: 'table/list/detail',
      component: () => import('@/views/DOC/table/list-detail'),
      meta: { title: ' 表格详情 demo' }
    }]
}
