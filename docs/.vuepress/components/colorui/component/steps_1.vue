<template>
    <div style="width: 100%">
      <div class="cu-bar bg-white solid-bottom">
        <div class="action">
          <span class="cuIcon-title text-orange"></span> 基本用法
        </div>
        <div class="action">
          <button class="cu-btn bg-green shadow" @click="BasicsSteps">下一步</button>
        </div>
      </div>
      <div class="bg-white padding">
        <div class="cu-steps">
          <div class="cu-item" :class="index>basics?'':'text-red'" v-for="(item,index) in basicsList" :key="index">
            <span :class="'cuIcon-' + item.cuIcon"></span> {{item.name}}
          </div>
        </div>
      </div>

      <div class="bg-white padding margin-top-xs">
        <div class="cu-steps">
          <div class="cu-item" :class="index>basics?'':'text-orange'" v-for="(item,index) in basicsList" :key="index">
            <span :class="index>basics?'cuIcon-title':'cuIcon-' + item.cuIcon"></span> {{item.name}}
          </div>
        </div>
      </div>

      <div class="bg-white padding  margin-top-xs">
        <div class="cu-steps steps-arrow">
          <div class="cu-item" :class="index>basics?'':'text-blue'" v-for="(item,index) in basicsList" :key="index">
            <span :class="'cuIcon-' + item.cuIcon"></span> {{item.name}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'steps_1',
    data() {
      return {
        basics: 0,
        basicsList: [{
          cuIcon: 'usefullfill',
          name: '开始'
        }, {
          cuIcon: 'radioboxfill',
          name: '等待'
        }, {
          cuIcon: 'roundclosefill',
          name: '错误'
        }, {
          cuIcon: 'roundcheckfill',
          name: '完成'
        }, ],
      }
    },
    methods: {
      BasicsSteps() {
        this.basics= this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
      },
    }
  }
</script>

<style scoped>

</style>
