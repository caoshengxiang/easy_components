<template>
  <div class="box">
    <div class="cu-bar search bg-white">
      <div class="search-form round">
        <span class="cuIcon-search"></span>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow-blur round">搜索</button>
      </div>
    </div>
    <div class="cu-bar search bg-white">
      <div class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big11010.jpg)"></div>
      <div class="search-form round">
        <span class="cuIcon-search"></span>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
      </div>
      <div class="action">
        <span>广州</span>
        <span class="cuIcon-triangledownfill"></span>
      </div>
    </div>
    <div class="cu-bar bg-red search">
      <div class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big114004.jpg);"></div>
      <div class="search-form radius">
        <span class="cuIcon-search"></span>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
      </div>
      <div class="action">
        <span>广州</span>
        <span class="cuIcon-triangledownfill"></span>
      </div>
    </div>
    <div class="cu-bar bg-cyan search">
      <div class="search-form radius">
        <span class="cuIcon-search"></span>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
      </div>
      <div class="action">
        <span class="cuIcon-close"></span>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bar_4',
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
