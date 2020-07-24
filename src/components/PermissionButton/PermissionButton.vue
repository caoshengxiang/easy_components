<!--
// 纯操作性的
<PermissionButton menu-no="_views_set_post_edit" type="primary" size="mini" name="编辑" @click="handleUpdate(row)"/>
// 需要获取按钮 数据的. 需要自己做跳转一定注意url 菜单层级参数
<PermissionButton menu-no="_views_set_post_remove" type="danger" size="mini" name="删除" @click="(data) =>{handleDelete(row, data)}"/>
// 纯跳转性的
<PermissionButton menu-no="_views_set_post_auth" type="warning" size="mini" name="权限" :page-jump="true" :page-query="{id: row.id}"/>
-->
<template>
  <el-button
    v-if="show"
    :class="className"
    :icon="icon"
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handle"
  >
    <slot>{{ name || menu.name }}</slot>
  </el-button>
</template>

<script>
  import mixin from '@/VueConfig/mixin'

  export default {
    name: 'PermissionButton',
    mixins: [mixin],
    props: {
      name: { // 按钮名称
        default: '',
        type: String
      },
      menuNo: { // 编号
        default: '',
        type: String
      },
      pageJump: { // 是否只是跳转页面
        default: false,
        type: Boolean
      },
      pageQuery: { // 跳转页面url 需要系带的参数
        default() {
          return {}
        },
        type: Object
      },
      className: {
        default: '',
        type: String
      },
      icon: {
        default: '',
        type: String
      },
      type: {
        default: '',
        type: String
      },
      size: {
        default: '',
        type: String
      },
      plain: {
        default: false,
        type: Boolean
      },
      round: {
        default: false,
        type: Boolean
      },
      circle: {
        default: false,
        type: Boolean
      },
      loading: {
        default: false,
        type: Boolean
      },
      disabled: {
        default: false,
        type: Boolean
      },
      autofocus: {
        default: false,
        type: Boolean
      },
      nativeType: {
        default: '',
        type: String
      },
    },
    data() {
      return {
        menu: null
      }
    },
    computed: {
      show() {
        let dft = false
        this.permissionButtons.forEach(item => {
          if (item.menuNo === this.menuNo) {
            dft = true
            this.menu = item
          }
        })
        return dft
      }
    },
    methods: {
      handle() {
        const qy = {
          menuLevel1: this.$route.query.menuLevel1,
          menuLevel2: this.$route.query.menuLevel2,
          menuLevel3: this.$route.query.menuLevel3,
          menuId: this.menu.id,
          back: this.$route.fullPath
        }
        if (this.pageJump) {
          this.$router.push({
            path: this.menu.pcUrl,
            query: Object.assign({}, qy, this.pageQuery)
          })
        } else {
          this.$emit('click', this.menu)
        }
      },
    }
  }
</script>

<style scoped>

</style>
