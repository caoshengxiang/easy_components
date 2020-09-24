# ColorUI

>目前colorUI官方没有提供使用文档，只能运行提供得项目，在项目中查看源码获取使用方式。这种方式给开发带了部分困扰，因此整理成文档形式方便查阅。

<el-alert
    title="tips："
    type="warning"
    description="colorUI提供得项目是基于uni-app, 所以使用 mpvue 调用微信接口时需要改为 wx. 引入得css文件单位需要修改. 因为colorui是css 库适当修改用于移动端一样可以。文档运行在pc因此使用得是px ,移动端或小程序我是改为vw.为了再pc演示css做了些修改"
    :closable="false"
    show-icon>
  </el-alert>
  
> 修改项：
>1. 单位  upx 改为 px
>2. 页面和css文件view 标签改为 div
>3. 页面和css文件text 标签改为 span 
>4. 事件绑定改为vue 的绑定形式
>5. switch, radio-group等与colorUI 无关的选项使用了elementUi 做为文档辅助功能
>6. block标签改为div
>7. image标签改为src
  
## 前言
ColorUI是一个css库！！！在你引入样式后可以根据class来调用组件，一些含有交互的操作我也有简单写，可以为你开发提供一些思路。插件市场版本如果和更新日志不一样，请移步Github下载。有组件需求或者Bug提交也可以移步到issues。

## 素材
ColorUI在语雀有个群友共同在维护的知识库，里面有一些群友改的模板和UI素材供开发使用哦！
[语雀-ColorUI群资源](https://www.yuque.com/colorui)
 
## 开始使用
下载源码解压，复制根目录的 `/colorui` 文件夹到你的根目录

`App.vue` 引入关键Css `main.css` `icon.css`
```
<style>
    @import "colorui/main.css";
	@import "colorui/icon.css";
	@import "app.css"; /* 你的项目css */
	....
</style>
```

------

## 使用自定义导航栏
导航栏作为常用组件有做简单封装，当然你也可以直接复制代码结构自己修改，达到个性化目的。

`App.vue` 获得系统信息
```
onLaunch: function() {
	uni.getSystemInfo({
		success: function(e) {
			// #ifndef MP
			Vue.prototype.StatusBar = e.statusBarHeight;
			if (e.platform == 'android') {
				Vue.prototype.CustomBar = e.statusBarHeight + 50;
			} else {
				Vue.prototype.CustomBar = e.statusBarHeight + 45;
			};
			// #endif
			// #ifdef MP-WEIXIN
			Vue.prototype.StatusBar = e.statusBarHeight;
			let custom = wx.getMenuButtonBoundingClientRect();
			Vue.prototype.Custom = custom;
			Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// #endif		
			// #ifdef MP-ALIPAY
			Vue.prototype.StatusBar = e.statusBarHeight;
			Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// #endif
		}
	})
},
```

`pages.json` 配置取消系统导航栏
```
"globalStyle": {
	"navigationStyle": "custom"
},
```
复制代码结构可以直接使用，注意全局变量的获取。

使用封装,在`main.js` 引入 `cu-custom` 组件。
```
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
```

`page.vue` 页面可以直接调用了
```
<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	<block slot="backText">返回</block>
	<block slot="content">导航栏</block>
</cu-custom>
```
| 参数       | 作用   |类型    |  默认值 |
| --------   | -----:  |-----:  | :----:  |
| bgColor    | 背景颜色类名 |String  |   ''    |
| isBack     | 是否开启返回 | Boolean |   false |
| bgImage    | 背景图片路径 | String  |  ''     |

| slot块       | 作用   |
| --------   | -----:  |
| backText    | 返回时的文字 | 
| content     | 中间区域 | 
| right    | 右侧区域(小程序端可使用范围很窄！)  | 


------


## 使用自定义Tabbar
这部分暂时没有封装，思路可以参考下我的源码，原理是一个主页面引入多个页面，在主页面进行切换显示。这样可以解决切换时闪烁的问题。


------

更多详细关注[colorUI官网](https://github.com/weilanwl/ColorUI)