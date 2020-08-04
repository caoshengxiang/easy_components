// import Cookies from 'js-cookie'
import VueCookies from 'vue-cookies'
const TokenKey = 'token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return VueCookies.get(TokenKey)
}

export function setToken(token) {
  // var time = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
  // return Cookies.set(TokenKey, token, {
  //   expires: time
  // })
  // return Cookies.set(TokenKey, token)
  return VueCookies.set(TokenKey, token, 2*60*60)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return VueCookies.remove(TokenKey)
}
