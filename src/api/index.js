const ApiObj = {}
const files = require.context('./modules', false, /\.js$/)
const requireAll = requireContext => requireContext.keys().forEach(key => {
  const keyName = key.replace('./', '').replace('.js', '')
  ApiObj[keyName] = files(key).default // 读取文件中的default 模块
  // console.log(keyName)
})
requireAll(files)
// console.log(ApiObj)

export default ApiObj
