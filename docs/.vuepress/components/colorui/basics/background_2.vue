<template>
  <div class="grid col-3 bg-white padding-sm">
    <div class="padding-sm" v-for="(item,index) in ColorList" :key="index" v-if="index<12">
      <div class="padding radius text-center light" :class="'bg-' + item.name">
        <div class="text-lg">{{item.title}}</div>
        <div class="margin-top-sm text-Abc">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'background_2',
    data() {
      return {
        ColorList: [{
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
    }
  }
</script>

<style scoped>

</style>
