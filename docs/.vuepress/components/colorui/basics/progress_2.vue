<template>
  <div class="padding bg-white" style="width: 100%">
    <div class="cu-progress round">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]"></div>
    </div>
    <div class="cu-progress round margin-top sm">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]"></div>
    </div>
    <div class="cu-progress round margin-top xs">
      <div class="bg-red" :style="[{ width:loading?'61.8%':''}]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_2',
    data() {
      return {
        loading: true,
      };
    },
  }
</script>

<style scoped>

</style>
