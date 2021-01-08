<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        对话窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="DialogModal1">Dialog</button>
        <button class="cu-btn bg-blue shadow margin-left" @click="showModal" data-target="DialogModal2">Dialog</button>
      </div>
    </div>
    <div class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
      <div class="cu-dialog">
        <div class="cu-bar bg-white justify-end">
          <div class="content">Modal标题</div>
          <div class="action" @click="hideModal">
            <span class="cuIcon-close text-red"></span>
          </div>
        </div>
        <div class="padding-xl">
          Modal 内容。
        </div>
        <div class="cu-bar bg-white justify-end">
          <div class="action">
            <button class="cu-btn line-green text-green" @click="hideModal">取消</button>
            <button class="cu-btn bg-green margin-left" @click="hideModal">确定</button>

          </div>
        </div>
      </div>
    </div>

    <div class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
      <div class="cu-dialog">
        <div class="cu-bar bg-white justify-end">
          <div class="content">Modal标题</div>
          <div class="action" @click="hideModal">
            <span class="cuIcon-close text-red"></span>
          </div>
        </div>
        <div class="padding-xl">
          Modal 内容。
        </div>
        <div class="cu-bar bg-white">
          <div class="action margin-0 flex-sub text-green " @click="hideModal">
            <span class="cuIcon-moneybag"></span>
            微信支付
          </div>
          <div class="action margin-0 flex-sub text-green solid-left" @click="hideModal">取消</div>
          <div class="action margin-0 flex-sub  solid-left" @click="hideModal">确定</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'modal_3',
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
