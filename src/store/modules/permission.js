import { constantRoutes } from '@/router'
import urlMap from '../../router/urlMap'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter){
    return letter.toUpperCase();
  });
}
export function filterAsyncRoutes(menusData) {
  // console.info('原始数据', menusData)
  const res = [{
    path: '/auth',
    component: Layout,
    children: []
  }]

  // 排除不需要默认布局Layout路由菜单编码列表
  const menuCodeList = ['_views_workflow_Design']

  function tree(menusData) {
    menusData.forEach(item => {
      const tmp = { ...item }
      if (tmp.children && tmp.children.length) {
        // console.log('递归')
        tree(tmp.children)
      }
      if (!item.external && item.pcUrl && (item.menuType === '菜单' || (item.menuType === '按钮'))) {
        // console.log('菜单', toHump(tmp.menuNo))
        if (menuCodeList.indexOf(tmp.menuCode) > -1) {
          res.push({
            path: tmp.pcUrl,
            name: toHump(tmp.menuNo),
            component: urlMap[tmp.menuCode],
            meta: {
              title: tmp.name,
              icon: tmp.icon,
              noCache: tmp.cachedViews,
              id: tmp.id
            }
          })
        } else {
          res[0].children.push({
            path: tmp.pcUrl,
            name: toHump(tmp.menuNo),
            component: urlMap[tmp.menuCode],
            meta: {
              title: tmp.name,
              icon: tmp.icon,
              noCache: tmp.cachedViews,
              id: tmp.id
            }
          })
        }
      }
    })
  }

  tree(menusData)
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  menus: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENUS: (state, data) => {
    state.menus = data
  }
}

const actions = {
  generateRoutes({ commit }, menusData) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(menusData)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_MENUS', menusData)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
