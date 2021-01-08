<template>
    <div style="width: 100%">
      <div class="cu-bar bg-white solid-bottom margin-top">
        <div class="action">
          <span class="cuIcon-title text-orange"></span> 多级显示
        </div>
        <div class="action">
          <button class="cu-btn bg-green shadow" @click="ScrollSteps">下一步</button>
        </div>
      </div>
      <scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-div="'scroll-' + scroll"
                   scroll-with-animation>
        <div class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in 10" :key="index" :id="'scroll-' + index">
          Level {{index + 1}} <span class="num" :data-index="index + 1"></span>
        </div>
      </scroll-view>
    </div>
</template>

<script>
  export default {
    name: 'steps_3',
    data() {
      return {
        scroll: 0
      }
    },
    methods: {
      ScrollSteps() {
        this.scroll= this.scroll == 9 ? 0 : this.scroll + 1
      }
    }

  }
</script>

<style scoped>

</style>
