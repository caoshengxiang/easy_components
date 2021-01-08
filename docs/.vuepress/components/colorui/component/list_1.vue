<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white solid-bottom margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange "></span>
        宫格列表
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="gridModal">设置</button>
      </div>
    </div>
    <div class="cu-modal" :class="modalName=='gridModal'?'show':''" @click="hideModal">
      <div class="cu-dialog" @click.stop>
        <el-radio-group class="block" v-model="gridCol">
          <div class="cu-list menu text-left">
            <div class="cu-item" v-for="(item,index) in 3" :key="index">
              <div class="flex justify-between align-center flex-sub">
                <div class="flex-sub">{{index +3}} 列</div>
                <el-radio class="round" :label="index + 3">{{index +3}} 列</el-radio>
              </div>
            </div>
          </div>
        </el-radio-group>
<!--        <div class="block">-->
<!--          <div class="cu-list menu text-left">-->
<!--            <el-radio-group v-model="gridCol">-->
<!--              <div class="cu-item" v-for="(item,index) in 3">-->
<!--                <el-radio class="flex justify-between align-center flex-sub" :label="index + 3">{{index +3}} 列</el-radio>-->
<!--              </div>-->
<!--            </el-radio-group>-->
<!--          </div>-->
<!--        </div>-->
        <div class="cu-list menu text-left solid-top">
          <div class="cu-item">
            <div class="content">
              <span class="text-grey">边框</span>
            </div>
            <div class="action">
              <!--              <switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>-->
              <el-switch v-model="gridBorder"></el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
      <div class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
        <div :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
          <div class="cu-tag badge" v-if="item.badge!=0">
            <div v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</div>
          </div>
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list_1',
    data() {
      return {
        modalName: null,
        gridCol: 3,
        cuIconList: [
          {
            cuIcon: 'cardboardfill',
            color: 'red',
            badge: 120,
            name: 'VR'
          }, {
            cuIcon: 'recordfill',
            color: 'orange',
            badge: 1,
            name: '录像'
          }, {
            cuIcon: 'picfill',
            color: 'yellow',
            badge: 0,
            name: '图像'
          }, {
            cuIcon: 'noticefill',
            color: 'olive',
            badge: 22,
            name: '通知'
          }, {
            cuIcon: 'upstagefill',
            color: 'cyan',
            badge: 0,
            name: '排行榜'
          }, {
            cuIcon: 'clothesfill',
            color: 'blue',
            badge: 0,
            name: '皮肤'
          }, {
            cuIcon: 'discoverfill',
            color: 'purple',
            badge: 0,
            name: '发现'
          }, {
            cuIcon: 'questionfill',
            color: 'mauve',
            badge: 0,
            name: '帮助'
          }, {
            cuIcon: 'commandfill',
            color: 'purple',
            badge: 0,
            name: '问答'
          }, {
            cuIcon: 'brandfill',
            color: 'mauve',
            badge: 0,
            name: '版权'
          }],
        gridBorder: false,
      }
    },
    methods: {
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      hideModal(e) {
        this.modalName = null
      },
      Gridchange(e) {
        this.gridCol = e.detail.value
      },
    }
  }
</script>

<style scoped>

</style>
