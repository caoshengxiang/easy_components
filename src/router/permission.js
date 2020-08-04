import router from '../router'
import store from '../store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import menus from '@/router/menus'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/404', '/401'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // alert(1)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/home' }) // 登录页面，有token 直接进入首页
      // next()
      NProgress.done()
    } else { // 判断vuex存储的权限路由是否存在，否则重新获取用户信息，计算路由。（user都存于vuex，刷新自然会重新获取用户信息。页面获取用户信息可通过getter获取）
      /**/
      if (store.getters.userInfo && store.getters.permission_routes && store.getters.permission_routes.length > 0) {
      // if (store.getters.permission_routes && store.getters.permission_routes.length > 0) {
        next()
      } else {
        const { name, postList } = await store.dispatch('user/userInfo')
        console.log('账户/岗位', name, postList)
        const accessedRoutes = await store.dispatch('user/getMenus')
        const accessRoutes = await store.dispatch('permission/generateRoutes', accessedRoutes)
        accessRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
        }) // 不能在自己写的路由里边添加404 要在addRoutes中添加404页面不然就会跳转404

        // console.log('动态菜单', accessRoutes)

        // dynamically add accessible routes
        router.addRoutes(accessRoutes) // 每次刷新添加得动态路由是会丢失
        next({
          ...to,
          replace: true
        }) // hack方法 确保addRoutes已完成
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  setTimeout(() => {
    NProgress.done()
    next()
  }, 200)
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
