import { constantRoutes } from '@/router'
import urlMap from '../../router/urlMap'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(menusData) {
  const res = [{
    path: '/auth',
    component: Layout,
    children: []
  }]
  menusData.forEach(item => {
    const tmp = { ...item }
    if (tmp.children && tmp.children.length) {
      filterAsyncRoutes(tmp.children)
    } else {
      res[0].children.push({
        path: tmp.pcUrl,
        component: urlMap[tmp.menuNo],
        meta: {
          title: tmp.name,
          icon: tmp.icon
        }
      })
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menusData) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(menusData)
      commit('SET_ROUTES', accessedRoutes)
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
