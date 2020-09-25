<template>
	<div>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<div class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<div class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @click="TabSelect"
				 :data-id="index">
					Tab-{{item.name}}
				</div>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<div class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<div class="cu-bar solid-bottom bg-white">
						<div class="action">
							<span class="cuIcon-title text-green"></span> Tab-{{item.name}}</div>
					</div>
					<div class="cu-list menu-avatar">
						<div class="cu-item">
							<div class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></div>
							<div class="content">
								<div class="text-grey">凯尔</div>
								<div class="text-gray text-sm flex">
									<span class="text-cut">
										<span class="cuIcon-infofill text-red  margin-right-xs"></span>
										我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
									</span> </div>
							</div>
							<div class="action">
								<div class="text-grey text-xs">22:20</div>
								<div class="cu-tag round bg-grey sm">5</div>
							</div>
						</div>
						<div class="cu-item">
							<div class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
								<div class="cu-tag badge">99+</div>
							</div>
							<div class="content">
								<div class="text-grey">
									<span class="text-cut">瓦洛兰之盾-塔里克</span>
									<div class="cu-tag round bg-orange sm">战士</div>
								</div>
								<div class="text-gray text-sm flex">
									<span class="text-cut">
										塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
									</span>
								</div>
							</div>
							<div class="action">
								<div class="text-grey text-xs">22:20</div>
								<div class="cuIcon-notice_forbid_fill text-gray"></div>
							</div>
						</div>
						<div class="cu-item ">
							<div class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></div>
							<div class="content">
								<div class="text-pink"><span class="text-cut">莫甘娜</span></div>
								<div class="text-gray text-sm flex"> <span class="text-cut">凯尔，你被自己的光芒变的盲目！</span></div>
							</div>
							<div class="action">
								<div class="text-grey text-xs">22:20</div>
								<div class="cu-tag round bg-red sm">5</div>
							</div>
						</div>
						<div class="cu-item grayscale">
							<div class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></div>
							<div class="content">
								<div><span class="text-cut">伊泽瑞尔</span>
									<div class="cu-tag round bg-orange sm">断开连接...</div>
								</div>
								<div class="text-gray text-sm flex"> <span class="text-cut"> 等我回来一个打十个</span></div>
							</div>
							<div class="action">
								<div class="text-grey text-xs">22:20</div>
								<div class="cu-tag round bg-red sm">5</div>
							</div>
						</div>
						<div class="cu-item cur">
							<div class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
								<div class="cu-tag badge"></div>
							</div>
							<div class="content">
								<div>
									<span class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</span>
									<div class="cu-tag round bg-orange sm">6人</div>
								</div>
								<div class="text-gray text-sm flex">
									<span class="text-cut"> 伊泽瑞尔：<span class="cuIcon-locationfill text-orange margin-right-xs"></span> 传送中...</span></div>
							</div>
							<div class="action">
								<div class="text-grey text-xs">22:20</div>
								<div class="cuIcon-notice_forbid_fill text-gray"></div>
							</div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
