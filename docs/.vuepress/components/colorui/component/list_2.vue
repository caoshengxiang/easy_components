<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white solid-bottom margin-top">
      <div class="action">
        <span class="cuIcon-title text-orange"></span>
        菜单列表
      </div>
      <div class="action">
        <button class="cu-btn bg-green shadow" @click="showModal" data-target="menuModal">设置</button>
      </div>
    </div>
    <div class="cu-modal" :class="modalName=='menuModal'?'show':''" @click="hideModal">
      <div class="cu-dialog" @click.stop>
        <div class="cu-list menu text-left solid-top">
          <div class="cu-item">
            <div class="content">
              <span class="text-grey">短边框</span>
            </div>
            <div class="action">
<!--              <switch @change="MenuBorder" :class="menuBorder?'checked':''" :checked="menuBorder?true:false"></switch>-->
              <el-switch v-model="MenuBorder"></el-switch>
            </div>
          </div>
          <div class="cu-item">
            <div class="content">
              <span class="text-grey">箭头</span>
            </div>
            <div class="action">
<!--              <switch @change="MenuArrow" :class="menuArrow?'checked':''" :checked="menuArrow?true:false"></switch>-->
              <el-switch v-model="MenuArrow"></el-switch>
            </div>
          </div>
          <div class="cu-item">
            <div class="content">
              <span class="text-grey">卡片</span>
            </div>
            <div class="action">
<!--              <switch @change="MenuCard" :class="menuCard?'checked':''" :checked="menuCard?true:false"></switch>-->
              <el-switch v-model="MenuCard"></el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <span class="cuIcon-circlefill text-grey"></span>
          <span class="text-grey">图标 + 标题</span>
        </div>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <img src="heart.png" class="png" mode="aspectFit">
          <span class="text-grey">图片 + 标题</span>
        </div>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <button class="cu-btn content" open-type="contact">
          <span class="cuIcon-btn text-olive"></span>
          <span class="text-grey">Open-type 按钮</span>
        </button>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
          <span class="cuIcon-discoverfill text-orange"></span>
          <span class="text-grey">Navigator 跳转</span>
        </navigator>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <span class="cuIcon-emojiflashfill text-pink"></span>
          <span class="text-grey">头像组</span>
        </div>
        <div class="action">
          <div class="cu-avatar-group">
            <div class="cu-avatar round sm"
                  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></div>
            <div class="cu-avatar round sm"
                  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></div>
            <div class="cu-avatar round sm"
                  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></div>
            <div class="cu-avatar round sm"
                  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></div>
          </div>
          <span class="text-grey text-sm">4 人</span>
        </div>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <span class="cuIcon-btn text-green"></span>
          <span class="text-grey">按钮</span>
        </div>
        <div class="action">
          <button class="cu-btn round bg-green shadow">
            <span class="cuIcon-upload"></span>
            上传
          </button>
        </div>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <span class="cuIcon-tagfill text-red  margin-right-xs"></span>
          <span class="text-grey">标签</span>
        </div>
        <div class="action">
          <div class="cu-tag round bg-orange light">音乐</div>
          <div class="cu-tag round bg-olive light">电影</div>
          <div class="cu-tag round bg-blue light">旅行</div>
        </div>
      </div>
      <div class="cu-item" :class="menuArrow?'arrow':''">
        <div class="content">
          <span class="cuIcon-warn text-green"></span>
          <span class="text-grey">文本</span>
        </div>
        <div class="action">
          <span class="text-grey text-sm">小目标还没有实现！</span>
        </div>
      </div>
      <div class="cu-item">
        <div class="content padding-tb-sm">
          <div>
            <span class="cuIcon-clothesfill text-blue margin-right-xs"></span>
            多行Item
          </div>
          <div class="text-gray text-sm">
            <span class="cuIcon-infofill margin-right-xs"></span>
            小目标还没有实现！
          </div>
        </div>
        <div class="action">
<!--          <switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>-->
          <el-switch v-model="skin"></el-switch>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'list_2',
    data() {
      return {
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
        modalName: null,
        menuBorder: false,
        menuArrow: false,
        menuCard: false,
        skin: false,
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
