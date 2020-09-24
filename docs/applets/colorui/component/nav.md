# 导航条

<baseComponent-codeBox
  title=""
  description="使用的是小程序scroll-view，所以pc 上不能很好的展示效果，
  为了展示ui效果，背景和图片的scroll-view改为了div标签。"
  onlineLink="">
  <colorui-component-nav_1/>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/colorui/component/nav_1.vue
  </highlight-code>
</baseComponent-codeBox>

1.背景和图标的代码应该如下

```vue
<div class="cu-bar bg-white margin-top solid-bottom">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> 背景
			</div>
		</div>
		<scroll-view scroll-x class="bg-red nav text-center">
			<div class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
				Tab{{index}}
			</div>
		</scroll-view>
		<div class="cu-bar bg-white margin-top solid-bottom">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> 图标
			</div>
		</div>
		<scroll-view scroll-x class="bg-green nav text-center">
			<div class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<span class="cuIcon-camerafill"></span> 数码
			</div>
			<div class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<span class="cuIcon-upstagefill"></span> 排行榜
			</div>
			<div class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				<span class="cuIcon-clothesfill"></span> 皮肤
			</div>
		</scroll-view>
```