<template>
  <div class="padding bg-white">
    <div class="cu-progress radius striped active">
      <div class="bg-red" :style="[{ width:loading?'30%':''}]">30%</div>
      <div class="bg-olive" :style="[{ width:loading?'45%':''}]">45%</div>
      <div class="bg-cyan" :style="[{ width:loading?'25%':''}]">25%</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_5'
  }
</script>

<style scoped>

</style>
