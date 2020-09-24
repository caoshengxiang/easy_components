<template>
  <div class="box" style="width: 100%">
    <div class="cu-bar input">
      <div class="action">
        <span class="cuIcon-sound text-grey"></span>
      </div>
      <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" :focus="false" maxlength="300" cursor-spacing="10"></input>
      <div class="action">
        <span class="cuIcon-emojifill text-grey"></span>
      </div>
      <button class="cu-btn bg-green shadow-blur">发送</button>
    </div>

    <div class="cu-bar input">
      <div class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></div>
      <div class="action">
        <span class="cuIcon-roundaddfill text-grey"></span>
      </div>
      <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" maxlength="300" cursor-spacing="10"></input>
      <div class="action">
        <span class="cuIcon-emojifill text-grey"></span>
      </div>
      <button class="cu-btn bg-green shadow-blur">发送</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bar_6',
    data() {
      return {
        InputBottom: 0
      };
    },
    methods: {
      InputFocus(e) {
        this.InputBottom = e.detail.height
      },
      InputBlur(e) {
        this.InputBottom = 0
      }
    }
  }
</script>

<style scoped>

</style>
