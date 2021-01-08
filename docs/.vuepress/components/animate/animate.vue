<!--animate.css 在main.js 全局引入-->

<template>
  <div class="com-pages">
    <div class="com-page-title">animate.css动画</div>
    <div class="com-page-con">
      <div class="com-h2">效果展示：</div>
      <div class="com-text">
<!--        <div id="animate">animate 动画</div>-->
        <div class="box">
          <div class="box-title">Attention Seekers</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('bounce')" :class="{'bounce': animateName === 'bounce'}">animated bounce</div>
            <div class="ani-item animated" @click="setAnimate('flash')" :class="{'flash': animateName === 'flash'}">animated flash</div>
            <div class="ani-item animated" @click="setAnimate('pulse')" :class="{'pulse': animateName === 'pulse'}">animated pulse</div>
            <div class="ani-item animated" @click="setAnimate('rubberBand')" :class="{'rubberBand': animateName === 'rubberBand'}">animated rubberBand</div>
            <div class="ani-item animated" @click="setAnimate('shake')" :class="{'shake': animateName === 'shake'}">animated shake</div>
            <div class="ani-item animated" @click="setAnimate('swing')" :class="{'swing': animateName === 'swing'}">animated swing</div>
            <div class="ani-item animated" @click="setAnimate('tada')" :class="{'tada': animateName === 'tada'}">animated tada</div>
            <div class="ani-item animated" @click="setAnimate('wobble')" :class="{'wobble': animateName === 'wobble'}">animated wobble</div>
          </div>
          <div class="box-title">Bouncing Entrances</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('bounceIn')" :class="{'bounceIn': animateName === 'bounceIn'}">animated bounceIn</div>
            <div class="ani-item animated" @click="setAnimate('bounceInDown')" :class="{'bounceInDown': animateName === 'bounceInDown'}">animated bounceInDown</div>
            <div class="ani-item animated" @click="setAnimate('bounceInLeft')" :class="{'bounceInLeft': animateName === 'bounceInLeft'}">animated bounceInLeft</div>
            <div class="ani-item animated" @click="setAnimate('bounceInRight')" :class="{'bounceInRight': animateName === 'bounceInRight'}">animated bounceInRight</div>
            <div class="ani-item animated" @click="setAnimate('bounceInUp')" :class="{'bounceInUp': animateName === 'bounceInUp'}">animated bounceInUp</div>
          </div>
          <div class="box-title">Bouncing Exits</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('bounceOut')" :class="{'bounceOut': animateName === 'bounceOut'}">animated bounceOut</div>
            <div class="ani-item animated" @click="setAnimate('bounceOutDown')" :class="{'bounceOutDown': animateName === 'bounceOutDown'}">animated bounceOutDown</div>
            <div class="ani-item animated" @click="setAnimate('bounceOutLeft')" :class="{'bounceOutLeft': animateName === 'bounceOutLeft'}">animated bounceOutLeft</div>
            <div class="ani-item animated" @click="setAnimate('bounceOutRight')" :class="{'bounceOutRight': animateName === 'bounceOutRight'}">animated bounceOutRight</div>
            <div class="ani-item animated" @click="setAnimate('bounceOutUp')" :class="{'bounceOutUp': animateName === 'bounceOutUp'}">animated bounceOutUp</div>
          </div>
          <div class="box-title">Fading Entrances</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('fadeIn')" :class="{'fadeIn': animateName === 'fadeIn'}">animated fadeIn</div>
            <div class="ani-item animated" @click="setAnimate('fadeInDown')" :class="{'fadeInDown': animateName === 'fadeInDown'}">animated fadeInDown</div>
            <div class="ani-item animated" @click="setAnimate('fadeInDownBig')" :class="{'fadeInDownBig': animateName === 'fadeInDownBig'}">animated fadeInDownBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeInLeft')" :class="{'fadeInLeft': animateName === 'fadeInLeft'}">animated fadeInLeft</div>
            <div class="ani-item animated" @click="setAnimate('fadeInLeftBig')" :class="{'fadeInLeftBig': animateName === 'fadeInLeftBig'}">animated fadeInLeftBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeInRight')" :class="{'fadeInRight': animateName === 'fadeInRight'}">animated fadeInRight</div>
            <div class="ani-item animated" @click="setAnimate('fadeInRightBig')" :class="{'fadeInRightBig': animateName === 'fadeInRightBig'}">animated fadeInRightBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeInUp')" :class="{'fadeInUp': animateName === 'fadeInUp'}">animated fadeInUp</div>
            <div class="ani-item animated" @click="setAnimate('fadeInUpBig')" :class="{'fadeInUpBig': animateName === 'fadeInUpBig'}">animated fadeInUpBig</div>
          </div>
          <div class="box-title">Fading Exits</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('fadeOut')" :class="{'fadeOut': animateName === 'fadeOut'}">animated fadeOut</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutDown')" :class="{'fadeOutDown': animateName === 'fadeOutDown'}">animated fadeOutDown</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutDownBig')" :class="{'fadeOutDownBig': animateName === 'fadeOutDownBig'}">animated fadeOutDownBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutLeft')" :class="{'fadeOutLeft': animateName === 'fadeOutLeft'}">animated fadeOutLeft</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutLeftBig')" :class="{'fadeOutLeftBig': animateName === 'fadeOutLeftBig'}">animated fadeOutLeftBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutRight')" :class="{'fadeOutRight': animateName === 'fadeOutRight'}">animated fadeOutRight</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutRightBig')" :class="{'fadeOutRightBig': animateName === 'fadeOutRightBig'}">animated fadeOutRightBig</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutUp')" :class="{'fadeOutUp': animateName === 'fadeOutUp'}">animated fadeOutUp</div>
            <div class="ani-item animated" @click="setAnimate('fadeOutUpBig')" :class="{'fadeOutUpBig': animateName === 'fadeOutUpBig'}">animated fadeOutUpBig</div>
          </div>
          <div class="box-title">Flippers</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('flip')" :class="{'flip': animateName === 'flip'}">animated flip</div>
            <div class="ani-item animated" @click="setAnimate('flipInX')" :class="{'flipInX': animateName === 'flipInX'}">animated flipInX</div>
            <div class="ani-item animated" @click="setAnimate('flipInY')" :class="{'flipInY': animateName === 'flipInY'}">animated flipInY</div>
            <div class="ani-item animated" @click="setAnimate('flipOutX')" :class="{'flipOutX': animateName === 'flipOutX'}">animated flipOutX</div>
            <div class="ani-item animated" @click="setAnimate('flipOutY')" :class="{'flipOutY': animateName === 'flipOutY'}">animated flipOutY</div>
          </div>
          <div class="box-title">Lightspeed</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('lightSpeedIn')" :class="{'lightSpeedIn': animateName === 'lightSpeedIn'}">animated lightSpeedIn</div>
            <div class="ani-item animated" @click="setAnimate('lightSpeedOut')" :class="{'lightSpeedOut': animateName === 'lightSpeedOut'}">animated lightSpeedOut</div>
          </div>
          <div class="box-title">Rotating Entrances</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('rotateIn')" :class="{'rotateIn': animateName === 'rotateIn'}">animated rotateIn</div>
            <div class="ani-item animated" @click="setAnimate('rotateInDownLeft')" :class="{'rotateInDownLeft': animateName === 'rotateInDownLeft'}">animated rotateInDownLeft</div>
            <div class="ani-item animated" @click="setAnimate('rotateInDownRight')" :class="{'rotateInDownRight': animateName === 'rotateInDownRight'}">animated rotateInDownRight</div>
            <div class="ani-item animated" @click="setAnimate('rotateInUpLeft')" :class="{'rotateInUpLeft': animateName === 'rotateInUpLeft'}">animated rotateInUpLeft</div>
            <div class="ani-item animated" @click="setAnimate('rotateInUpRight')" :class="{'rotateInUpRight': animateName === 'rotateInUpRight'}">animated rotateInUpRight</div>
          </div>
          <div class="box-title">Rotating Exits</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('rotateOut')" :class="{'rotateOut': animateName === 'rotateOut'}">animated rotateOut</div>
            <div class="ani-item animated" @click="setAnimate('rotateOutDownLeft')" :class="{'rotateOutDownLeft': animateName === 'rotateOutDownLeft'}">animated rotateOutDownLeft</div>
            <div class="ani-item animated" @click="setAnimate('rotateOutDownRight')" :class="{'rotateOutDownRight': animateName === 'rotateOutDownRight'}">animated rotateOutDownRight</div>
            <div class="ani-item animated" @click="setAnimate('rotateOutUpLeft')" :class="{'rotateOutUpLeft': animateName === 'rotateOutUpLeft'}">animated rotateOutUpLeft</div>
            <div class="ani-item animated" @click="setAnimate('rotateOutUpRight')" :class="{'rotateOutUpRight': animateName === 'rotateOutUpRight'}">animated rotateOutUpRight</div>
          </div>
          <div class="box-title">Sliders</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('slideInDown')" :class="{'slideInDown': animateName === 'slideInDown'}">animated slideInDown</div>
            <div class="ani-item animated" @click="setAnimate('slideInLeft')" :class="{'slideInLeft': animateName === 'slideInLeft'}">animated slideInLeft</div>
            <div class="ani-item animated" @click="setAnimate('slideInRight')" :class="{'slideInRight': animateName === 'slideInRight'}">animated slideInRight</div>
            <div class="ani-item animated" @click="setAnimate('slideOutLeft')" :class="{'slideOutLeft': animateName === 'slideOutLeft'}">animated slideOutLeft</div>
            <div class="ani-item animated" @click="setAnimate('slideOutRight')" :class="{'slideOutRight': animateName === 'slideOutRight'}">animated slideOutRight</div>
            <div class="ani-item animated" @click="setAnimate('slideOutUp')" :class="{'slideOutUp': animateName === 'slideOutUp'}">animated slideOutUp</div>
          </div>
          <div class="box-title">Specials</div>
          <div class="box-list">
            <div class="ani-item animated" @click="setAnimate('hinge')" :class="{'hinge': animateName === 'hinge'}">animated hinge</div>
            <div class="ani-item animated" @click="setAnimate('rollIn')" :class="{'rollIn': animateName === 'rollIn'}">animated rollIn</div>
            <div class="ani-item animated" @click="setAnimate('rollOut')" :class="{'rollOut': animateName === 'rollOut'}">animated rollOut</div>
          </div>
        </div>
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
    name: 'animatecss',
    data () {
      return {
        activeName: 'a',
        animateName: ''
      }
    },
    methods: {
      setAnimate (name) {
        if (this.animateName) {
          this.animateName = ''
        }
        setTimeout(() => {
          this.animateName = name
        }, 0)
      },
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "animate.css";
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
