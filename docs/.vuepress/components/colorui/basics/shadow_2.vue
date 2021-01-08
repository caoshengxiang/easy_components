<template>
  <div class="padding text-center">
    <div class="padding-xl radius shadow bg-white">默认阴影</div>
    <div class="padding-xl radius shadow bg-blue margin-top">根据背景颜色而改变的阴影</div>
    <div class="padding-xl radius shadow shadow-lg bg-white margin-top">长阴影</div>
    <div class="padding-xl radius shadow shadow-lg bg-blue margin-top">长阴影</div>
    <div class="padding-xl radius shadow-warp bg-white margin-top">翘边阴影</div>
    <div class="padding-xl radius shadow-blur bg-red margin-top bg-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91005.jpg);">
      <div>根据背景图而改变的阴影</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shadow_2'
  }
</script>

<style scoped>

</style>
