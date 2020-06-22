/*
* router 编程式路由 新开标签
* obj 路由参数 和router 参数一致
* */
import $router from '@/router'

export function targetNewPage(obj) {
  const routeUrl = $router.resolve(obj)
  window.open(routeUrl.href, '_blank')
}
