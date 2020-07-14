import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import $router from '@/router'

// const apiUrl = 'http://' + window.document.location.hostname + ':9514'
// console.info(apiUrl)
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API2, // url = base url + request url
  // baseURL: apiUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)

    // if the custom code is not 20000, it is judged as an error.
    if (res.code && res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 && res.msg === '登录过期') {
        // to re-login
        MessageBox.confirm('登录已过期，请重新登录', '登录验证', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          // cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            // location.reload()
            if (location.href.indexOf('#') > -1) {
              const href = location.href.split('#')
              $router.push(`/login?redirect=${href[1]}`)
            } else {
              $router.push(`/login`)
            }
          })
        })
      }
      if (res.code === 10005) { // 非法token
        store.dispatch('user/resetToken').then(() => {
          // location.reload()
          if (location.href.indexOf('#') > -1) {
            const href = location.href.split('#')
            $router.push(`/login?redirect=${href[1]}`)
          } else {
            $router.push(`/login`)
          }
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      // message: error.message,
      message: '网络错误，请稍后再试！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
