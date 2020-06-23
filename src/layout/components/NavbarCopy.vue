<template>
  <div class="navbar" style="background-color: #2A8FE3">
    <div class="logclass">
      <img src="../../assets/log1.png" style="height: 50px;margin-top: 5px;margin-left: 10px">
    </div>
    <div class="titleDiv">教师端管理平台</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgba(42,143,227,1)"
      text-color="#fff"
      active-text-color="#ffd04b"
      font-weight="bold"
      style="float: left"
    >
      <el-menu-item v-if="activeIndex !== '/home/index'" index="/home/index" @click="handleSelect('/home/index')">首页</el-menu-item>
      <menu-tree v-for="item in currentMenus" :key="item.id" :menu="item"></menu-tree>
    </el-menu>
    <div class="right-menu" background-color="rgba(42,143,227,1)">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import menuTree from './menuTree'

  export default {
    components: {
      menuTree
    },
    data() {
      return {
        activeIndex: '',
        parentMenuId: null,
        menus: [],
        currentMenus: []
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
      '$route'() {
        this.menus = this.$webStorage.getItem('menus')
        this.parentMenuId = this.$route.query.parentMenuId
        this.activeIndex = this.$route.path
        this.currentMenus = []
        this.getCurrentMenu(this.menus)
      }
    },
    created() {
      this.menus = this.$webStorage.getItem('menus')
      this.parentMenuId = this.$route.query.parentMenuId
      this.activeIndex = this.$route.path
      this.currentMenus = []
      this.getCurrentMenu(this.menus)
    },
    methods: {
      getCurrentMenu(menus) {
        menus = menus || []
        menus.forEach(item => {
          if (parseInt(item.id, 10) === parseInt(this.parentMenuId, 10)) {
            this.currentMenus = item.children
          } else {
            if (item.children && item.children.length) {
              this.getCurrentMenu(item.children)
            }
          }
        })
      },
      handleSelect(url) {
        this.$router.push(url)
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logclass {
    width: 39px;
    height: 26px;
    padding-left: 10px;
    float: left;
    margin-right: 20px;
  }

  .titleDiv {
    margin-top: 22px;
    margin-right: 50px;
    width: 200px;
    height: 14px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 13px;
    float: left;
    letter-spacing: 3px;
  }

  .navbar {
    height: 60px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 10px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
