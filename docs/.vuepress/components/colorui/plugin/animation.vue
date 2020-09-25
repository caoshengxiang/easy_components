<template>
	<div>
		<div class="cu-bar bg-white">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> 默认效果
			</div>
		</div>
		<div class="padding-sm">
			<div class="flex flex-wrap justify-around">
				<button class="cu-btn margin-sm basis-sm shadow" :class="['bg-' + item.color,animation==item.name?'animation-' +item.name :'']"
				 @click="Toggle" :data-class="item.name" v-for="(item,index) in list" :key="index">{{item.name}}</button>
			</div>
		</div>
		<div class="cu-bar bg-white">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> 反向动画
			</div>
		</div>

		<div class="padding-sm">
			<div class="flex flex-wrap justify-around">
				<button class="cu-btn animation-reverse margin-sm basis-sm shadow" :class="['bg-' + item.color,animation==item.name+'s'?'animation-' +item.name:'']"
				 @click="Toggle" :data-class="item.name+'s'" v-for="(item,index) in list" :key="index">{{item.name}}</button>
			</div>
		</div>
		<div class="cu-bar bg-white">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> 延迟执行
			</div>
			<div class="action">
				<button class="cu-btn bg-cyan shadow" @click="ToggleDelay">开始执行</button>
			</div>
		</div>

		<div class="padding-sm">
			<div class="flex flex-wrap justify-around">
				<button class="margin-sm basis-sm shadow cu-btn" :class="['bg-' + item.color,toggleDelay?'animation-slide-bottom':'']"
				 :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in list" :key="index">0.{{index+1}}s</button>
			</div>
		</div>
		<div class="cu-bar bg-white">
			<div class="action">
				<span class="cuIcon-title text-orange"></span> Gif动画
			</div>
		</div>
		<div class="margin radius bg-gradual-green shadow-blur">
			<img src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100px"></img>
		</div>
		<div class="margin flex">
			<div class="bg-black flex-sub margin-right radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/loading-black.gif" mode="aspectFit" class="gif-black response" style="height:240px"></img>
			</div>
			<div class="bg-white flex-sub radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:240px"></img>
			</div>
		</div>
		<div class="margin flex">
			<div class="bg-gradual-blue flex-sub margin-right radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/rhomb-black.gif" mode="aspectFit" class="gif-black response" style="height:240px"></img>
			</div>
			<div class="bg-white flex-sub radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/rhomb-white.gif" mode="aspectFit" class="gif-white response" style="height:240px"></img>
			</div>
		</div>
		<div class="margin flex">
			<div class="bg-white flex-sub margin-right radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:240px"></img>
			</div>
			<div class="bg-black flex-sub radius shadow-lg">
				<img src="https://image.weilanwl.com/gif/loading-2.gif" mode="aspectFit" class="gif-black response" style="height:240px"></img>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				animation:'',
				list: [{
						name: 'fade',
						color: 'red'
					},
					{
						name: 'scale-up',
						color: 'orange'
					},
					{
						name: 'scale-down',
						color: 'olive'
					},
					{
						name: 'slide-top',
						color: 'green'
					}, {
						name: 'slide-bottom',
						color: 'cyan'
					},
					{
						name: 'slide-left',
						color: 'blue'
					},
					{
						name: 'slide-right',
						color: 'purple'
					},
					{
						name: 'shake',
						color: 'mauve'
					}
				],
				toggleDelay: false

			};
		},
		methods: {
			Toggle(e) {
				var anmiaton = e.currentTarget.dataset.class;
				this.animation= anmiaton;
				setTimeout(()=>{
					this.animation= '';
				}, 1000)
			},
			ToggleDelay() {
				this.toggleDelay= true;
				setTimeout(()=>{
					this.toggleDelay= false
				}, 1000)
			}
		},
	}
</script>

<style>
	@import "../../../../../public/colorui/animation.css";

	img[class*="gif-"] {
		border-radius: 6px;
		display: block;
	}
</style>
