/* Layout */
import Layout from '@/layout'

export default {
  path: '/baseinfo',
  component: Layout,
  redirect: '/baseinfo/index',
  meta: { title: '基础信息' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/baseinfo/userinfo/list'),
      meta: { title: ' 学生列表' }
    },
    {
      path: 'detail',
      component: () => import('@/views/baseinfo/userinfo/detail'),
      meta: { title: ' 学生信息采集' }
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
}
