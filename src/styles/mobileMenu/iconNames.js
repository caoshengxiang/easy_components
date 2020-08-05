const names = []
const files = require.context('./modules', false, /\.png$/)
const requireAll = requireContext => requireContext.keys().forEach(key => {
  const keyName = key.replace('./', '').replace('.png', '')
  names.push(keyName)
})
requireAll(files)

export default names
