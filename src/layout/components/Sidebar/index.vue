<template>
  <el-menu
    :default-active="activeIndex"
    background-color="#fff"
    text-color="#333333"
    active-text-color="#338FFF"
    font-weight="bold"
  >
    <!--        <el-menu-item v-if="$route.path !== '/home/index'" index="99999" @click="handleSelect('/home/index')">首页</el-menu-item>-->
    <!--      <el-menu-item index="99999" @click="handleSelect('/home/index')">首页</el-menu-item>-->
    <menu-tree v-for="item in currentMenus" :key="item.id" :menu="item"></menu-tree>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import menuTree from './menuTree'

  export default {
    components: { menuTree },
    data() {
      return {
        activeIndex: '',
        menuLevel1: null,
        menuId: null,
        menus: [],
        currentMenus: [],
        timer: null,
      }
    },
    computed: {
      ...mapGetters([
        'permission_menus',
      ]),
    },
    watch: {
      '$route': {
        immediate: true, // immediate选项可以开启首次赋值监听
        deep: true,
        handler(newv) {
          this.initData()
          if (this.$route.path === '/home/index') {
            //
          } else {
            this.menuLevel1 = this.$route.query.menuLevel1
            this.menuId = this.$route.query.menuId
            this.activeIndex = 'id' + this.menuId
            // this.timer = setInterval(() => {
            //   console.log(1)
            //   if (this.permission_menus && this.permission_menus.length) {
            //     clearInterval(this.timer)
            //     this.getCurrentMenu(this.permission_menus)
            //   }
            // }, 200)
            this.getCurrentMenu(this.permission_menus)
          }
        }
      },
      permission_menus: {
        immediate: true, // immediate选项可以开启首次赋值监听
        deep: true,
        handler(newv) {
          this.menus = newv
          this.currentMenus = []
          this.getCurrentMenu(this.menus)
        }
      }
    },
    created() {
      this.menuLevel1 = this.$route.query.menuLevel1
      this.activeIndex = 'id' + this.menuId
      this.currentMenus = []
      this.getCurrentMenu(this.menus)
    },
    methods: {
      initData() {
        this.activeIndex = ''
        this.menuLevel1 = null
        this.menuId = null
        this.menus = []
        this.currentMenus = []
      },
      getCurrentMenu(menus) {
        console.log(menus)
        menus = menus || []
        menus.forEach(item => {
          if (parseInt(item.id, 10) === parseInt(this.$route.query.menuLevel1, 10)) {
            this.currentMenus = item.children
          }
          // else {
          //   if (item.children && item.children.length && item.menuType === '目录') {
          //     this.getCurrentMenu(item.children)
          //   }
          // }
        })
      },
      handleSelect(url) {
        this.$router.push(url)
      },
    }
  }
</script>
<style lang="scss" scoped>
</style>
