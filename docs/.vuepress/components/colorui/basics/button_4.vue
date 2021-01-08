<template>
  <div>
    <div>
      <span class="">阴影</span>
      <el-switch v-model="shadow" :class="shadow?'checked':''" color="#39B54A"></el-switch>
    </div>
    <div class="action">
      <span>边框</span>
      <el-radio-group v-model="bordersize">
        <el-radio label="">小</el-radio>
        <el-radio label="s">大</el-radio>
      </el-radio-group>
    </div>
    <div class="grid col-5 padding-sm">
      <div class="margin-tb-sm text-center" v-for="(item,index) in ColorList" :key="index" v-if="item.name!='white'">
        <button class="cu-btn round" :class="[bordersize?'lines-' + item.name:'line-' + item.name, shadow?'shadow':'']">{{item.title}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'button_1',
    data() {
      return {
        shadow: false,
        bordersize: '',
        ColorList: [
          {
            title: '嫣红',
            name: 'red',
            color: '#e54d42'
          },
          {
            title: '桔橙',
            name: 'orange',
            color: '#f37b1d'
          },
          {
            title: '明黄',
            name: 'yellow',
            color: '#fbbd08'
          },
          {
            title: '橄榄',
            name: 'olive',
            color: '#8dc63f'
          },
          {
            title: '森绿',
            name: 'green',
            color: '#39b54a'
          },
          {
            title: '天青',
            name: 'cyan',
            color: '#1cbbb4'
          },
          {
            title: '海蓝',
            name: 'blue',
            color: '#0081ff'
          },
          {
            title: '姹紫',
            name: 'purple',
            color: '#6739b6'
          },
          {
            title: '木槿',
            name: 'mauve',
            color: '#9c26b0'
          },
          {
            title: '桃粉',
            name: 'pink',
            color: '#e03997'
          },
          {
            title: '棕褐',
            name: 'brown',
            color: '#a5673f'
          },
          {
            title: '玄灰',
            name: 'grey',
            color: '#8799a3'
          },
          {
            title: '草灰',
            name: 'gray',
            color: '#aaaaaa'
          },
          {
            title: '墨黑',
            name: 'black',
            color: '#333333'
          },
          {
            title: '雅白',
            name: 'white',
            color: '#ffffff'
          },
        ]
      }
    },
    methods: {
      SetBorderSize(e) {
        // this.bordersize = e.detail.value
      }
    }
  }
</script>

<style scoped>

</style>
