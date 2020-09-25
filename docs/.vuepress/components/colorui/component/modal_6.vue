<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        多选窗口
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="ChooseModal">Choose</button>
      </div>
    </div>
    <div class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @click="hideModal">
      <div class="cu-dialog" @tap.stop="">
        <div class="cu-bar bg-white">
          <div class="action text-blue" @tap="hideModal">取消</div>
          <div class="action text-green" @tap="hideModal">确定</div>
        </div>
        <div class="grid col-3 padding-sm">
          <div v-for="(item,index) in checkbox" class="padding-xs" :key="index">
            <button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @click="ChooseCheckbox"
                    :data-value="item.value"> {{item.name}}
              <div class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">
                HOT
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal_6',
    data() {
      return {
        modalName: null,
        checkbox: [
          {
            value: 0,
            name: '10元',
            checked: false,
            hot: false,
          }, {
            value: 1,
            name: '20元',
            checked: true,
            hot: false,
          }, {
            value: 2,
            name: '30元',
            checked: true,
            hot: true,
          }, {
            value: 3,
            name: '60元',
            checked: false,
            hot: true,
          }, {
            value: 4,
            name: '80元',
            checked: false,
            hot: false,
          }, {
            value: 5,
            name: '100元',
            checked: false,
            hot: false,
          }]
      }
    },
    methods: {
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      hideModal(e) {
        this.modalName = null
      },
      ChooseCheckbox(e) {
        let items = this.checkbox;
        let values = e.currentTarget.dataset.value;
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
          if (items[i].value == values) {
            items[i].checked = !items[i].checked;
            break
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
