<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        普通窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="Modal">Modal</button>
      </div>
    </div>
    <div class="cu-modal" :class="modalName=='Modal'?'show':''">
      <div class="cu-dialog">
        <div class="cu-bar bg-white justify-end">
          <div class="content">Modal标题</div>
          <div class="action" @click="hideModal" style="min-width: auto">
            <span class="cuIcon-close text-red"></span>
          </div>
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
    name: 'modal_1',
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
