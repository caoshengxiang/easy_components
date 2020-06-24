// 定义一个混入对象
const mixin = {
  data() {
    return {
      userInfo: {},
      menus: []
    }
  },
  created: function() {
    this.userInfo = this.$webStorage.getItem('userInfo') || {}
    this.menus = this.$webStorage.getItem('menus')
  }
}

export default mixin
