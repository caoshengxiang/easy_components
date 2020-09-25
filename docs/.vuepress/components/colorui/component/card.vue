<template>
  <div style="width: 100%">
    <div class="cu-bar bg-white solid-bottom">
      <div class="action">
        <span class="cuIcon-titles text-orange"></span> 案例类卡片
      </div>
      <div class="action">
        <el-switch v-model="isCard"></el-switch>
      </div>
    </div>
    <div class="cu-card case" :class="isCard?'no-card':''">
      <div class="cu-item shadow">
        <div class="image">
          <img src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
                 mode="widthFix"></img>
          <div class="cu-tag bg-blue">史诗</div>
          <div class="cu-bar bg-shadeBottom"> <span class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</span></div>
        </div>
        <div class="cu-list menu-avatar">
          <div class="cu-item">
            <div class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></div>
            <div class="content flex-sub">
              <div class="text-grey">正义天使 凯尔</div>
              <div class="text-gray text-sm flex justify-between">
                十天前
                <div class="text-gray text-sm">
                  <span class="cuIcon-attentionfill margin-lr-xs"></span> 10
                  <span class="cuIcon-appreciatefill margin-lr-xs"></span> 20
                  <span class="cuIcon-messagefill margin-lr-xs"></span> 30
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cu-bar bg-white solid-bottom" :class="isCard?'margin-top':''">
      <div class="action">
        <span class="cuIcon-titles text-orange "></span> 动态类卡片
      </div>
      <div class="action">
        <el-switch v-model="isCard"></el-switch>
      </div>
    </div>
    <div class="cu-card dynamic" :class="isCard?'no-card':''">
      <div class="cu-item shadow">
        <div class="cu-list menu-avatar">
          <div class="cu-item">
            <div class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></div>
            <div class="content flex-sub">
              <div>凯尔</div>
              <div class="text-gray text-sm flex justify-between">
                2019年12月3日
              </div>
            </div>
          </div>
        </div>
        <div class="text-content">
          折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
        </div>
        <div class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
          <div class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
                v-for="(item,index) in isCard?9:1" :key="index">
          </div>
        </div>
        <div class="text-gray text-sm text-right padding">
          <span class="cuIcon-attentionfill margin-lr-xs"></span> 10
          <span class="cuIcon-appreciatefill margin-lr-xs"></span> 20
          <span class="cuIcon-messagefill margin-lr-xs"></span> 30
        </div>

        <div class="cu-list menu-avatar comment solids-top">
          <div class="cu-item">
            <div class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></div>
            <div class="content">
              <div class="text-grey">莫甘娜</div>
              <div class="text-gray text-content text-df">
                凯尔，你被自己的光芒变的盲目。
              </div>
              <div class="bg-grey padding-sm radius margin-top-sm  text-sm">
                <div class="flex">
                  <div>凯尔：</div>
                  <div class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</div>
                </div>
              </div>
              <div class="margin-top-sm flex justify-between">
                <div class="text-gray text-df">2018年12月4日</div>
                <div>
                  <span class="cuIcon-appreciatefill text-red"></span>
                  <span class="cuIcon-messagefill text-gray margin-left-sm"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="cu-item">
            <div class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></div>
            <div class="content">
              <div class="text-grey">凯尔</div>
              <div class="text-gray text-content text-df">
                妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
              </div>
              <div class="bg-grey padding-sm radius margin-top-sm  text-sm">
                <div class="flex">
                  <div>莫甘娜：</div>
                  <div class="flex-sub">如果不能立足于大地，要这双脚又有何用?</div>
                </div>
              </div>
              <div class="margin-top-sm flex justify-between">
                <div class="text-gray text-df">2018年12月4日</div>
                <div>
                  <span class="cuIcon-appreciate text-gray"></span>
                  <span class="cuIcon-messagefill text-gray margin-left-sm"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cu-bar bg-white solid-bottom margin-top">
      <div class="action">
        <span class="cuIcon-titles text-orange "></span> 文章类卡片
      </div>
      <div class="action">
        <el-switch v-model="isCard"></el-switch>
      </div>
    </div>
    <div class="cu-card article" :class="isCard?'no-card':''">
      <div class="cu-item shadow">
        <div class="title"><div class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</div></div>
        <div class="content">
          <img src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
                 mode="aspectFill"></img>
          <div class="desc">
            <div class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</div>
            <div>
              <div class="cu-tag bg-red light sm round">正义天使</div>
              <div class="cu-tag bg-green light sm round">史诗</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCard: false
      };
    },
    methods: {
    }
  }
</script>

<style>

</style>
