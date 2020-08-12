<template>
  <div>
    <img src="avatar.png" alt="">
    <div class="bg"/>
  </div>
</template>

<script>
  export default {
    name: 'Test'
  }
</script>

<style scoped lang="scss">
  .bg {
    background-image: url("avatar.png");
    width: 100px;
    height: 100px;
  }
</style>
