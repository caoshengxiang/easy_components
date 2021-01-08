<template>
  <div style="width: 100%;">
    <div style="margin-bottom: 10px;text-align: right;">
      <el-switch v-model="isLoad"></el-switch>
    </div>
    <div class="cu-load bg-blue" :class="!isLoad?'loading':'over'"></div>
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
