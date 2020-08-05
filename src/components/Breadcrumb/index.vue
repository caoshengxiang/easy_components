<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
        <!--        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1"-->
        <!--              class="no-redirect">{{ item.meta.title }}</span>-->
        <!--        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->
        <span
          v-if="index === levelList.length - 1"
          class="no-redirect"
          style="color:#338FFF"
        >{{ item.meta.title }}</span>
        <span v-else class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        levelList: null,
        treeListData: [],
      }
    },
    computed: {
      ...mapGetters(['permission_menus'])
    },
    watch: {
      // $route(route) {
      //   // if you go to the redirect page, do not update the breadcrumbs
      //   if (route.path.startsWith('/redirect/')) {
      //     return
      //   }
      //   this.getBreadcrumb()
      // },
      permission_menus: {
        immediate: true, // immediate选项可以开启首次赋值监听
        deep: true,
        handler(newv) {
          if (newv && newv.length) {
            this.getList(newv)
            this.getBreadcrumb()
          }
        }
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getList(tree) {
        const list = []

        function treeMap(data) {
          data.forEach(item => {
            list.push(item)
            if (item.children && item.children.length > 0) {
              treeMap(item.children)
            }
          })
        }

        treeMap(tree)
        this.treeListData = list
      },
      getBreadcrumb() {
        // only show routes with meta.title
        // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        // const first = matched[0]
        // // if (!this.isDashboard(first)) {
        // //   matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
        // // }
        // this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)

        // 计算父级
        let matched = []
        let menuId = this.$route.meta.id

        function getMatched(list, menuId) {
          list.forEach(item => {
            // eslint-disable-next-line eqeqeq
            if (menuId == item.id) {
              matched.unshift({
                // path: item.pcUrl?`${item.pcUrl}?menuLevel1=${this.$route.query.menuLevel1}&menuId=${item.id}`:'',
                meta: { title: item.name }
              })
              if (item.parentId) {
                // console.info(item, item.parentId)
                getMatched(list, item.parentId)
              }
            }
          })
        }

        if (this.treeListData.length && this.$route.query.menuId) {
          // console.log(menuId)
          getMatched(this.treeListData, menuId)
        }
        this.levelList = matched
        // console.log(matched, '面包屑')
      },
      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    /*line-height: 50px;*/
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
