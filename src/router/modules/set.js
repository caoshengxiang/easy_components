/* Layout */
import Layout from '@/layout'

export default {
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
      path: 'post/auth',
      component: () => import('@/views/set/post/auth'),
      meta: { title: '岗位权限' },
      name: 'postAuth'
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
}
