<template>
  <div class="home">
    <div class="menu-box">
      <div class="left">
        <div
          v-for="(item, index) in menus"
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
            <i class="icon icon-avatar"/> <span class="text">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        /*
        * icon 图标
        * name 名称
        * url 路由地址
        * external 是否是外部系统  true: 是。默认false,可以不写
        * */
        menus: [
          {
            id: 1,
            icon: '',
            name: '综合设置',
            children: [{
              id: 11,
              icon: '',
              name: '系统设置',
              children: [{
                id: 101,
                icon: '',
                name: '菜单设置',
                url: '/set/menu',
                external: false // 外部系统
              }, {
                id: 102,
                icon: '',
                name: '岗位管理',
                url: '/set/post'
              }, {
                id: 103,
                icon: '',
                name: '数据字典',
                url: '/set/data'
              }, {
                id: 104,
                icon: '',
                name: '基础信息',
                url: '/set/info'
              }, {
                id: 105,
                icon: '',
                name: '教学相关',
                url: '/set/teaching'
              }, {
                id: 106,
                icon: '',
                name: '系统配置',
                url: '/set/cof'
              }, {
                id: 107,
                icon: '',
                name: '四级菜单',
                url: '/set/cof',
                children: [
                  {
                    id: 1001,
                    icon: '',
                    name: 'baidu',
                    url: 'http://www.baidu.com',
                    external: true, // 外部系统
                    children: null
                  }
                ]
              }]
            }, {
              id: 12,
              icon: '',
              name: 'baidu',
              url: 'http://www.baidu.com',
              external: true, // 外部系统
              children: null
            }]
          },
          {
            id: 2,
            icon: '',
            name: '学生管理',
            children: [
              {
                id: 21,
                icon: '',
                name: '宿舍管理',
                children: [{
                  id: 201,
                  icon: '',
                  name: '宿舍列表',
                  url: '/dormitory/index'
                }, {
                  id: 202,
                  icon: '',
                  name: '班级宿舍考核统计',
                  url: '/dormitory/classRecord'
                }, {
                  id: 203,
                  icon: '',
                  name: '宿舍考核',
                  url: '/dormitory/checkIndex'
                }]
              }
            ]
          },
          {
            id: 3,
            icon: '',
            name: '人事办公',
            children: []
          },
          {
            id: 4,
            icon: '',
            name: '德育管理',
            children: []
          },
          {
            id: 5,
            icon: '',
            name: '实习实训',
            children: []
          },
          {
            id: 6,
            icon: '',
            name: '教务管理',
            children: []
          },
          {
            id: 7,
            icon: '',
            name: '教学诊改数据中心',
            children: []
          }
        ],
        activeItem: null
      }
    },
    created() {
      this.activeItem = this.menus[0]
      this.$webStorage.setItem('menus', this.menus)
    },
    methods: {
      menusClick(item) {
        this.activeItem = item
      },
      jumpMenu(item) {
        if (item.children && item.children.length) {
          this.$router.push({
            path: item.children[0].url,
            query: {
              parentMenuId: item.id
            }
          })
        } else {
          if (item.external) {
            window.open(item.url)
          } else {
            this.$router.push({ path: item.url })
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
      margin: 0px 50px 20px 50px;
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
            border-radius: 0px 10px 10px 0px;
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
