// https://webpack.js.org/guides/dependency-management/#requirecontext
// require.context('./prototype', true, /\.js$/)
// 添加prototype
import './prototype/moment'
import './prototype/api'
import './prototype/vueCookies'
import './prototype/qs'
import './prototype/echarts'
import './prototype/targetNewPage'
import './prototype/webStorage'
// const files_prototype = require.context('./prototype', false, /\.js$/)
// console.log(files_prototype.keys())

// styles
import './styles'

// globalComponents
// import './globalComponents/video'
// import './globalComponents/dataView'
