<template>
<div>
  <switch @change="isLoading" :class="isLoad?'checked':''"></switch>
  <div class="cu-load bg-grey" :class="!isLoad?'loading':'over'"></div>
</div>
</template>

<script>
  export default {
    name: 'loading_2',
    data() {
      return {
        isLoad: false,
      }
    },
    methods: {
      isLoading(e) {
        this.isLoad = e.detail.value;
      },
    }
  }
</script>

<style scoped>

</style>
