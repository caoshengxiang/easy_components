<template>
  <div class="action">
    <button class="cu-btn bg-green shadow" @tap="LoadProgress">
      点我
    </button>
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
