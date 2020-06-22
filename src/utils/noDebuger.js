import deb from './noEdbuger_deb'

export default function noDebuger() {
  function testDebuger() {
    var d = new Date()
    deb()
    if (new Date() - d > 100) {
      document.body.innerHTML = '<div>系统已经禁用该功能，请退出调试并刷新页面</div>'
      return true
    }
    return false
  }

  function start() {
    while (testDebuger()) {
      testDebuger()
    }
  }

  if (!testDebuger()) {
    window.onblur = function() {
      setTimeout(function() {
        start()
      }, 500)
    }
  } else {
    start()
  }
}
