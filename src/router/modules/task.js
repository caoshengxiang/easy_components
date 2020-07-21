/* Layout */
import Layout from '@/layout'

export default {
  path: '/task',
  component: Layout,
  redirect: '/task/list',
  children: [
    {
      path: 'list',
      component: () => import('@/views/workflow/task/List'),
      meta: { title: '待办列表' },
      name: 'taskList'
    },
  ]
}
