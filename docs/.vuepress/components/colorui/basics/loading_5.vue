<template>
  <div class="action">
    <button class="cu-btn bg-green shadow" @click="LoadProgress">
      点我
    </button>
    <div class="load-progress" :class="loadProgress!=0?'show':'hide'">
      <div class="load-progress-bar bg-green" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></div>
      <div class="load-progress-spinner text-green"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading_5',
    data() {
      return {
        loadProgress: 0
      };
    },
    methods: {
      LoadProgress(e) {
        this.loadProgress = this.loadProgress + 3;
        if (this.loadProgress < 100) {
          setTimeout(() => {
            this.LoadProgress();
          }, 100)
        } else {
          this.loadProgress = 0;
        }
      }
    }
  }
</script>

<style scoped>

</style>
