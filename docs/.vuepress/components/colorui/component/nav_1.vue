<template>
  <div style="width: 100%;">
<!--    <cu-custom bgColor="bg-gradual-pink" :isBack="true">-->
<!--      <div slot="backText">返回</div>-->
<!--      <div slot="content">导航栏</div>-->
<!--    </cu-custom>-->
    <div v-for="(item,index) in 10" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
      Tab{{index}}
    </div>
    <div class="cu-bar bg-white solid-bottom">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        默认
      </div>
    </div>
    <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
      <div class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index"
            @tap="tabSelect" :data-id="index">
        Tab{{index}}
      </div>
    </scroll-view>

    <div class="cu-bar bg-white margin-top solid-bottom">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        居中
      </div>
    </div>
    <scroll-view scroll-x class="bg-white nav text-center">
      <div class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in 3" :key="index"
            @tap="tabSelect" :data-id="index">
        Tab{{index}}
      </div>
    </scroll-view>

    <div class="cu-bar bg-white margin-top solid-bottom">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        平分
      </div>
    </div>
    <scroll-view scroll-x class="bg-white nav">
      <div class="flex text-center">
        <div class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4"
              :key="index" @tap="tabSelect" :data-id="index">
          Tab{{index}}
        </div>
      </div>
    </scroll-view>
    <div class="cu-bar bg-white margin-top solid-bottom">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        背景
      </div>
    </div>
    <div scroll-x class="bg-red nav text-center">
      <div class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in 3" :key="index"
            @tap="tabSelect" :data-id="index">
        Tab{{index}}
      </div>
    </div>
    <div class="cu-bar bg-white margin-top solid-bottom">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        图标
      </div>
    </div>
    <div scroll-x class="bg-green nav text-center">
      <div class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
        <span class="cuIcon-camerafill"></span>
        数码
      </div>
      <div class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
        <span class="cuIcon-upstagefill"></span>
        排行榜
      </div>
      <div class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
        <span class="cuIcon-clothesfill"></span>
        皮肤
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'nav_1',
    data() {
      return {
        TabCur: 0,
        scrollLeft: 0
      }
    },
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      }
    }
  }
</script>

<style scoped>

</style>
