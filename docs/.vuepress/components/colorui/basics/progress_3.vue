<template>
  <div  style="width: 100%">
    <div class="cu-bar bg-white solid-bottom margin-top" @click="showModal" data-target="ColorModal">
      <div class="action">
        <text class="cuIcon-title text-blue"></text>进度条颜色
      </div>
      <div class="action">
        <div class="padding solid radius shadow-blur" :class="'bg-' + color"></div>
      </div>
    </div>
    <div class="padding" :class="color=='white'?'bg-grey':'bg-white'">
      <div class="cu-progress round">
        <div :class="'bg-' + color" :style="[{ width:loading?'61.8%':''}]"></div>
      </div>
    </div>
    <div class="cu-modal" :class="modalName=='ColorModal'?'show':''">
      <div class="cu-dialog">
        <div class="cu-bar justify-end solid-bottom">
          <div class="content">选择颜色</div>
          <div class="action" @click="hideModal">
            <text class="cuIcon-close text-red"></text>
          </div>
        </div>
        <div class="grid col-5 padding">
          <div class="padding-xs" v-for="(item,index) in ColorList" :key="index" @click="SetColor" :data-color="item.name" v-if="item.name!='gray' && item.name!='white'">
            <div class="padding-tb radius" :class="'bg-' + item.name"> {{item.title}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress_3',
    data() {
      return {
        color: 'red',
        loading: true,
        modalName: '',
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
          ],
      }
    },
    methods: {
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      hideModal(e) {
        this.modalName = null
      },
      SetColor(e) {
        this.color = e.currentTarget.dataset.color;
        this.modalName = null
      },
    }
  }
</script>

<style scoped>

</style>
