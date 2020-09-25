<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        底部窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="bottomModal">Bottom</button>
      </div>
    </div>
    <div class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
      <div class="cu-dialog">
        <div class="cu-bar bg-white" style="padding-left: 20px;padding-right: 20px;">
          <div class=" text-green">确定</div>
          <div class=" text-blue" @click="hideModal">取消</div>
        </div>
        <div class="padding-xl">
          Modal 内容。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal_2',
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
