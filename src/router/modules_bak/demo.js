/* Layout */
import Layout from '@/layout'

export default {
  path: '/demo',
  component: Layout,
  meta: { title: '表格' },
  redirect: '/table/base',
  children: [
    {
      path: 'icons',
      component: () => import('@/views/DEMO/icons/index'),
      meta: { title: '项目图标' }
    },
    {
      path: 'table/base',
      component: () => import('@/views/DEMO/table/complex-table'),
      meta: { title: '基础表单表格' },
      name: '表格'
    },
    {
      path: 'table/detail',
      component: () => import('@/views/DEMO/table/detail'),
      meta: { title: ' 表单详情' }
    },
    {
      path: 'table/detailNew',
      component: () => import('@/views/DEMO/table/detail1'),
      meta: { title: ' 表单详情' }
    },
    {
      path: 'table/list',
      component: () => import('@/views/DEMO/table/list'),
      meta: { title: ' 表格 demo' }
    },
    {
      path: 'table/list/detail',
      component: () => import('@/views/DEMO/table/list-detail'),
      meta: { title: ' 表格详情 demo' }
    },
    {
      path: 'table/list/form',
      component: () => import('@/views/DEMO/table/list-form'),
      meta: { title: ' 表单详情 demo' }
    },
    {
      path: 'table/list/edit',
      component: () => import('@/views/DEMO/table/table-row-edit'),
      meta: { title: ' 可编辑表格' }
    },
  ]
}
