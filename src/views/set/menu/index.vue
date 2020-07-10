<template>
  <div class="set-menu">
    <div class="set-menu-box">
      <div class="left">
        <div style="margin-bottom: 10px;">
          <el-button
            class="filter-item"
            icon="el-icon-plus"
            style="margin-left: 0px;"
            type="primary"
            @click="handleAdd"
          >
            新增一级菜单
          </el-button>
          <span style="color: #666666;font-size: 10px;padding-left: 10px;">(菜单可拖拽排序、点击编辑)</span>
        </div>

        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          draggable
          :props="defaultProps"
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
            <span style="margin-left: 5px;">{{ node.label }}</span>
            <span class="btns">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => append(data)"
              >
                添加
              </el-button>
              <el-button
                v-if="!data.children || data.children.length===0"
                type="text"
                style="color: red;"
                size="mini"
                @click.stop="() => remove(node, data)"
              >
                删除
              </el-button>
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

              <el-alert
                title="提示：如果菜单下面存在子菜单，那么该菜单只会被作为目录，不会跳转对应页面"
                type="warning"
                show-icon
              />

              <el-form
                v-if="menuItem.name"
                ref="dataForm"
                v-loading="loading"
                :disabled="type!=='add'"
                :model="temp"
                label-position="right"
                label-width="140px"
                style="width: 640px; margin-left:50px;margin-top: 20px;"
              >
                <el-form-item label="菜单类型：">
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
                  <el-input v-model="temp.name" :disabled="type!=='add'" placeholder="请输入简短名称" class="filter-item" />
                </el-form-item>
                <el-form-item
                  label="编码："
                  prop="menuNo"
                >
                  <el-input v-model="temp.menuNo" :disabled="type!=='add'" placeholder="请输入唯一编码" class="filter-item" />
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
                    v-if="type==='add'"
                    :closable="false"
                    title="警告："
                    description="谨慎选择 “内部系统” 选项。 选择“内部系统”选项保存后该菜单将只能编辑名称、状态信息。不能删除。"
                    type="error"
                    style="line-height: 18px;"
                    show-icon
                  />
                </el-form-item>
                <el-form-item label="菜单端口：">
                  <el-checkbox v-model="port_pc" :disabled="type!=='add'">web端</el-checkbox>
                </el-form-item>
                <el-form-item
                  v-if="port_pc"
                  label="URL："
                  :rules="[
                    { required: true, message: '请输入URL', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="temp.pcUrl" :disabled="type!=='add'" class="filter-item" />
                </el-form-item>
                <el-form-item v-if="port_pc" label="图标：">
                  <el-input v-model="temp.pcIcon" :disabled="type!=='add'" class="filter-item" />
                </el-form-item>
                <el-form-item label="菜单端口：">
                  <el-checkbox v-model="port_m" :disabled="type!=='add'">移动端</el-checkbox>
                </el-form-item>
                <el-form-item
                  v-if="port_m"
                  label="URL："
                  :rules="[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="temp.mobileUrl" :disabled="type!=='add'" class="filter-item" />
                </el-form-item>
                <el-form-item v-if="port_m" label="图标：" prop="name">
                  <el-input v-model="temp.mobileIcon" :disabled="type!=='add'" class="filter-item" />
                </el-form-item>
                <div style="height: 1px;border-bottom: 1px dashed #ccc;margin-bottom: 5px;" />
                <el-form-item label="权限按钮：">
                  <div>
                    <el-button v-if="type==='add'" type="success">添加</el-button>
                  </div>
                  <el-table
                    :data="btnTableData"
                    stripe
                    style="width: 500px"
                  >
                    <el-table-column
                      prop="name"
                      label="按钮名称"
                    />
                    <el-table-column
                      prop="num"
                      label="按钮编码"
                    />
                    <el-table-column
                      prop="page"
                      label="关联页面"
                    />
                    <el-table-column label="操作" width="160">
                      <template slot-scope="scope">
                        <el-button v-if="type==='add'" size="mini" type="text">编辑</el-button>
                        <el-button v-if="type==='add'" style="color: red;" size="mini" type="text">删除</el-button>
                        <el-button v-if="type==='add'" size="mini" type="text" @click="handleAdd">关联页面</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
                <el-form-item label="是否有数据权限：">
                  <el-radio-group v-model="temp.radio" :disabled="type!=='add'">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="2">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="工作流：">
                  <el-select v-model="temp.value" clearable placeholder="请选择" :disabled="type!=='add'">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <div
            v-if="menuItem.name"
            style="text-align: center;margin-top: 30px;position: absolute;right: 20px;top: -20px;"
          >
            <el-button
              v-if="type=='detail'"
              class="filter-item download-button"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="type='add'"
            >
              编辑
            </el-button>
            <el-button
              v-if="type=='add'"
              class="filter-item download-button"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="type='detail'"
            >
              取消
            </el-button>
            <el-button
              v-if="type=='add'"
              class="filter-item download-button"
              style="margin-left: 10px;margin-right: 0px"
              type="primary"
              icon="el-icon-edit"
              @click="handleCreate"
            >
              保存
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      width="600px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-alert
        title="提示：如果菜单下面存在子菜单，那么该菜单只会被作为目录，不会跳转对应页面"
        type="warning"
        show-icon
      />
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
          <el-input v-model="temp.menuNo" placeholder="请输入唯一编码" class="filter-item" />
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
          <el-input v-model="temp.pcUrl" class="filter-item" />
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
</template>

<script>
  export default {
    name: 'Index',
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
          enabled: true,
          external: true,
          pcUrl: '',
          pcIcon: '',
          mobileUrl: '',
          mobileIcon: '',
          menuType: '目录'
        },
        port_pc: false,
        port_m: false,
        treeData: [
          // {
          //   id: 1,
          //   label: '人事办公',
          //   children: [{
          //     id: 4,
          //     label: '二级 1-1',
          //     children: [{
          //       id: 9,
          //       label: '三级 1-1-1'
          //     }, {
          //       id: 10,
          //       label: '三级 1-1-2'
          //     }]
          //   }]
          // }, {
          //   id: 2,
          //   label: '德育管理',
          //   children: [{
          //     id: 5,
          //     label: '二级 2-1'
          //   }, {
          //     id: 6,
          //     label: '二级 2-2'
          //   }]
          // }, {
          //   id: 3,
          //   label: '综合设置',
          //   children: []
          // }, {
          //   id: 4,
          //   label: '实习实训',
          //   children: []
          // }, {
          //   id: 5,
          //   label: '学生管理',
          //   children: []
          // }, {
          //   id: 6,
          //   label: '教务管理',
          //   children: []
          // }, {
          //   id: 7,
          //   label: '教学质量监测与评价',
          //   children: []
          // }, {
          //   id: 8,
          //   label: '教学诊改数据中心',
          //   children: []
          // }
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        btnTableData: [
          // {
          //   name: '新增',
          //   num: 'btn-1',
          //   page: '是'
          // },
          // {
          //   name: '编辑',
          //   num: 'btn-2',
          //   page: '是'
          // },
          // {
          //   name: '删除',
          //   num: 'btn-3',
          //   page: '否'
          // }
        ],
        options: [
          {
            value: '选项1',
            label: '选项1'
          }, {
            value: '选项2',
            label: '选项2'
          }, {
            value: '选项3',
            label: '选项3'
          }, {
            value: '选项4',
            label: '选项4'
          }, {
            value: '选项5',
            label: '选项5'
          }],
        menuItem: {},
        type: 'detail'
      }
    },
    created() {
      this.getMenuTreeData()
    },
    methods: {
      getMenuTreeData() {
        this.$api.menu.menuTree().then(res => {
          this.treeData = res.data
        })
      },
      initData() {
        this.temp = {
          name: '',
          menuNo: '',
          enabled: true,
          external: true,
          pcUrl: '',
          pcIcon: '',
          mobileUrl: '',
          mobileIcon: '',
          menuType: '目录'
        }
        this.port_pc = false
        this.port_m = false
      },
      getDetail(id, success, error) {
        this.initData()
        this.$api.menu.detail(id).then(res => {
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
        console.log('drag start', node)
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner'
        } else {
          return true
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1
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
        this.$confirm('此操作将删除菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.menu.delete(data.id).then(res => {
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
            this.$api.menu.add(tempData).then(res => {
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
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            this.$api.menu.edit(tempData).then(res => {
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .set-menu-box {
    display: flex;
    width: 1300px;
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
