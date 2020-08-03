const names = []
const files = require.context('./modules', false, /\.png$/)
const requireAll = requireContext => requireContext.keys().forEach(key => {
  const keyName = key.replace('./', '').replace('.png', '')
  if (keyName.indexOf('1') === -1 && keyName.indexOf('2') === -1) {
    names.push(keyName)
  }
})
requireAll(files)

export default names
