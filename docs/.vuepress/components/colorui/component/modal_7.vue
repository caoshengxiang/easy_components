<template>
<div style="width: 100%;">
  <div class="cu-bar bg-white margin-top">
    <div class="action">
      <span class="cuIcon-title text-orange "></span> 侧边抽屉
    </div>
    <div class="action">
      <button class="cu-btn bg-green shadow" @click="showModal" data-target="DrawerModalL">Left</button>
      <button class="cu-btn bg-blue shadow margin-left" @click="showModal" data-target="DrawerModalR">Right</button>
    </div>
  </div>
  <div class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @click="hideModal">
    <div class="cu-dialog basis-lg" @click.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
      <div class="cu-list menu text-left">
        <div class="cu-item arrow" v-for="(item,index) in 5" :key="index" style="width: 100%">
          <div class="content">
            <div>Item {{index +1}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @click="hideModal">
    <div class="cu-dialog basis-lg" @click.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
      <div class="cu-list menu text-left">
        <div class="cu-item arrow" v-for="(item,index) in 5" :key="index" style="width: 100%">
          <div class="content">
            <div>Item {{index +1}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'modal_7',
    data() {
      return {
        modalName: null,
        CustomBar: 0, // 距离顶部高度
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
