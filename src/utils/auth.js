import VueCookies from 'vue-cookies'

const TokenKey = 'token'

export function getToken () {
  return VueCookies.get(TokenKey)
}

export function setToken (token, time = 2 * 60 * 60) { // time 以秒为单位, 默认2小时
  return VueCookies.set(TokenKey, token, time)
}

export function removeToken () {
  return VueCookies.remove(TokenKey)
}
