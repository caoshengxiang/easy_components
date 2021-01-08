<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        图片窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="Image">Image</button>
      </div>
    </div>

    <div class="cu-modal" :class="modalName=='Image'?'show':''">
      <div class="cu-dialog">
        <div class="bg-img"
              style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg');height:200px;">
          <div class="cu-bar justify-end text-white">
            <div class="action" @click="hideModal">
              <span class="cuIcon-close "></span>
            </div>
          </div>
        </div>
        <div class="cu-bar bg-white">
          <div class="action margin-0 flex-sub  solid-left" @click="hideModal">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal_4',
    data() {
      return {
        modalName: null,
      }
    },
    methods: {
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      hideModal(e) {
        this.modalName = null
      },
    }
  }
</script>

<style scoped>

</style>
