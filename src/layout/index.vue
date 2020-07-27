<template>
  <div style="">
    <div :class="{'fixed-header':true}">
      <navbar @getStatus="getStatus"/>
    </div>
    <!--    <div class="level-box" v-show="showLevel1Status" @click="showLevel1Status = false">-->
    <!--      <level1 @getStatus="getStatus"></level1>-->
    <!--    </div>-->
    <el-drawer
      :with-header="false"
      size="200"
      :visible.sync="showLevel1Status"
      direction="ltr"
    >
      <level1 @getStatus="getStatus"></level1>
    </el-drawer>
    <div style="margin-top: 60px;display: flex;">
      <sidebar style="width: 200px;"/>
      <app-main style="flex: 1;"/>
    </div>
  </div>
</template>

<script>
  import { AppMain, Navbar, Sidebar } from './components'
  import { mapState } from 'vuex'
  import level1 from './components/Sidebar/level1'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      Sidebar,
      level1,
    },
    data() {
      return {
        showLevel1Status: false
      }
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
      }
    }
  }
</script>

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
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.35);
  }
</style>
