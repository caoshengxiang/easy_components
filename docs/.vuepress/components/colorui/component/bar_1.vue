<template>
  <div class="box">
    <div class="cu-bar tabbar bg-white margin-top">
      <div class="action">
        <div class="cuIcon-cu-img">
          <img src="/tabbar/basics_cur.png">
        </div>
        <div class="text-green">元素</div>
      </div>
      <div class="action">
        <div class="cuIcon-cu-img">
          <img src="/tabbar/component.png">
        </div>
        <div class="text-gray">组件</div>
      </div>
      <div class="action">
        <div class="cuIcon-cu-img">
          <img src="/tabbar/plugin.png">
          <div class="cu-tag badge">99</div>
        </div>
        <div class="text-gray">扩展</div>
      </div>
      <div class="action">
        <div class="cuIcon-cu-img">
          <img src="/tabbar/about.png">
          <div class="cu-tag badge"></div>
        </div>
        <div class="text-gray">关于</div>
      </div>
    </div>
    <div class="cu-bar tabbar margin-bottom-xl bg-black margin-top">
      <div class="action text-orange">
        <div class="cuIcon-homefill"></div> 首页
      </div>
      <div class="action text-gray">
        <div class="cuIcon-similar"></div> 分类
      </div>
      <div class="action text-gray">
        <div class="cuIcon-recharge"></div>
        积分
      </div>
      <div class="action text-gray">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="action text-gray">
        <div class="cuIcon-my">
          <div class="cu-tag badge"></div>
        </div>
        我的
      </div>
    </div>
    <div class="cu-bar tabbar margin-bottom-xl bg-white margin-top">
      <div class="action text-green">
        <div class="cuIcon-homefill"></div> 首页
      </div>
      <div class="action text-gray">
        <div class="cuIcon-similar"></div> 分类
      </div>
      <div class="action text-gray add-action">
        <button class="cu-btn cuIcon-add bg-green shadow"></button>
        发布
      </div>
      <div class="action text-gray">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="action text-gray">
        <div class="cuIcon-my">
          <div class="cu-tag badge"></div>
        </div>
        我的
      </div>
    </div>
    <div class="cu-bar tabbar bg-black margin-top">
      <div class="action text-green">
        <div class="cuIcon-homefill"></div> 首页
      </div>
      <div class="action text-gray">
        <div class="cuIcon-similar"></div> 分类
      </div>
      <div class="action text-gray add-action">
        <button class="cu-btn cuIcon-add bg-green shadow"></button>
        发布
      </div>
      <div class="action text-gray">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="action text-gray">
        <div class="cuIcon-my">
          <div class="cu-tag badge"></div>
        </div>
        我的
      </div>
    </div>

    <div class="cu-bar bg-white tabbar border shop margin-top">
      <button class="action" open-type="contact">
        <div class="cuIcon-service text-green">
          <div class="cu-tag badge"></div>
        </div>
        客服
      </button>
      <div class="action text-orange">
        <div class="cuIcon-favorfill"></div> 已收藏
      </div>
      <div class="action">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="bg-red submit">立即订购</div>
    </div>

    <div class="cu-bar bg-white tabbar border shop margin-top">
      <button class="action" open-type="contact">
        <div class="cuIcon-service text-green">
          <div class="cu-tag badge"></div>
        </div>
        客服
      </button>
      <div class="action">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="bg-orange submit">加入购物车</div>
      <div class="bg-red submit">立即订购</div>
    </div>

    <div class="cu-bar bg-white tabbar border shop margin-top">
      <button class="action" open-type="contact">
        <div class="cuIcon-service text-green">
          <div class="cu-tag badge"></div>
        </div>
        客服
      </button>
      <div class="action">
        <div class=" cuIcon-shop"></div> 店铺
      </div>
      <div class="action">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="btn-group">
        <button class="cu-btn bg-red round shadow-blur">立即订购</button>
      </div>
    </div>
    <div class="cu-bar bg-white tabbar border shop margin-top">
      <button class="action" open-type="contact">
        <div class="cuIcon-service text-green">
          <div class="cu-tag badge"></div>
        </div> 客服
      </button>
      <div class="action">
        <div class="cuIcon-cart">
          <div class="cu-tag badge">99</div>
        </div>
        购物车
      </div>
      <div class="btn-group">
        <button class="cu-btn bg-orange round shadow-blur">加入购物车</button>
        <button class="cu-btn bg-red round shadow-blur">立即订购</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bar_1'
  }
</script>

<style scoped>
button.action {
  border: 0;
}
</style>
