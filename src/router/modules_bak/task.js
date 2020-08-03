/* Layout */
import Layout from '@/layout'

export default {
  path: '/task',
  component: Layout,
  redirect: '/task/list',
  children: [
    // {
    //   path: 'list',
    //   component: () => import('@/views/workflow/task/List'),
    //   meta: { title: '待办列表' },
    //   name: 'taskList'
    // },
    // {
    //   path: 'attendlist',
    //   component: () => import('@/views/workflow/task/AttendList'),
    //   meta: { title: '已办列表' },
    //   name: 'attendlist'
    // },
    // {
    //   path: 'detail',
    //   component: () => import('@/views/workflow/task/Detail'),
    //   meta: { title: '申请详情' },
    //   name: 'detail'
    // },
    // {
    //   path: 'taskdetail',
    //   component: () => import('@/views/workflow/task/TaskDetail'),
    //   meta: { title: '任务详情' },
    //   name: 'taskdetail'
    // },
    //
    // {
    //   path: 'mytask',
    //   component: () => import('@/views/workflow/task/MyTaskList'),
    //   meta: { title: '我的申请' },
    //   name: 'mytask'
    // },
  ]
}
