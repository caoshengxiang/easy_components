<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white solid-bottom margin-top">
      <div class="action">
        <span class="cuIcon-title text-blue"></span>
        进度条条纹
      </div>
      <el-switch v-model="active"></el-switch>
    </div>
    <div class="padding bg-white">
      <div class="cu-progress round sm striped" :class="active?'active':''">
        <div class="bg-green" :style="[{ width:loading?'60%':''}]"></div>
      </div>
      <div class="cu-progress round sm margin-top-sm striped" :class="active?'active':''">
        <div class="bg-black" :style="[{ width:loading?'40%':''}]"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_4',
    data() {
      return {
        loading: true,
        active: false
      }
    },
    methods: {
      SetActive(e) {
        this.active = e.detail.value
      },
    }
  }
</script>

<style scoped>

</style>
