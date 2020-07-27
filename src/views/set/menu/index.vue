<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="handleCreate" :edit-status="true" menu-no="_views_set_menu_edit">
      <div class="set-menu">
        <div class="set-menu-box">
          <div class="left">
            <div style="margin-bottom: 10px;">
              <!--          <el-button-->
              <!--            class="filter-item"-->
              <!--            icon="el-icon-plus"-->
              <!--            style="margin-left: 0px;"-->
              <!--            type="primary"-->
              <!--            @click="handleAdd"-->
              <!--          >-->
              <!--            新增一级菜单-->
              <!--          </el-button>-->
              <PermissionButton
                menu-no="_views_set_menu_add"
                class-name="filter-item"
                icon="el-icon-plus"
                type="primary"
                name=""
                @click="handleAdd"
              />
              <span style="color: #666666;font-size: 10px;padding-left: 10px;">(菜单可拖拽排序、点击编辑)</span>
            </div>

            <!--default-expand-all-->
            <el-tree
              :data="treeData"
              node-key="id"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
              :destroy-on-close="true"
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              @node-contextmenu="nodeContextmenu"
              @node-click="nodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <el-tooltip class="item" effect="dark" :content="data.menuType" placement="top-start">
                  <i v-if="data.menuType==='目录'" class="el-icon-folder-opened" />
                  <i v-if="data.menuType==='菜单'" class="el-icon-document" />
                  <i v-if="data.menuType==='按钮'" class="el-icon-thumb" />
                </el-tooltip>
                <!--            <span class="tips">{{ node.level }}</span>-->
                <!--            <span>{{ data }}</span>-->
                <span style="margin-left: 5px;">{{ data.name }}</span>
                <span class="btns">
                  <!--              <el-button-->
                  <!--                type="text"-->
                  <!--                size="mini"-->
                  <!--                @click.stop="() => append(data)"-->
                  <!--              >-->
                  <!--                添加-->
                  <!--              </el-button>-->
                  <PermissionButton
                    menu-no="_views_set_menu_add_tree"
                    type="text"
                    size="mini"
                    name=""
                    @click="() => append(data)"
                  />
                  <!--              <el-button-->
                  <!--                v-if="!data.children || data.children.length===0"-->
                  <!--                type="text"-->
                  <!--                style="color: red;"-->
                  <!--                size="mini"-->
                  <!--                @click.stop="() => remove(node, data)"-->
                  <!--              >-->
                  <!--                删除-->
                  <!--              </el-button>-->
                  <PermissionButton
                    v-if="!data.children || data.children.length===0"
                    menu-no="_views_set_menu_remove"
                    type="text"
                    size="mini"
                    name=""
                    @click="() => remove(node, data)"
                  />
                  <!--            <i class="el-icon-circle-plus" @click.stop="() => append(data)"></i>-->
                  <!--            <i style="color: red;margin-left: 5px;" class="el-icon-delete-solid" @click.stop="() => remove(node, data)"></i>-->

                </span>
              </span>
            </el-tree>
          </div>
          <div class="right">
            <div class="btn-set">
              <el-tabs type="card">
                <el-tab-pane :label="(menuItem.name ? menuItem.name + '-':'') + '详细'">

                  <!--              <el-alert-->
                  <!--                title="提示：如果菜单下面存在子菜单，那么该菜单只会被作为目录，不会跳转对应页面"-->
                  <!--                type="warning"-->
                  <!--                show-icon-->
                  <!--              />-->

                  <el-form
                    v-if="menuItem.name"
                    ref="dataForm"
                    v-loading="loading"
                    :model="temp"
                    label-position="right"
                    label-width="140px"
                    style="width: 640px; margin-left:50px;margin-top: 20px;"
                  >
                    <el-form-item label="菜单类型：">
                      <span slot="label">菜单类型
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="目录、菜单会生成系统的菜单结构，不展示在前端请选择按钮类型(注意：目录是不会生成页面，务必正确配置该类型)"
                          placement="top-start"
                        >
                          <i class="el-icon-question" /></el-tooltip>
                        ：
                      </span>
                      <el-radio-group v-model="temp.menuType">
                        <el-radio label="目录">目录</el-radio>
                        <el-radio label="菜单">菜单</el-radio>
                        <el-radio label="按钮">按钮</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item
                      label="名称："
                      prop="name"
                      :rules="[
                        { required: true, message: '请输入名称', trigger: 'blur' }
                      ]"
                    >
                      <el-input v-model="temp.name" placeholder="请输入简短名称" class="filter-item" />
                    </el-form-item>
                    <el-form-item
                      label="编码："
                      prop="menuNo"
                    >
                      <span slot="label">编码
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="菜单和按钮必须配置编码，且必须是唯一标识不能重复！用于权限控制"
                          placement="top-start"
                        >
                          <i class="el-icon-question" /></el-tooltip>
                        ：
                      </span>
                      <el-input
                        v-model="temp.menuNo"
                        placeholder="请输入唯一编码"
                        class="filter-item"
                      />
                    </el-form-item>
                    <el-form-item
                      label="组件映射："
                      prop="menuCode"
                    >
                      <span slot="label">组件映射
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="（配置请咨询管理员,配置前请确认router/urlMap.js文件是否有相应配置）。菜单和绑定页面的按钮约定为页面url 以下划线连接（url为组件的路径）,不绑定页面的按钮约定为 页面编码_按钮标识（如：岗位列表的新增按钮编码为  _views_set_post_add）"
                          placement="top-start"
                        >
                          <i class="el-icon-question" /></el-tooltip>
                        ：
                      </span>
                      <el-input v-model="temp.menuCode" placeholder="请输入组件映射" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="状态：">
                      <el-radio-group v-model="temp.enabled">
                        <el-radio :label="true">正常</el-radio>
                        <el-radio :label="false">禁用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="外部系统：">
                      <el-radio-group v-model="temp.external">
                        <el-radio :label="true">外部系统</el-radio>
                        <el-radio :label="false">内部系统</el-radio>
                      </el-radio-group>
                      <el-alert
                        :closable="false"
                        title="警告："
                        description="谨慎选择 “内部系统” 选项。 选择“内部系统”选项保存后该菜单将只能编辑名称、状态信息。不能删除。"
                        type="error"
                        style="line-height: 18px;"
                        show-icon
                      />
                    </el-form-item>
                    <el-form-item label="菜单端口：">
                      <el-checkbox v-model="port_pc">web端</el-checkbox>
                    </el-form-item>
                    <el-form-item
                      v-if="port_pc"
                      label="URL："
                      :rules="[
                        { required: true, message: '请输入URL', trigger: 'blur' }
                      ]"
                    >
                      <span slot="label">URL
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="内部系统url 约定为 组件路径（注意：URL 不得重复）， 可以试试把编码粘贴这里，失去焦点"
                          placement="top-start"
                        >
                          <i class="el-icon-question" /></el-tooltip>
                        ：
                      </span>
                      <el-input v-model="temp.pcUrl" class="filter-item" @change="autoFormat" />
                    </el-form-item>
                    <el-form-item v-if="port_pc" label="图标：">
                      <el-input v-model="temp.pcIcon" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="菜单端口：">
                      <el-checkbox v-model="port_m">移动端</el-checkbox>
                    </el-form-item>
                    <el-form-item
                      v-if="port_m"
                      label="URL："
                      :rules="[
                        { required: true, message: '请输入名称', trigger: 'blur' }
                      ]"
                    >
                      <el-input v-model="temp.mobileUrl" class="filter-item" />
                    </el-form-item>
                    <el-form-item v-if="port_m" label="图标：" prop="name">
                      <el-input v-model="temp.mobileIcon" class="filter-item" />
                    </el-form-item>
                    <div style="height: 1px;border-bottom: 1px dashed #ccc;margin-bottom: 5px;" />
                    <el-form-item label="是否有数据权限：">
                      <el-radio-group v-model="temp.hasDataPrivilege">
                        <el-radio :label="false">无</el-radio>
                        <el-radio :label="true">有</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="工作流：">
                      <el-select v-model="temp.workflowId" clearable filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <el-dialog
          width="600px"
          :title="textMap[dialogStatus]"
          :visible.sync="dialogFormVisible"
          :before-close="handleClose"
        >
          <!--      <el-alert-->
          <!--        title="提示：如果菜单下面存在子菜单，那么该菜单只会被作为目录，不会跳转对应页面"-->
          <!--        type="warning"-->
          <!--        show-icon-->
          <!--      />-->
          <el-form
            ref="dataForm"
            :model="temp"
            label-position="right"
            label-width="110px"
            style="width: 450px; margin-left:50px;"
          >
            <el-form-item
              v-if="temp.parentName"
              label="上级菜单："
            >
              <span>{{ temp.parentName }}</span>
            </el-form-item>
            <el-form-item label="菜单类型：">
              <span slot="label">菜单类型
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="目录、菜单会生成系统的菜单结构，不展示在前端请选择按钮类型(注意：目录是不会生成页面，务必正确配置该类型)"
                  placement="top-start"
                >
                  <i class="el-icon-question" /></el-tooltip>
                ：
              </span>
              <el-radio-group v-model="temp.menuType">
                <el-radio label="目录">目录</el-radio>
                <el-radio label="菜单">菜单</el-radio>
                <el-radio label="按钮">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="名称："
              prop="name"
              :rules="[
                { required: true, message: '请输入名称', trigger: 'blur' }
              ]"
            >
              <el-input v-model="temp.name" placeholder="请输入简短名称" class="filter-item" />
            </el-form-item>
            <el-form-item
              label="编码："
              prop="menuNo"
            >
              <span slot="label">编码
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="菜单和按钮必须配置编码，且必须是唯一标识不能重复！用于权限控制"
                  placement="top-start"
                >
                  <i class="el-icon-question" /></el-tooltip>
                ：
              </span>
              <el-input v-model="temp.menuNo" placeholder="请输入唯一编码" class="filter-item" />
            </el-form-item>
            <el-form-item
              label="组件映射："
              prop="menuNo"
            >
              <span slot="label">组件映射
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="（配置请咨询管理员,配置前请确认router/urlMap.js文件是否有相应配置）。菜单和绑定页面的按钮约定为页面url 以下划线连接（url为组件的路径）,不绑定页面的按钮约定为 页面编码_按钮标识（如：岗位列表的新增按钮编码为  _views_set_post_add）"
                  placement="top-start"
                >
                  <i class="el-icon-question" /></el-tooltip>
                ：
              </span>
              <el-input v-model="temp.menuCode" placeholder="请输入组件映射" class="filter-item" />
            </el-form-item>
            <el-form-item label="状态：">
              <el-radio-group v-model="temp.enabled">
                <el-radio :label="true">正常</el-radio>
                <el-radio :label="false">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="外部系统：">
              <el-radio-group v-model="temp.external">
                <el-radio :label="true">外部系统</el-radio>
                <el-radio :label="false">内部系统</el-radio>
              </el-radio-group>
              <el-alert
                :closable="false"
                title="警告："
                description="谨慎选择 “内部系统” 选项。 选择“内部系统”选项保存后该菜单将只能编辑名称、状态信息。不能删除。"
                type="error"
                style="line-height: 18px;"
              />
            </el-form-item>
            <el-form-item label="菜单端口：">
              <el-checkbox v-model="port_pc">web端</el-checkbox>
            </el-form-item>
            <el-form-item
              v-if="port_pc"
              label="URL："
              :rules="[
                { required: true, message: '请输入URL', trigger: 'blur' }
              ]"
            >
              <span slot="label">URL
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="内部系统url 约定为 组件路径（注意：URL 不得重复）, 可以试试把编码粘贴这里，失去焦点。"
                  placement="top-start"
                >
                  <i class="el-icon-question" /></el-tooltip>
                ：
              </span>
              <el-input v-model="temp.pcUrl" class="filter-item" @change="autoFormat" />
            </el-form-item>
            <el-form-item v-if="port_pc" label="图标：">
              <el-input v-model="temp.pcIcon" class="filter-item" />
            </el-form-item>
            <el-form-item label="菜单端口：">
              <el-checkbox v-model="port_m">移动端</el-checkbox>
            </el-form-item>
            <el-form-item
              v-if="port_m"
              label="URL："
              :rules="[
                { required: true, message: '请输入名称', trigger: 'blur' }
              ]"
            >
              <el-input v-model="temp.mobileUrl" class="filter-item" />
            </el-form-item>
            <el-form-item v-if="port_m" label="图标：" prop="name">
              <el-input v-model="temp.mobileIcon" class="filter-item" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <!--        <el-button @click="dialogFormVisible = false">-->
            <!--          取消-->
            <!--        </el-button>-->
            <el-button style="width: 180px" type="primary" @click="dialogStatus==='create'?createData():updateData()">
              保存
            </el-button>
          </div>
        </el-dialog>
      </div>
    </y-detail-page-layout>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import PermissionButton from '@/components/PermissionButton/PermissionButtonStop'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'Index',
    components: {
      Breadcrumb,
      PermissionButton,
      YDetailPageLayout,
    },
    data() {
      return {
        loading: false,
        textMap: {
          update: '编辑',
          create: '新增'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          name: '',
          menuNo: '',
          menuCode: '',
          enabled: true,
          external: false,
          pcUrl: '',
          pcIcon: '',
          mobileUrl: '',
          mobileIcon: '',
          menuType: '目录',
          workflowId: '',
          hasDataPrivilege: false,
        },
        port_pc: false,
        port_m: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        btnTableData: [],
        options: [],
        menuItem: {},
        treeListData: [],
      }
    },
    created() {
      this.getMenuTreeData()
      this.getWorkFlow()
    },
    methods: {
      autoFormat(val) {
        this.temp.pcUrl = val.replace(/_/g, '/')
      },
      // traverseTree(data, newTree) {
      //   const dataTree = JSON.parse(JSON.stringify(data))
      //
      //   function tree(da) {
      //     da.forEach(item => {
      //       item.label = item.name
      //       if (item.children && item.children.length > 0) {
      //         tree(item.children)
      //       }
      //     })
      //   }
      //   tree(dataTree)
      //   return dataTree
      // },
      getMenuTreeData() {
        console.log(this.$api)
        this.$api.menuSet.menuTree().then(res => {
          this.treeData = res.data
          const list = []

          function treeMap(data) {
            data.forEach(item => {
              list.push(item)
              if (item.children && item.children.length > 0) {
                treeMap(item.children)
              }
            })
          }

          treeMap(this.treeData)
          this.treeListData = list
        })
      },
      initData() {
        this.temp = {
          name: '',
          menuNo: '',
          menuCode: '',
          enabled: true,
          external: false,
          pcUrl: '',
          pcIcon: '',
          mobileUrl: '',
          mobileIcon: '',
          menuType: '目录',
          workflowId: '',
          hasDataPrivilege: false,
        }
        this.port_pc = false
        this.port_m = false
      },
      getDetail(id, success, error) {
        this.initData()
        this.$api.menuSet.detail(id).then(res => {
          this.temp = res.data
          if (this.temp.pcUrl) {
            this.port_pc = true
          }
          if (this.temp.mobileUrl) {
            this.port_m = true
          }
          success && success()
        }).catch(() => {
          error && error()
        })
      },
      handleDragStart(node, ev) {
        // console.log('drag start', node)
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) { // 拖拽结束时（可能未成功）触发的事件
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) { // 拖拽成功完成时触发的事件
        console.log('tree drop: ', dropNode.label, dropType)
      },
      allowDrop(draggingNode, dropNode, type) { // 	拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
        // console.log(draggingNode, dropNode, type, '放置')
        if (dropNode.data.menuType === '目录') {
          return true
        } else {
          return false
        }
      },
      allowDrag(draggingNode) { // 判断节点能否被拖拽
        if (draggingNode.data.menuType === '按钮') {
          this.$notify({
            title: '警告',
            message: '按钮不可排序',
            type: 'warning'
          })
        }
        return draggingNode.data.menuType !== '按钮'
      },
      nodeContextmenu(event, data, node) {
        console.log(event, data, node)
        // this.dialogFormVisible = true
      },
      nodeClick(data, node, it) {
        console.log(data, node, it)
        this.menuItem = data
        this.loading = true
        this.getDetail(data.id, () => {
          setTimeout(() => {
            this.loading = false
          }, 100)
        })
        if (!data.children || data.children.length === 0) {
          console.log('最后一级')
        }
      },
      append(data) { // 添加菜单
        console.log(data)
        this.handleAdd()
        this.temp.parentId = data.id
        this.temp.parentName = data.name
      },

      remove(node, data) {
        // console.log(node, data)
        this.$confirm(`此操作将删除菜单, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.menuSet.delete(data.id).then(res => {
            this.dialogFormVisible = false
            this.getMenuTreeData()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {})
      },
      handleAdd() {
        this.initData()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            let repeat = false
            this.treeListData.forEach(item => {
              if (item.menuNo === tempData.menuNo || item.pcUrl === tempData.pcUrl) {
                repeat = true
              }
            })
            if (repeat) {
              this.$notify({
                title: '成功',
                message: '唯一键编码或URL 重复！',
                type: 'error',
                duration: 2000
              })
              return
            }
            this.$api.menuSet.add(tempData).then(res => {
              this.dialogFormVisible = false
              this.getMenuTreeData()
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.initData()
            done()
          })
          .catch(_ => {})
      },
      handleCreate() {
        const tempData = Object.assign({}, this.temp)
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            let repeat = false
            this.treeListData.forEach(item => {
              if (item.menuNo === tempData.menuNo || item.pcUrl === tempData.pcUrl) {
                repeat = true
              }
            })
            if (repeat) {
              this.$notify({
                title: '成功',
                message: '唯一键编码或URL 重复！',
                type: 'error',
                duration: 2000
              })
              return
            }
            this.$api.menuSet.edit(tempData).then(res => {
              this.dialogFormVisible = false
              this.getMenuTreeData()
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      getWorkFlow() {
        this.$api.workflow.getList({
          current: 1,
          size: 10000
        }).then(res => {
          this.options = res.data.records
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .set-menu-box {
    display: flex;
    margin: 30px auto;
    border: 1px solid #f0f0f0;

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
