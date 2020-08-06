<template>
  <div class="level1" @click.stop>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#1890ff"
        :default-active="activeIndex"
        text-color="#ffffff"
        active-text-color="#FFFFFF"
        font-weight="bold"
      >
        <!--        <el-menu-item v-if="$route.path !== '/home/index'" index="99999" @click="handleSelect('/home/index')">首页</el-menu-item>-->
        <!--        <el-menu-item index="99999" @click="handleSelect('/home/index')">首页xx</el-menu-item>-->
        <el-menu-item
          v-for="(item) in permission_menus"
          :key="'id'+item.id"
          :index="'id'+item.id"
          @click="menusClick(item)"
          style="display: flex;align-items: center;position: relative;right: -1px;"
        >
          <i :class="'menu-sprites '+item.pcIcon + '2'" style="transform: scale(0.8);margin-right: 14px;"></i>
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        // activeIndex: 'id' + this.permission_menusLevelList[0].id,
        activeIndex: '',
        activeItem: {},
        treeListData: [],
        levelList: []
      }
    },
    computed: {
      ...mapGetters([
        'permission_menus',
        'permission_menusLevelList'
      ]),
    },
    watch: {
      permission_menus: {
        immediate: true, // immediate选项可以开启首次赋值监听
        deep: true,
        handler(newv) {
          if (newv && newv.length && !this.activeIndex) {
            this.activeItem = newv[0]
            this.activeIndex = 'id' + this.activeItem.id
            this.jumpMenu(this.activeItem)
          }
        }
      }
    },
    created() {
    },
    methods: {
      menusClick(item) {
        this.activeItem = item
        this.jumpMenu(item)
        this.$emit('getStatus', false)
      },
      jumpMenu(mn) {
        // 跳转涉及到 menuTree.vue   PermissionButton.vue    login.vue home/index.vue

        let jumpItem = null

        function tree(data) {
          if (jumpItem) {
            return
          }
          if (data.menuType === '菜单' && data.pcUrl) {
            jumpItem = data
          } else {
            if (data.children && data.children.length > 0) {
              data.children.forEach(item => {
                tree(item)
              })
            }
          }
        }

        tree(mn)
        // console.log(jumpItem, 'jumpItem')

        if (jumpItem && jumpItem.pcUrl) {
          if (jumpItem.external) {
            window.open(jumpItem.pcUrl)
          } else {
            this.$router.push({
              path: jumpItem.pcUrl,
              query: {
                // menuLevel1: this.activeItem.id,
                // menuId: jumpItem.id
              }
            })
          }
        } else {
          console.error(new Error('一级未找到菜单'))
        }
      }
    }
  }
</script>
<style lang="scss">
  .level1 {
    .el-menu-item.is-active {
      background-color: #0079CA !important;
      &:before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 100%;
        background-color: #fff;
        position: absolute;
        left: -1px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import url('../../../styles/menu/menuIcon.css');
  .level1 {
    width: 200px;
    background-color: #1890ff;
    overflow: hidden;
  }
</style>
