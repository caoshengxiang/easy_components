<template>
  <div class="navbar">
    <div class="logclass" @mouseenter="setStatus(true)" @click="setStatus(!showLevel1Status)">
      <img style="width: 18px;" src="../../assets/level.png" alt="">
    </div>
    <div class="titleDiv"><img :src="sysCfg.LOGO" style="height: 50px;margin-top: 5px;"></div>
    <div class="right-menu" background-color="rgba(42,143,227,1)">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper-nb">
          <img
            :src="userInfo.avatar || (userInfo.sex === '女'?avatar2:avatar)"
            class="user-avatar"
          >
          <span style="margin-left: 10px;">{{userInfo.name}}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/views/workflow/task/MyTaskList">
            <el-dropdown-item>我的申请</el-dropdown-item>
          </router-link>

          <!--          <router-link to="/home/index">-->
          <!--            <el-dropdown-item>首页</el-dropdown-item>-->
          <!--          </router-link>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img src="../../assets/icon/logout.png" alt="" @click="logout"
           style="width: 16px;position: absolute;top: 22px;right: 20px;cursor: pointer;">
    </div>
    <!--<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import avatar from '../../assets/avatar.png'
  import avatar2 from '../../assets/avatar2.png'

  export default {
    data() {
      return {
        showLevel1Status: false,
        sysCfg: '',
        avatar,
        avatar2,
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.$api.globalConfig.getSysCfg().then(res => {
        this.sysCfg = res.data
      })
    },
    methods: {
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      setStatus(data) {
        this.showLevel1Status = data
        this.$emit('getStatus', this.showLevel1Status)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logclass {
    width: 60px;
    height: 60px;
    background-color: #018EED;
    box-sizing: border-box;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .titleDiv {
    margin-right: 50px;
    margin-left: 17px;
    width: 200px;
    height: 100%;
    float: left;
  }

  .navbar {
    height: 60px;
    overflow: hidden;
    position: relative;
    background-color: #fdffff;
    box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 0.15);

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
            /*background: rgba(0, 0, 0, .025)*/
          }
        }
      }

      .avatar-container {
        margin-right: 80px;

        .avatar-wrapper-nb {
          margin-top: 5px;
          position: relative;
          background-color: #FFFFFF !important;
          display: flex;
          align-items: center;

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
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
