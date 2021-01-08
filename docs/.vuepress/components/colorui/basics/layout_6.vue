<template>
  <div class="bg-white padding">
    <div class="grid col-4 grid-square">
      <div class="bg-img" style="width: 100px;height: 100px;margin-right: 10px;" v-for="(item,index) in avatar" :key="index"
           :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layout_6',
    data() {
      return {
        avatar: ['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg', 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg', 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg', 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
      }
    }
  }
</script>

<style scoped>

</style>
