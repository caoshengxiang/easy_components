# 代码块

> 1. baseComponent-codeBox 组件即为.vuepress/components/baseComponent/codeBox文件，vuepress会默认把它解析为`baseComponent-codeBox`组件;  title为代码示例标题；description为代码示例说明；onlineLink为在线运行配置的网址
> 2. highlight-code为引入的第三方代码高亮组件，里面包裹的就是上面示例组件的代码, 三个<<< 左侧不能空格
> 3. HelloWord 是 .vuepress/components 下的组件（会自动注册为全局组件）
>
>


<baseComponent-codeBox
  title="按钮类型"
  description="按钮类型通过设置type为primary、success、info、warning、danger、text创建不同样式的按钮，不设置为默认样式。"
  onlineLink="">
  <HelloWorld></HelloWorld>
  <!-- 这里直接设置 引入的展示代码 ；注意引入代码一定不能缩进！！！否则不能生效！-->
  <highlight-code slot="codeText" lang="vue">
<<< @/docs/.vuepress/components/HelloWorld.vue
  </highlight-code>
</baseComponent-codeBox>