# school_admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 文档
#### 1.接口
接口全部放在 api 目录 得module 下， 可以单模块import 使用 也可以全局使用 this.$api.文件名.function
>添加一个模块，只需要在api/modules/目录下 添加一个js 文件即可工程化引入

#### 2.项目图标
直接将png 和 svg 图标放入 /src/icons 下得对应目录。 访问http://localhost:9527/#/icons 即可查看，点击复制使用.支持svg,png,element图标以及base64、网络地址
>图标做了工程化管理，

#### 3. 代码质量
使用eslint 标准风格，本地代码不符合要求禁止提交。
```
/* eslint-disable */ 单文件禁用
/* eslint-disable no-new */ 
/* eslint-disable-next-line */ 下一行
当前行校验 some code // eslint-disable-line

 /* eslint-disable */ 一部分代码 /* eslint-enable */
```
rule规则修改还是在 .eslintrc.js

#### 4. ico 修改直接修改public/favicon.ico 图标

#### 5. 目录说明
```
   -public
   -src
        -api // 接口定义
        -assets
        -components
        -icons
        -layout // router-view得工作，布局性得组件
        -router
        -store
        -styles
        -utils // 工具函数
        -vendor
        -views
        -VueConfig // 这个目录主要是简化main.js ，作为统一vue 三方引入入口
            -mixin 用户及常用数据 加入mixin
            -prototype 挂载vue 全局 prototype
            -globalComponents 三方全局挂在的组件
            -directive
            -filters
            -styles 三方的
        App.vue
        main.js
        settings.js // 全局性设置定义
``` 
#### 6. 权限


#### 7. 禁用调试功能
在main.js 的头部调用

### 8. 全局引入
    * element
    * 接口 this.$api.文件名.function
    * this.$moment
    * this.$qs
    * this.$vueCookies
    * this.$webStorage
    
### 9. mixin
    * 用户信息 userInfo
    

#### 999.开发注意
       1. 设计审批的新增编辑页面 都新开页面 使用弹窗， 需要 从审批哪里调整回来查看详情
       1.  列表查询 统一 点击搜索时查询，查询条件多的列表需要加一个重置按钮
       1. 移动端涉及到导入导出的都去掉
       1. vue style 要加 scoped， 不能加得情况也必须有命名空间。避免污染其他页面