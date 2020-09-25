<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <text class="cuIcon-title text-orange "></text>
        单选窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="RadioModal">Radio</button>
      </div>
    </div>

    <div class="cu-modal" :class="modalName=='RadioModal'?'show':''" @click="hideModal">
      <div class="cu-dialog" @click.stop="">
          <div class="cu-list menu text-left">
            <div class="cu-item" v-for="(item,index) in 5" :key="index">
              <label class="flex justify-between align-center flex-sub">
                <div class="flex-sub">Item {{index +1}}</div>
                <el-radio v-model="radio" :label="item">{{item.name}}</el-radio>
              </label>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'modal_5',
    data() {
      return {
        modalName: null,
        radio: '1',
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
