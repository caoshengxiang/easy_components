# 使用指导

## 文档使用
>使用参考文档 [https://www.vuepress.cn/](https://www.vuepress.cn/)

## VuePress 问题

1. This may cause things to work incorrectly. Make sure to use the same version for both.
> vue-server-renderer 和 vue 安装相同版本
>

2. 引入element-ui 报错
>Uncaught Error: Cannot find module 'core-js/library/fn/object/assign'
> 解决 yarn add core-js@2
>

3. 使用组件
> .vuepress/components 下组件有目录 如何使用组件 
> 如 animate/hover.vue  => \<animate-hover/>
>

4. core-js 兼容问题
> 1. 写文档时需要@2， `yarn add core-js@2`
> 2. 项目运行需要@3， `yarn add core-js`  安装最新