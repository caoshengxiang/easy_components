<template>
  <div class="bg-white padding">
    <div class="grid margin-bottom text-center" v-for="(item,index) in 5" :key="index" :class="'col-' + (index+1)">
      <div class="padding" :class="indexs%2==0?'bg-cyan':'bg-blue'" v-for="(item,indexs) in (index+1)*2" :key="indexs">{{indexs+1}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layout_5'
  }
</script>

<style scoped>

</style>
