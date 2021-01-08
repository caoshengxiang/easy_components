<template>
  <div class="padding bg-white" style="width: 100%">
    <div class="cu-progress">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</div>
    </div>
    <div class="cu-progress radius margin-top">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</div>
    </div>
    <div class="cu-progress round margin-top">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_1',
    data() {
      return {
        loading: true,
      };
    },
  }
</script>

<style scoped>

</style>
