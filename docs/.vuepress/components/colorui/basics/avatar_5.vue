<template>
  <div class="padding">
    <div class="cu-avatar-group">
      <div class="cu-avatar round lg" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'avatar_1',
    data() {
      return {
        avatar: [
          'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
          'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
          'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
        ],
      }
    }
  }
</script>

<style scoped>

</style>
