<template>
  <div class="action">
    <button class="cu-btn bg-green shadow" @click="LoadModal">
      点我
    </button>
    <view class="cu-load load-modal" v-if="loadModal">
      <!-- <view class="cuIcon-emojifill text-orange"></view> -->
      <image src="/static/logo.png" mode="aspectFit"></image>
      <view class="gray-text">加载中...</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="cuIcon-title text-blue"></text>进度条加载
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow" @click="LoadProgress">
          点我
        </button>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    name: 'loading_4',
    data() {
      return {
        loadModal: false,
        loadProgress: 0
      };
    },
    methods: {
      LoadModal(e) {
        this.loadModal = true;
        setTimeout(() => {
          this.loadModal = false;
        }, 2000)
      },
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
