import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

// todo 定义无菜单权限得页面， 角色权限页面只会在菜单配置得列表页面，其他都定义在这里如详情页面
// 目前都定义在这里
const routes = [
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
        name: 'homeIndex'
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/profile'),
        meta: { title: '个人信息' },
        name: 'profile'
      }
    ]
  },
  {
    path: '/registration',
    component: () => import('@/views/recruit/preregistration/detail'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
  // {
  //   path: '/workflow/design',
  //   component: () => import('@/views/workflow/Design'),
  //   meta: { title: '流程设计' }
  // },
]

const files = require.context('./modules', false, /\.js$/)
const requireAll = requireContext => requireContext.keys().forEach(key => {
  routes.push(files(key).default) // 读取文件中的default 模块
})
requireAll(files)

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const constantRoutes = routes
export default router
