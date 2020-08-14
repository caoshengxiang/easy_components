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
    
### 9. 菜单配置，权限说明
    1. 路由分为两种，有权限、无权限。有权限router 在页面菜单设置配置（但本地要留有router配置备份，如/router/modules_bak 这个备份目录），无权限得写入本地router
    2. 页面菜单设置配置，首先需要在 /router/urlMap.js 做响应配置，urlMap.js 有注释说明，包括一些约定
    3. 按钮权限，在需要配置按钮权限得页面引入组件  参入该按编号 menuNo控制权限，如：岗位管理views/set/post/index 的使用
        ```
        import PermissionButton from '@/components/PermissionButton/PermissionButton'
        // 纯操作性的 name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_edit" type="primary" size="mini" name="编辑" @click="handleUpdate(row)"/>
        // 需要获取按钮 数据的. 需要自己做跳转一定注意url 菜单层级参数  name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_remove" type="danger" size="mini" name="删除" @click="(data) =>{handleDelete(row, data)}"/>
        // 纯跳转性的  name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_auth" type="warning" size="mini" name="权限" :page-jump="true" :page-query="{id: row.id}"/>
        
        // 需要阻止冒泡调用 PermissionButtonStop.vue 组件
        import PermissionButton from '@/components/PermissionButton/PermissionButtonStop'
        
        // 其他实列
        // 1.导入模板下载，导入(menu-no 设置为相同)
                <PermissionButton
                  menu-no="_views_staff_list_import"
                  class-name="filter-item"
                  icon="el-icon-download"
                  name="导入模板下载"
                  @click="exportFile"
                />
                
                <el-upload
                  class="filter-item"
                  style="display: inline-block;margin-left: 10px;"
                  action=""
                  :before-upload="beforeUpload"
                >
                  <PermissionButton
                    menu-no="_views_staff_list_import"
                    class-name="filter-item"
                    type="primary"
                    icon="el-icon-upload2"
                    name="导入"
                  />
                </el-upload>
        
        
        // 2. 图标按钮
                    <PermissionButton
                      menu-no="_views_staff_eduDetail"
                      class-name="filter-item"
                      name=""
                      type="text"
                      :page-jump="true"
                      :page-query="{id: row.id}"
                    >
                      <svg-icon
                        icon-class="edit"
                        style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
                      />
                    </PermissionButton>
        
        ```
    4. 目录是不需要配置url， 按钮分为两种，纯操作的按钮，和需要绑定页面的（需要按菜单来处理，否则会404）
    5. 页面的url参数：记录四个参数，一二三级菜单Id(menuLevel1,menuLevel2,menuLevel3)，当前页面菜单id（使用menuId字段）
       * 【所有页面都要带上四个菜单的参数】
#### 999.开发时注意
       1. 设计审批的新增编辑页面 都新开页面 使用弹窗， 需要 从审批哪里调整回来查看详情
       1. 列表查询 统一 点击搜索时查询，查询条件多的列表需要加一个重置按钮
       1. 移动端涉及到导入导出的都去掉
       1. vue style 要加 scoped， 不能加得情况也必须有命名空间。避免污染其他页面
       1. 项目通用性得页面，可以在 views/DOME/ 下写一些demo方便使用
       1. 主键的 name 命名： 与编码一致（用于 keep-alive缓存） 如：编码为：_views_baseinfo_department_list  那么组件name 为 ViewsBaseinfoDepartmentList
       1. 为了调试方便  编码、url、组件映射 都是 组件在/views 下的路径一致