<template>
  <div class="overall">
    <div class="annulus-box" :style="{width: width + 'px', height: width + 'px'}">
      <div class="plan" :style="{width: width-ringWidth + 'px', height: width-ringWidth + 'px', left: `calc(50% - ${(width-ringWidth)/2}px)`, top: `calc(50% - ${(width-ringWidth)/2}px)`}">
        <span>{{plan}}%</span>
      </div>
      <div class="annulus-bck">
        <div class="annulus-left">
          <!-- :style="`transform: rotate(${plan>50?(plan-50)*3.6:0}deg);`" -->
          <div ref="semicircle-l" class="semicircle" :style="{width: width + 'px'}"></div>
        </div>
        <div class="annulus-right">
          <!-- :style="`transform: rotate(${plan<50?plan*3.6:180}deg);`" -->
          <div ref="semicircle-r" class="semicircle" :style="{width: width + 'px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'roundProgress',
    props: {
      plan: {
        default: 0,
        type: Number
      },
      width: { // px
        default: 70,
        type: Number
      },
      ringWidth: { // px
        default: 20,
        type: Number
      },
    },
    data() {
      return {}
    },
    mounted() {
      this.planChange()
    },
    methods: {
      planChange() {
        setTimeout(() => {
          if (this.plan > 50 && this.plan <= 100) {
            this.$refs['semicircle-l'].style.transform = `rotate(${(this.plan -
              50) *
            3.6}deg)`
          }
          if (this.plan > 100) {
            this.$refs['semicircle-l'].style.transform = `rotate(180deg)`
          }
          if (this.plan < 50) {
            this.$refs['semicircle-r'].style.transform = `rotate(${this.plan *
            3.6}deg)`
          } else {
            this.$refs['semicircle-r'].style.transform = `rotate(180deg)`
          }
        }, 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .annulus-box {
    //   box-shadow: 0 0 5px #ccc;
    position: relative;
    margin: auto;

    .plan {
      border-radius: 50%;
      background: white;
      position: absolute;
      z-index: 5;
      box-shadow: 0 0 5px #ccc inset;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      color: #424242;
    }

    //   -webkit-mask: radial-gradient(transparent 50px, white 0px);
    .annulus-bck {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(rgb(0, 255, 213) 50%, rgb(0, 110, 255) 100%);
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 0 0 10px #ccc;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
    }

    .annulus-left,
    .annulus-right {
      transform: scale(1.01);
      transform-origin: 50% 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      position: relative;

      .semicircle {
        transition: linear 0.5s;
        /*width: $annulusBox;*/
        height: 100%;
        border-radius: 50%;
      }
    }

    .annulus-left {
      .semicircle {
        transition-delay: 0.5s;
        left: 0;
        clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
        background: white;
      }
    }

    .annulus-right {
      .semicircle {
        position: relative;
        left: -100%;
        clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
        background: white;
      }
    }
  }
</style>
