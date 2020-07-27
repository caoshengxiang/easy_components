<!--
        // 按钮权限，在需要配置按钮权限得页面引入组件  参入该按编号 menuNo控制权限，如：岗位管理views/set/post/index 的使用
        import PermissionButton from '@/components/PermissionButton/PermissionButton'
        // 纯操作性的 name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_edit" type="primary" size="mini" name="编辑" @click="handleUpdate(row)"/>
        // 需要获取按钮 数据的. 需要自己做跳转一定注意url 菜单层级参数  name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_remove" type="danger" size="mini" name="删除" @click="(data) =>{handleDelete(row, data)}"/>
        // 纯跳转性的  name不写会自动从配置中读取
        <PermissionButton menu-no="_views_set_post_auth" type="warning" size="mini" name="权限" :page-jump="true" :page-query="{id: row.id}"/>

        // 需要阻止冒泡调用 PermissionButtonStop.vue 组件
        import PermissionButton from '@/components/PermissionButton/PermissionButtonStop'

        // 其他实列
        // 1.导入模板下载，导入(menu-no 设置为相同)
                <PermissionButton
                  menu-no="_views_staff_list_import"
                  class-name="filter-item"
                  icon="el-icon-download"
                  name="导入模板下载"
                  @click="exportFile"
                />

                <el-upload
                  class="filter-item"
                  style="display: inline-block;margin-left: 10px;"
                  action=""
                  :before-upload="beforeUpload"
                >
                  <PermissionButton
                    menu-no="_views_staff_list_import"
                    class-name="filter-item"
                    type="primary"
                    icon="el-icon-upload2"
                    name="导入"
                  />
                </el-upload>

        // 2. 图标按钮
                    <PermissionButton
                      menu-no="_views_staff_eduDetail"
                      class-name="filter-item"
                      name=""
                      type="text"
                      :page-jump="true"
                      :page-query="{id: row.id}"
                    >
                      <svg-icon
                        icon-class="edit"
                        style="color: #157ddd;transform: scale(1.5);cursor: pointer;"
                      />
                    </PermissionButton>

        // 3. 新开页面 设置属性 _target 为true
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
      _target: {
        default: false,
        type: Boolean
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
          menuId: this.$route.query.menuId,
          back: this.$route.fullPath
        }
        if (this.pageJump) {
          if (this._target) {
            this.$targetNewPage({
              path: this.menu.pcUrl,
              query: Object.assign({}, qy, this.pageQuery)
            })
          } else {
            this.$router.push({
              path: this.menu.pcUrl,
              query: Object.assign({}, qy, this.pageQuery)
            })
          }
        } else {
          this.$emit('click', this.menu)
        }
      },
    }
  }
</script>

<style scoped>

</style>
