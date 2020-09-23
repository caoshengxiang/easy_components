<template>
  <div>
    <view class="cu-load bg-blue" :class="!isLoad?'loading':'over'"></view>
  </div>
</template>

<script>
  export default {
    name: 'loading_1',
    data() {
      return {
        isLoad: false,
      }
    }
  }
</script>

<style scoped>

</style>
