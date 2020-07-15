<template>
  <el-submenu v-if="menu.menuType === '目录'" :index="menu.id + ''">
    <template slot="title">
      <i :class="menu.pcIcon"></i>
      <span slot="title">{{menu.name}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="menu.id+''" @click="handleRoute(menu)">
    <i :class="menu.pcIcon"></i>
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'MenuTree',
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleRoute(menu) {
        // 通过菜单URL跳转至指定路由

        if (menu.external) {
          window.open(menu.url)
        } else {
          this.$router.push({
            path: menu.pcUrl,
            query: {
              menuLevel1: this.$route.query.menuLevel1,
              menuLevel2: this.$route.query.menuLevel2,
              menuLevel3: menu.id,
            }
          })
        }
      }
    }
  }
</script>
