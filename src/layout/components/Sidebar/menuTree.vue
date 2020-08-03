<template>
  <el-submenu v-if="menu.menuType === '目录'" :index="menu.id + ''">
    <template slot="title">
      <i
        :class="iconName"
        style="transform: scale(0.8);margin-right: 14px;"
      />
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="'id'+menu.id" @click="handleRoute(menu)">
    <i
      :class="iconName"
      style="transform: scale(0.8);margin-right: 14px;width: 18px"
    />
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'MenuTree',
    props: {
      menu: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        menuId: this.$route.query.menuId || '',
        iconName: ''
      }
    },
    created() {
      // eslint-disable-next-line eqeqeq
      this.iconName = 'menu-sprites ' + this.menu.pcIcon + (this.menuId == this.menu.id ? '' : '1')
    },
    watch: {
      '$route': {
        deep: true,
        immediate: true,
        handler() {
          // eslint-disable-next-line eqeqeq
          this.iconName = 'menu-sprites ' + this.menu.pcIcon + (this.$route.query.menuId == this.menu.id ? '' : '1')
        }
      }
    },
    methods: {
      handleRoute(menu) {
        // 通过菜单URL跳转至指定路由

        if (menu.external) {
          window.open(menu.pcUrl)
        } else {
          this.$router.push({
            path: menu.pcUrl,
            query: {
              menuLevel1: this.$route.query.menuLevel1,
              // menuLevel2: this.$route.query.menuLevel2,
              // menuLevel3: menu.id,
              menuId: menu.id,
            }
          })
        }
      }
    }
  }
</script>
