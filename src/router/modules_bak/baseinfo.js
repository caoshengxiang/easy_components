/* Layout */
import Layout from '@/layout'

export default {
  path: '/baseinfo',
  component: Layout,
  redirect: '/baseinfo/index',
  meta: { title: '基础信息' },
  children: [
    {
      path: 'courseindex',
      component: () => import('@/views/baseinfo/course/list'),
      meta: { title: ' 课程管理' }
    },
    {
      path: 'coursedetail',
      component: () => import('@/views/baseinfo/course/detail'),
      meta: { title: ' 课程信息录入' }
    },
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
      path: 'detailInfo',
      component: () => import('@/views/baseinfo/userinfo/detailInfo'),
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
      meta: { title: ' 教室信息登记' },
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
    {
      path: 'department/list',
      component: () => import('@/views/baseinfo/department/list'),
      meta: { title: '系部信息管理' },
    },
    {
      path: 'department/detail',
      component: () => import('@/views/baseinfo/department/detail'),
      meta: { title: ' 系部信息管理' },
    },
    {
      path: 'department/edit',
      component: () => import('@/views/baseinfo/department/edit'),
      meta: { title: ' 系部信息管理' },
    },
    {
      path: 'major/list',
      component: () => import('@/views/baseinfo/major/list'),
      meta: { title: '专业信息管理' },
    },
    {
      path: 'major/detail',
      component: () => import('@/views/baseinfo/major/detail'),
      meta: { title: ' 专业信息管理' },
    },
    {
      path: 'major/edit',
      component: () => import('@/views/baseinfo/major/edit'),
      meta: { title: ' 专业信息管理' },
    },
    {
      path: 'grade/list',
      component: () => import('@/views/baseinfo/grade/list'),
      meta: { title: '年级信息管理' },
    },
    {
      path: 'grade/detail',
      component: () => import('@/views/baseinfo/grade/detail'),
      meta: { title: ' 年级信息管理' },
    },
    {
      path: 'grade/edit',
      component: () => import('@/views/baseinfo/grade/edit'),
      meta: { title: ' 年级信息管理' },
    },
    {
      path: 'class/list',
      component: () => import('@/views/baseinfo/class/list'),
      meta: { title: '班级信息管理' },
    },
    {
      path: 'class/detail',
      component: () => import('@/views/baseinfo/class/detail'),
      meta: { title: ' 班级信息管理' },
    },
    {
      path: 'class/edit',
      component: () => import('@/views/baseinfo/class/edit'),
      meta: { title: ' 班级信息管理' },
    },
  ]
}
