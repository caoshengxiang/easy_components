import API from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import avatarDefault from '@/assets/avatar.svg'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userInfo: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || avatarDefault // 默认头像
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, pwd, userType } = userInfo
    return new Promise((resolve, reject) => {
      API.account.login({
        account: account.trim(),
        pwd,
        userType
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  userInfo({ commit, state }) {
    console.log(API)
    return new Promise((resolve, reject) => {
      API.account.userInfo().then(response => {
        // const { data } = response
        const data = response.records

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { userName, avatar } = data
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user menus
  getMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      API.account.userMenus().then(response => {
        const { data } = response
        if (!data) {
          reject('菜单获取错误.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      API.account.logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_USERINFO', '')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
