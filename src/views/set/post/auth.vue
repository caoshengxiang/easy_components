<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout :save="handleCreate" :edit-status="true">
      <div class="set-menu">
        <div class="set-menu-box">
          <div class="left">
            <div style="margin-bottom: 10px;text-align: right;margin-top: 30px;">
              <!--          <span style="color: #666666;font-size: 10px;padding-left: 10px;">(点击设置权限)</span>-->
            </div>

            <!--default-expand-all-->
            <el-tree
              ref="tree"
              :check-strictly="true"
              :destroy-on-close="true"
              :data="treeData"
              node-key="id"
              show-checkbox
              @check-change="handleCheckChange"
              @node-click="nodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <el-tooltip class="item" effect="dark" :content="data.menuType" placement="top-start">
                  <i v-if="data.menuType==='目录'" class="el-icon-folder-opened"/>
                  <i v-if="data.menuType==='菜单'" class="el-icon-document"/>
                  <i v-if="data.menuType==='按钮'" class="el-icon-thumb"/>
                </el-tooltip>
                <!--            <span class="tips">{{ node.level }}</span>-->
                <!--            <span>{{ data }}</span>-->
                <span style="margin-left: 5px;">{{ data.name }}</span>
              </span>
            </el-tree>
          </div>
          <div class="right">
            <div class="btn-set">
              <el-tabs type="card">
                <el-tab-pane :label="(menuItem.name ? menuItem.name + '-':'') + '权限设置'">
                  <el-form
                    v-if="menuItem.name && menuItem.menuType !== '目录'"
                    ref="dataForm"
                    :model="temp"
                    label-position="right"
                    label-width="140px"
                    style="width: 500px; margin-left:50px;margin-top: 40px;"
                  >
                    <!--                <el-form-item label="按钮配置：">-->
                    <!--                  <el-checkbox-group v-model="temp.btn">-->
                    <!--                    <el-checkbox-->
                    <!--                      v-for="item in menuItem.children"-->
                    <!--                      v-if="item.menuType === '按钮'"-->
                    <!--                      :key="item.id"-->
                    <!--                      :label="item.id"-->
                    <!--                    >{{ item.name }}-->
                    <!--                    </el-checkbox>-->
                    <!--                  </el-checkbox-group>-->
                    <!--                </el-form-item>-->

                    <el-form-item label="是否为学校管理员：" v-if="menuItem.hasDataPrivilege">
                      <el-radio-group v-model="menuItem.dataPrivilege">
                        <el-radio :value="true" label="是"></el-radio>
                        <el-radio :value="false" label="否"></el-radio>
                        <!--                        <el-radio label="班级">班级</el-radio>-->
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </y-detail-page-layout>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'Auth',
    components: {
      Breadcrumb,
      YDetailPageLayout,
    },
    data() {
      return {
        temp: {
          btn: [],
          level: '',
          dataPrivilege: null,
        },
        treeData: [],
        treeListData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        menuItem: {},
        checkedIds: []
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      initData() {
        this.temp = {
          btn: [],
          level: '',
          dataPrivilege: null,
        }
      },

      getDetail() {
        this.$api.postAuth.tree({ postId: this.$route.query.id }).then(res => {
          this.treeData = res.data.filter((item) => { return item.id && item.name })
          const list = []
          const checkeds = []

          function treeMap(data) {
            data.forEach(item => {
              list.push(item)
              if (item.checked) {
                checkeds.push(item.id)
              }
              if (item.children && item.children.length > 0) {
                treeMap(item.children)
              }
            })
          }

          treeMap(this.treeData)
          this.treeListData = list
          this.checkedIds = checkeds
          this.$refs.tree.setCheckedKeys(this.checkedIds)
        })
      },
      setParentCheck(data) { // 获取父节点id数组/修改父节点checked 为true
        const parentChecks = []
        parentChecks.push(data.id)
        data.checked = true

        function tree(data, list) {
          if (data.parentId) {
            list.forEach(item => {
              if (item.id === data.parentId) {
                parentChecks.push(item.id)
                data.checked = true
                if (item.parentId) {
                  tree(item, list)
                }
              }
            })
          }
        }

        tree(data, this.treeListData)
        return parentChecks
      },
      setChildrenCheck(data) { // 取消子节点选中效果，修改子节点checked 为false
        const that = this
        data.checked = false
        that.checkedIds = Array.from(new Set(that.checkedIds)) // 去重
        const index = that.checkedIds.indexOf(data.id)
        that.checkedIds.splice(index, 1)

        const childrenIds = []

        function tree(list) {
          list.forEach(item => {
            // console.log('子菜单', item.name)
            item.checked = false
            childrenIds.push(item.id)
            if (item.children) {
              tree(item.children)
            }
          })
        }

        data.children && tree(data.children)
        // console.log(data.children, '子树', childrenIds)
        return childrenIds
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate, 'check node')
        if (checked === true) {
          const pChecks = this.setParentCheck(data)
          this.checkedIds = this.checkedIds.concat(pChecks)
          this.checkedIds = Array.from(new Set(this.checkedIds)) // 去重
          this.$refs.tree.setCheckedKeys(this.checkedIds)
          // console.log(this.checkedIds, 'id数据')
        } else {
          const childrenIds = this.setChildrenCheck(data)
          this.checkedIds = Array.from(new Set(this.checkedIds)) // 去重
          // childrenIds.forEach(cId => {
          //   const index = this.checkedIds.indexOf(cId)
          //   if (index > -1) {
          //     this.checkedIds.splice(index, 1)
          //   }
          // })
          // console.log(childrenIds, this.checkedIds, 'id数据')
          // this.$refs.tree.setCheckedKeys(this.checkedIds)
        }
      },
      nodeClick(data, node, it) {
        // console.log(data, node, it)
        this.menuItem = data
        if (!data.children || data.children.length === 0) {
          // console.log('最后一级')
        }
      },
      handleCreate() {
        // console.log(this.$refs.tree.getCheckedNodes())
        // console.log(this.$refs.tree.getCheckedKeys())
        // console.log(JSON.stringify({
        //   postId: this.$route.query.id,
        //   permissionTree: JSON.stringify(this.treeData)
        // }))
        this.$api.postAuth.edit({
          postId: this.$route.query.id,
          permissionTree: JSON.stringify(this.treeData)
        }).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.getDetail()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-box {
    width: 1300px;
    margin: auto;
    margin-top: 30px;
  }

  .set-menu-box {
    display: flex;
    margin: 30px auto;
    /*border: 1px solid #f0f0f0;*/

    .left {
      width: 360px;
      padding: 10px;
      border-right: 1px solid #f0f0f0;
    }

    .right {
      flex: 1;
      min-height: 500px;

      .btn-set {
        padding: 10px 10px 30px 10px;
        position: relative;

        .title-line {
          border-bottom: 2px solid #2a8fe3;
          margin-bottom: 20px;
          margin-top: 10px;
        }

        .title {
          background-color: #2a8fe3;
          color: #ffffff;
          padding: 4px 5px;
        }
      }
    }
  }

  .custom-tree-node {
    .tips {
      display: inline-block;
      width: 18px;
      height: 18px;
      text-align: center;
      background-color: #f67220;
      color: #ffffff;
      border-radius: 50%;
    }

    .btns {
      margin-left: 10px;
    }
  }
</style>
<style lang="scss" scoped>
  .set-menu {
    .el-tree-node__content {
      margin-bottom: 5px;
    }
  }
</style>
