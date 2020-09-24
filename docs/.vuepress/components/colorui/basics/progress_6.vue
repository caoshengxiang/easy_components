<template>
  <div class="padding bg-white " style="width: 100%;">
    <div class="flex">
      <div class="cu-progress round">
        <div class="bg-green" :style="[{ width:loading?'100%':''}]"></div>
      </div>
      <span class="cuIcon-roundcheckfill text-green margin-left-sm"></span>
    </div>
    <div class="flex margin-top">
      <div class="cu-progress round">
        <div class="bg-green" :style="[{ width:loading?'80%':''}]"></div>
      </div>
      <span class="margin-left">80%</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_6',
    data() {
      return {
        loading: true,
      }
    },
  }
</script>

<style scoped>

</style>
