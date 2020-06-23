import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/table/index',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
        name:'表单',
      },
      {
        path: 'detail',
        component: () => import('@/views/table/detail'),
        meta: { title: ' 表单详情' },

      },
      {
        path: 'detailNew',
        component: () => import('@/views/table/detail1'),
        meta: { title: ' 表单详情' },

      }]
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
        meta: { title: ' 宿舍列表' },
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
        meta: { title: ' 扣分记录' }
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
        meta: { title: ' 学生列表' },
      },
      {
        path: 'detail',
        component: () => import('@/views/baseinfo/userinfo/detail'),
        meta: { title: ' 学生信息采集' },
      },

      {
        path: 'assetindex',
        component: () => import('@/views/baseinfo/assetinfo/list'),
        meta: { title: ' 用地管理' },
      },
      {
        path: 'assetdetail',
        component: () => import('@/views/baseinfo/assetinfo/detail'),
        meta: { title: ' 用地登记信息' },
      },


      {
        path: 'roomindex',
        component: () => import('@/views/baseinfo/assetinfo/roomlist'),
        meta: { title: ' 教室管理' },
      },
      {
        path: 'roomdetail',
        component: () => import('@/views/baseinfo/assetinfo/roomdetail'),
        meta: { title: ' 建筑物信息登记' },
      },



      {
        path: 'buildingindex',
        component: () => import('@/views/baseinfo/assetinfo/buildinglist'),
        meta: { title: ' 建筑物管理' },
      },
      {
        path: 'buildingdetail',
        component: () => import('@/views/baseinfo/assetinfo/buildingdetail'),
        meta: { title: ' 建筑物详情' },
      },

      {
        path: 'trainingindex',
        component: () => import('@/views/baseinfo/assetinfo/traininglist'),
        meta: { title: ' 实训室管理' },
      },
      {
        path: 'trainingdetail',
        component: () => import('@/views/baseinfo/assetinfo/trainingdetail'),
        meta: { title: ' 实训室详情' },
      },

      {
        path: 'facilitiesindex',
        component: () => import('@/views/baseinfo/assetinfo/facilitieslist'),
        meta: { title: ' 设施管理' },
      },
      {
        path: 'facilitiesdetail',
        component: () => import('@/views/baseinfo/assetinfo/facilitiesdetail'),
        meta: { title: ' 设施详情' },
      },

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
