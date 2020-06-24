import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

// todo 定义无菜单权限得页面， 角色权限页面只会在菜单配置得列表页面，其他都定义在这里如详情页面
// 目前都定义在这里
const constantRoutes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
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
    redirect: '/set/menu',
    children: [
      {
        path: 'menu',
        component: () => import('@/views/set/menu'),
        meta: { title: '系统设置' },
        name: 'setIndex'
      }, {
        path: 'post',
        component: () => import('@/views/set/post'),
        meta: { title: '岗位管理' },
        name: 'setPost'
      }, {
        path: 'data',
        component: () => import('@/views/set/data'),
        meta: { title: '数据字典' },
        name: 'setData'
      }, {
        path: 'info',
        component: () => import('@/views/set/info'),
        meta: { title: '基础信息' },
        name: 'setInfo'
      }, {
        path: 'teaching',
        component: () => import('@/views/set/teaching'),
        meta: { title: '教学相关' },
        name: 'setTeaching'
      }, {
        path: 'cof',
        component: () => import('@/views/set/cof'),
        meta: { title: '系统配置' },
        name: 'setCof'
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
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
