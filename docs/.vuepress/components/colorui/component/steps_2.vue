<template>
    <div style="width: 100%">
      <div class="cu-bar bg-white solid-bottom margin-top">
        <div class="action">
          <span class="cuIcon-title text-orange"></span> 数字完成
        </div>
        <div class="action">
          <button class="cu-btn bg-green shadow" @click="NumSteps">下一步</button>
        </div>
      </div>
      <div class="bg-white padding">
        <div class="cu-steps">
          <div class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
            <span class="num" :class="index==2?'err':''" :data-index="index + 1"></span> {{item.name}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'steps_2',
    data() {
      return {
        numList: [{
          name: '开始'
        }, {
          name: '等待'
        }, {
          name: '错误'
        }, {
          name: '完成'
        }, ],
        num: 0,
      }
    },
    methods: {
      NumSteps() {
        this.num= this.num == this.numList.length - 1 ? 0 : this.num + 1
      },
    }
  }
</script>

<style scoped>

</style>
