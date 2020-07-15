<template>
  <div class="home">
    <div class="menu-box">
      <div class="left">
        <div
          v-for="(item, index) in permission_menus"
          :key="index"
          class="menu-1-item hvr-underline-from-left"
          :class="{active: activeItem.name === item.name}"
          @click="menusClick(item)"
        >
          <svg-icon icon-class="dashboard"/>
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
      <div class="right">
        <div class="title">{{ activeItem.name }}</div>
        <div class="menu-2-box">
          <div
            v-for="(item, index) in activeItem.children"
            :key="index"
            class="menu-2-item hvr-underline-from-center"
            @click="jumpMenu(item)"
          >
            <i class="easy-icon easy-icon-avatar"/> <span class="text">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        activeItem: {}
      }
    },
    computed: {
      ...mapGetters([
        'permission_menus'
      ])
    },
    watch: {
      permission_menus: {
        immediate: true, // immediate选项可以开启首次赋值监听
        deep: true,
        handler(newv) {
          if (newv && newv.length) {
            this.activeItem = newv[0]
          }
        }
      }
    },
    created() {
    },
    methods: {
      menusClick(item) {
        this.activeItem = item
      },
      jumpMenu(item) {
        if (item.menuType === '目录' && item.children && item.children.length > 0) { // todo
          this.$router.push({
            path: item.children[0].pcUrl,
            query: {
              menuLevel1: item.id,
              menuId: item.children[0].id
            }
          })
        } else {
          if (item.external) {
            window.open(item.pcUrl)
          } else {
            this.$router.push({ path: item.pcUrl })
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    background-color: #f5f5f5;
    min-height: calc(100vh - 60px);
    min-width: 1200px;

    .menu-box {
      display: flex;
      background-color: #ffffff;
      margin: 0 50px 20px 50px;
      padding: 20px 0;

      .left {
        width: 240px;

        .menu-1-item {
          display: flex;
          align-items: center;
          color: #666666;
          width: 190px;
          height: 45px;
          font-weight: 500;
          color: rgba(101, 101, 101, 1);
          padding-left: 25px;
          font-size: 16px;
          cursor: pointer;
          padding-right: 10px;

          &.active {
            color: #ffffff;
            background: linear-gradient(90deg, rgba(0, 108, 255, 1), rgba(0, 168, 255, 1));
            border-radius: 0 10px 10px 0;
          }

          .text {
            margin-left: 10px;
          }
        }
      }

      .right {
        flex: 1;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 35px;
          margin-bottom: 8px;

          &::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 16px;
            background: rgba(1, 141, 237, 1);
            margin-right: 10px;
            position: relative;
            top: 2px;
          }
        }

        .menu-2-box {
          display: flex;
          flex-wrap: wrap;
        }

        .menu-2-item {
          display: flex;
          align-items: center;
          color: #656565;
          font-size: 16px;
          width: 230px;
          height: 101px;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          padding-left: 20px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

          .text {
            margin-left: 16px;
          }
        }
      }
    }
  }
</style>
