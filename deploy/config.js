/**
 * 服务器相关配置
 */
const SERVER_LIST = [
  {
    id: 'test',
    name: '测试环境',
    host: '119.27.160.97', // ip
    port: 22, // 端口
    username: 'root',
    password: 'B89cukAsnvwbclMX',
    path: '/usr/local/nginx/html/zsy/test' // 项目静态文件存放地址
  },
  {
    id: 'prod',
    name: '正式环境',
    host: '101.x.xx.xx',
    port: 22,
    username: 'root',
    password: '******',
    path: '/opt/xxx/front'
  }
]
module.exports = SERVER_LIST
