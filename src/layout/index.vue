<template>
  <div class="layout-index">
    <div :class="{'fixed-header':true}">
      <navbar @getStatus="getStatus" />
    </div>
    <!--    <div class="level-box" v-show="showLevel1Status" @click="showLevel1Status = false">-->
    <!--&lt;!&ndash;    <div class="level-box" @click="showLevel1Status = false">&ndash;&gt;-->
    <!--      <level1 class="anilevel" :class="{'anilevel-open': showLevel1Status, 'anilevel-close': !showLevel1Status}" @getStatus="getStatus"></level1>-->
    <!--    </div>-->
<!--    <el-drawer-->
<!--      :with-header="false"-->
<!--      size="200"-->
<!--      :visible.sync="showLevel1Status"-->
<!--      direction="ltr"-->
<!--    >-->
<!--      <level1 @getStatus="getStatus" />-->
<!--    </el-drawer>-->
    <drawer width="200px" :inner="true" :mask="true" :display.sync="showLevel1Status">
      <level1 @getStatus="getStatus" />
    </drawer>
    <div style="padding-top: 60px;display: flex;">
      <el-scrollbar class="scrollbar-wrapper">
        <sidebar class="side-bar" :class="{'side-bar-close': !sideBarStatus, 'side-bar-open': sideBarStatus }" />
        <span v-if="$route.query.menuId">
          <img
            v-if="sideBarStatus"
            style="position: fixed; left: 185px;top: 50%;width: 15px;z-index: 999;cursor: pointer;"
            src="../assets/icon/side1.png"
            alt=""
            @click="sideBarStatus = false"
          >
          <img
            v-else
            style="position: fixed; left: 0;top: 50%;width: 15px;z-index: 999;cursor: pointer;"
            src="../assets/icon/side2.png"
            alt=""
            @click="sideBarStatus = true"
          >
        </span>
      </el-scrollbar>
      <el-scrollbar style="flex: 1;max-height: calc(100vh - 60px);overflow-y: auto;">
        <tags-view/>
        <app-main />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { AppMain, Navbar, Sidebar, TagsView } from './components'
  import { mapState } from 'vuex'
  import level1 from './components/Sidebar/level1'
  import $ from 'jquery'
  import drawer from './components/drawer'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      Sidebar,
      level1,
      drawer,
      TagsView,
    },
    data() {
      return {
        showLevel1Status: false,
        sideBarStatus: true,
      }
    },
    watch: {
      '$route': {
        deep: true,
        immediate: true,
        handler() {
          if (!this.$route.query.menuId) {
            this.sideBarStatus = false
          }
        }
      },
    },
    computed: {
      ...mapState({}),
      classObj() {
        return {}
      }
    },
    methods: {
      getStatus(data) {
        this.showLevel1Status = data
        if (this.$route.query.menuId) {
          this.sideBarStatus = true
        }
      }
    }
  }
</script>
<style lang="scss">
  .layout-index {
    .el-drawer__wrapper {
      top: 60px !important;
    }
  }
  .v-modal {
    top: 60px !important;
  }
</style>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    /*   width: calc(100% - #{$sideBarWidth});*/
    width: 100%;
    transition: width 0.28s;
  }

  .level-box {
    display: flex;
    position: fixed;
    width: 100vw;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 10001;

    .anilevel {
      transition: all .2s;

      &.anilevel-open {
        width: 200px;
      }
      &.anilevel-close {
        width: 0;
      }
    }
  }

  .side-bar {
    width: 200px;
    transition: all 0.2s;
    max-height: calc(100vh - 60px);

    &.side-bar-close {
      width: 0;
    }

    &.side-bar-open {
      width: 200px;
    }
  }

  .scrollbar-wrapper {
    background-color: #fff;
    height: calc(100vh - 60px);
  }
</style>
