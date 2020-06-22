<template>
  <div class="navbar" style="background-color: #2A8FE3">
    <div class="logclass">
      <img src="../../assets/log1.png" style="height: 50px;margin-top: 5px;margin-left: 10px">
    </div>
    <div class="titleDiv">教师端管理平台</div>
    <el-menu
      router
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(42,143,227,1)"
      text-color="#fff"
      active-text-color="#ffd04b"
      font-weight="bold"
      style="float: left">
      <el-menu-item index="/dormitory/index">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">宿舍管理</template>
        <el-menu-item index="/dormitory/index" >宿舍列表</el-menu-item>
        <el-menu-item index="/dormitory/classRecord" >班级宿舍考核统计</el-menu-item>
        <el-menu-item index="/dormitory/checkIndex" >宿舍考核</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">其他菜单</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/workflow/design">审批流管理</el-menu-item>
    </el-menu>
    <div class="right-menu" background-color="rgba(42,143,227,1)">
      <!--  <template v-if="device!=='mobile'">
                 <search id="header-search" class="right-menu-item" />

             <error-log class="errLog-container right-menu-item hover-effect" />

             <screenfull id="screenfull" class="right-menu-item hover-effect" />

                 <el-tooltip content="Global Size" effect="dark" placement="bottom">-->
        <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>

      </template>-->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" />
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
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  .logclass{
    width:39px;
    height:26px;
    padding-left: 10px;
    float: left;
    margin-right: 20px;
  }
  .titleDiv{
    margin-top: 22px;
    margin-right: 50px;
    width:200px;
    height:14px;
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:13px;
    float: left;
    letter-spacing:3px;
  }
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

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
