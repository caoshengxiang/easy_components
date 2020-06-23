import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index'),
        meta: { title: '首页' },
        name: 'setIndex'
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
  {
    path: '/icons',
    component: () => import('@/views/icons/index'),
    meta: { title: '项目图标' }
  },
  {
    path: '/workflow/design',
    component: () => import('@/views/workflow/Design'),
    meta: { title: '流程设计' }
  },
  {
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
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/set/menu'),
        meta: { title: '系统设置' },
        name: 'setIndex'
      }
    ]
  },
  {
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
  },

  {
    path: '/baseinfo',
    component: Layout,
    redirect: '/baseinfo/index',
    meta: { title: '基础信息' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/baseinfo/userinfo/list'),
        meta: { title: ' 学生列表' }
      }
    ]
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
