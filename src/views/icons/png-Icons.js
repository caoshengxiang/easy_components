const req = require.context('../../icons/png', false, /\.png$/)
const requireAll = requireContext => requireContext.keys()
const re = /\.\/(.*)\.png/
const pngIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})
export default pngIcons
