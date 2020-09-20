<!--hover 组件中引入， 可在main.js 全局引入-->
<template>
  <div class="com-pages">
    <div class="com-page-title">hover.css动画</div>
    <div class="com-page-con">
      <div class="com-h2">效果展示：</div>
      <div class="com-text">
        <!--        <div id="animate">animate 动画</div>-->
        <div class="box">
          <div class="box-title">2D Transitions</div>
          <div class="box-list">
            <div class="ani-item hvr-glow">hvr-grow</div>
            <div class="ani-item hvr-shrink">hvr-shrink</div>
            <div class="ani-item hvr-pulse">hvr-pulse</div>
            <div class="ani-item hvr-pulse-grow">hvr-pulse-grow</div>
            <div class="ani-item hvr-pulse-shrink">hvr-pulse-shrink</div>
            <div class="ani-item hvr-push">hvr-push</div>
            <div class="ani-item hvr-pop">hvr-pop</div>
            <div class="ani-item hvr-bounce-in">hvr-bounce-in</div>
            <div class="ani-item hvr-bounce-out">hvr-bounce-out</div>
            <div class="ani-item hvr-rotate">hvr-rotate</div>
            <div class="ani-item hvr-grow-rotate">hvr-grow-rotate</div>
            <div class="ani-item hvr-float">hvr-float</div>
            <div class="ani-item hvr-sink">hvr-sink</div>
            <div class="ani-item hvr-bob">hvr-bob</div>
            <div class="ani-item hvr-hang">hvr-hang</div>
            <div class="ani-item hvr-skew">hvr-skew</div>
            <div class="ani-item hvr-skew-forward">hvr-skew-forward</div>
            <div class="ani-item hvr-skew-backward">hvr-skew-backward</div>
            <div class="ani-item hvr-wobble-horizontal">hvr-wobble-horizontal</div>
            <div class="ani-item hvr-wobble-vertical">hvr-wobble-vertical</div>
            <div class="ani-item hvr-wobble-to-bottom-right">hvr-wobble-to-bottom-right</div>
            <div class="ani-item hvr-wobble-to-top-right">hvr-wobble-to-top-right</div>
            <div class="ani-item hvr-wobble-top">hvr-wobble-top</div>
            <div class="ani-item hvr-wobble-bottom">hvr-wobble-bottom</div>
            <div class="ani-item hvr-wobble-skew">hvr-wobble-skew</div>
            <div class="ani-item hvr-buzz">hvr-buzz</div>
            <div class="ani-item hvr-buzz-out">hvr-buzz-out</div>
            <div class="ani-item hvr-forward">hvr-forward</div>
            <div class="ani-item hvr-backward">hvr-backward</div>
          </div>
          <div class="box-title">Background Transitions</div>
          <div class="box-list">
            <!--            <div class="ani-item hvr-glow">hvr-grow</div>-->
          </div>
        </div>
        <div class="com-h2"><a href="http://ianlunn.github.io/Hover/">官方链接</a></div>
        <div class="com-h2">使用方法</div>
        <div class="com-text">
          <div class="com-h3">1.直接引入</div>
          <div class="com-h3">2.npm 引入</div>
          <div class="com-text">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hovercss'
  }
</script>

<style scoped lang="scss">
  @import "./hover.css";
  .box {
    .box-title {
    }

    .box-list {
      .ani-item {
        display: inline-block;
        padding: 5px 5px;
        background-color: #e5e5e5;
        color: #f326c5;
        margin: 5px;
      }
    }
  }
</style>
