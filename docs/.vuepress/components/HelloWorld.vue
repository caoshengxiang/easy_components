<template>
  <div class="hello">
    <p>你好，{{ msg }}</p>
    <el-button>按钮</el-button>
    <el-button type="primary">按钮</el-button>
    <el-button type="info">按钮</el-button>
    <el-button type="danger">按钮</el-button>
    <el-button type="warning">按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '这是一个组件!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
