import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  var time = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
  return Cookies.set(TokenKey, token, {
    expires: time
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
