<template>
	<div class="bg-gradual-blue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='divModal'?'show':''">

			<div class='padding margin text-center'>
				<div class='cu-btn bg-green lg block shadow radius margin-xl' @click="showModal" data-target="divModal">
					打开抽屉
				</div>
			</div>
			<div class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<div class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<div class="content">
						<span class="cuIcon-github text-grey"></span>
						<span class="text-grey">{{index +1}}</span>
					</div>
				</div>
			</div>

			<div class='padding margin text-center'>
				<div class='cu-btn bg-green lg block shadow radius margin-xl' @click="showModal" data-target="divModal">
					打开抽屉
				</div>
			</div>
		</scroll-view>
		<div class="DrawerClose" :class="modalName=='divModal'?'show':''" @click="hideModal">
			<span class="cuIcon-pullright"></span>
		</div>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='divModal'?'show':''">
			<div class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<div class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<div class="content">
						<span class="cuIcon-github text-grey"></span>
						<span class="text-grey">{{index +1}}</span>
					</div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				modalName:null
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
