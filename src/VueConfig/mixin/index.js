// 定义一个混入对象
const mixin = {
  data() {
    return {
      userInfo: {}
    }
  },
  created: function() {
    this.userInfo = this.$webStorage.getItem('userInfo') || {}
  }
}

export default mixin
