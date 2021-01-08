<template>
  <div class="action">
    <button class="cu-btn bg-green shadow" @click="LoadModal">
      点我
    </button>
    <div class="cu-load load-modal" v-if="loadModal">
      <!-- <div class="cuIcon-emojifill text-orange"></div> -->
      <img src="../../../public/heart.png" style="width: 50px;height: 50px;" />
      <div class="gray-text">加载中...</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading_4',
    data() {
      return {
        loadModal: false,
      };
    },
    methods: {
      LoadModal(e) {
        this.loadModal = true;
        setTimeout(() => {
          this.loadModal = false;
        }, 2000)
      },
    }
  }
</script>

<style scoped>

</style>
