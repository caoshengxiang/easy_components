<template>
  <div class="set-menu">
    <div class="set-menu-box">
      <div class="left">
        <div style="margin-bottom: 10px;">
          <el-button class="filter-item" icon="el-icon-plus" style="margin-left: 0px;" type="primary" @click="handleAdd">
            新增一级菜单
          </el-button>
          <span style="color: #666666;font-size: 10px;padding-left: 10px;">(菜单可拖拽排序、右键编辑)</span>
        </div>

        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @node-contextmenu="nodeContextmenu"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="tips">{{ node.level }}</span>
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
      <div class="right" />
    </div>
    <el-dialog width="600px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="名称："
          prop="name"
          :rules="[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="temp.name" class="filter-item" />
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="temp.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外部系统：">
          <el-radio-group v-model="temp.external">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单端口：">
          <el-checkbox v-model="temp.port_pc">web端</el-checkbox>
        </el-form-item>
        <el-form-item
          v-if="temp.port_pc"
          label="URL："
          :rules="[
            { required: true, message: '请输入URL', trigger: 'blur' }
          ]"
        >
          <el-input v-model="temp.pcURL" class="filter-item" />
        </el-form-item>
        <el-form-item v-if="temp.port_pc" label="图标：">
          <el-input v-model="temp.pcIcon" class="filter-item" />
        </el-form-item>
        <el-form-item label="菜单端口：">
          <el-checkbox v-model="temp.port_m">移动端</el-checkbox>
        </el-form-item>
        <el-form-item
          v-if="temp.port_m"
          label="URL："
          :rules="[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="temp.mUrl" class="filter-item" />
        </el-form-item>
        <el-form-item v-if="temp.port_m" label="图标：" prop="name">
          <el-input v-model="temp.mIcon" class="filter-item" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
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
        textMap: {
          update: '编辑',
          create: '新增'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        temp: {
          id: '',
          name: '',
          status: '',
          external: '',
          port_pc: true,
          pcUrl: '',
          pcIcon: '',
          port_m: false,
          mUrl: '',
          mIcon: ''
        },
        data: [{
          id: 1,
          label: '人事办公',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '德育管理',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '综合设置',
          children: []
        }, {
          id: 4,
          label: '实习实训',
          children: []
        }, {
          id: 5,
          label: '学生管理',
          children: []
        }, {
          id: 6,
          label: '教务管理',
          children: []
        }, {
          id: 7,
          label: '教学质量监测与评价',
          children: []
        }, {
          id: 8,
          label: '教学诊改数据中心',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
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
      },
      append(data) {
        const newChild = {
          id: new Date().getTime(),
          label: 'testtest',
          children: []
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        console.log(node, data)
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      handleAdd() {
        this.temp = Object.assign({}) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
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
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑岗位成功',
              type: 'success',
              duration: 2000
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
    margin: auto;
    padding-top: 30px;

    .left {
      width: 300px;
    }

    .right {
      flex: 1;
      min-height: 500px;
      border: 1px solid #f0f0f0;
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
<style lang="scss">
  .set-menu {
    .el-tree-node__content {
      margin-bottom: 5px;
    }
  }
</style>
