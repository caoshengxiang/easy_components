<template>
  <div class="set-menu">
    <div
      class="btn-box"
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
    <div class="set-menu-box">
      <div class="left">
        <div style="margin-bottom: 10px;text-align: right;">
          <!--          <span style="color: #666666;font-size: 10px;padding-left: 10px;">(点击设置权限)</span>-->
        </div>

        <el-tree
          :disabled="type!=='add'"
          ref="tree"
          :data="data"
          node-key="id"
          default-expand-all
          show-checkbox
          @check-change="handleCheckChange"
          @node-click="nodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="tips">{{ node.level }}</span>
            <span style="margin-left: 5px;">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      <div class="right">
        <div class="btn-set">
          <el-tabs type="card">
            <el-tab-pane :label="(menuItem.label ? menuItem.label + '-':'') + '权限设置'">
              <el-form
                v-if="menuItem.label"
                ref="dataForm"
                :model="temp"
                label-position="right"
                label-width="140px"
                style="width: 500px; margin-left:50px;"
              >
                <el-form-item label="按钮配置：">
                  <el-checkbox-group v-model="temp.btn" :disabled="type!=='add'">
                    <el-checkbox :label="1">编辑</el-checkbox>
                    <el-checkbox :label="2">新增</el-checkbox>
                    <el-checkbox :label="3">导入模板下载</el-checkbox>
                    <el-checkbox :label="4">导入</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="数据权限配置：">
                  <el-radio-group v-model="temp.level" :disabled="type!=='add'">
                    <el-radio :label="1">校级</el-radio>
                    <el-radio :label="2">系级</el-radio>
                    <el-radio :label="3">班级</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        temp: {
          btn: [],
          level: '',
        },
        data: [
          {
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
        },
        btnTableData: [
          {
            name: '新增',
            num: 'btn-1'
          },
          {
            name: '编辑',
            num: 'btn-2'
          },
          {
            name: '删除',
            num: 'btn-3'
          }
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
    mounted() {
      this.getDetail()
    },
    methods: {
      initData() {
        this.temp = {
          btn: [],
          level: '',
        }
      },
      getDetail() {
        this.$refs.tree.setCheckedKeys([1, 4, 9])
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      nodeClick(data, node, it) {
        console.log(data, node, it)
        this.menuItem = data
        if (!data.children || data.children.length === 0) {
          console.log('最后一级')
        }
      },
      handleCreate() {
        console.log(this.$refs.tree.getCheckedNodes());
        console.log(this.$refs.tree.getCheckedKeys());
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
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
    width: 1300px;
    margin: auto;
    padding-top: 10px;

    .left {
      width: 360px;
    }

    .right {
      flex: 1;
      min-height: 500px;
      border: 1px solid #f0f0f0;

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
<style lang="scss">
  .set-menu {
    .el-tree-node__content {
      margin-bottom: 5px;
    }
  }
</style>
