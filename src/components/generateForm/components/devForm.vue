<template>
  <div class="form-box-cpt">
    <div style="margin-bottom: 10px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue)"
      >
        添加分页
      </el-button>
      <el-button type="primary" @click="onSubmit">预览及保存表单</el-button>
    </div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(tab, tabIndex) in editableTabs"
        :key="tab.name"
        :label="'第'+(tabIndex+1)+'页'"
        :name="tab.name"
      >
        <el-form label-position="right" label-width="140px"
                 ref="ruleFormDev"
        >
          <div style="height: 520px;overflow-y: scroll">
            <draggable
              v-model="list2[tabIndex]"
              :options="dragOptions2"
              style="min-height: 100px;background-color: #fafafa;"
            >
              <div v-for="(item, index) in list2[tabIndex]" :key="index" class="form-box-item-div"
                   :class="{'form-box-item-inline': item.inline}">
                <render :item="item"></render>
                <div class="operate-box">
                  <i style="color: red;transform: scale(1.6);margin-right: 10px;" class="el-icon-delete"
                     @click="deleteHandle(item, index, tabIndex)"></i>
                  <i style="transform: scale(1.6)" class="el-icon-setting" @click="editHandle(item, index)"></i>
                </div>
              </div>
            </draggable>
          </div>

          <!--<el-form-item size="large">-->
          <!--<el-button type="primary" @click="onSubmit">生成预览表单</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!---->
    <!--项的属性配置-->
    <el-dialog :title="`配置${itemForm.idName}属性`" :visible.sync="dialogFormVisible">
      <el-form :model="itemForm" label-position="right" label-width="100px">
        <el-form-item label="控件名称">
          <el-input v-model="itemForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="占位文字">
          <el-input v-model="itemForm.placeholder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-switch
            v-model="itemForm.checkArr[0].required"
            active-text="必填"
            inactive-text="非必填">
          </el-switch>
        </el-form-item>
        <el-form-item label="校验错误">
          <el-input v-model="itemForm.checkArr[0].message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="行内元素">
          <el-switch
            v-model="itemForm.inline"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <div v-if="itemForm.tag == 'radio' || itemForm.tag == 'checkbox' || itemForm.tag == 'select'">
          <el-form-item label="数据配置">
            <el-tag
              :key="tag.label + index"
              v-for="(tag, index) in itemForm.data"
              closable
              :disable-transitions="false"
              @close="handleClose(itemForm)">
              {{tag.label}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
          </el-form-item>
        </div> <!---->
        <div v-if="itemForm.tag == 'inputNumber'"><!--计数器-->
          <el-form-item label="最小值">
            <el-input v-model.number="itemForm.min" autocomplete="off" type="number" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item label="最大值">
            <el-input v-model.number="itemForm.max" autocomplete="off" type="number" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item label="步数">
            <el-input v-model.number="itemForm.step" autocomplete="off" type="number"
                      style="width: 100px;"></el-input>
            <span>允许定义递增递减的步数控制</span>
          </el-form-item>
          <el-form-item label="精度">
            <el-input v-model.number="itemForm.precision" autocomplete="off" type="number"
                      style="width: 100px;"></el-input>
            <span>值必须是一个非负整数，并且必须大于等于 步数 的小数位数（如：步数为0.01，精度必须大于等于2）</span>
          </el-form-item>
        </div>
        <div v-if="itemForm.tag == 'datePicker'"><!--日期选择-->
          <el-form-item label="时间类型">
            <el-radio-group v-model="itemForm.type" @change="datePickerTypeChange(itemForm)">
              <el-radio label="date">日期选择</el-radio>
              <el-radio label="datetime">日期和时间选择</el-radio>
            </el-radio-group>
          </el-form-item>
          <!---->
          <el-form-item label="时间类型">
            <el-radio-group v-model="itemForm.valueFormat">
              <el-radio v-if="itemForm.type=='date'" label="yyyy-MM-dd"></el-radio>
              <el-radio v-if="itemForm.type=='date'" label="yyyy年M月d日"></el-radio>
              <el-radio v-if="itemForm.type=='date'" label="yyyy.MM.dd"></el-radio>
              <el-radio v-if="itemForm.type=='datetime'" label="yyyy-MM-dd HH"></el-radio>
              <el-radio v-if="itemForm.type=='datetime'" label="yyyy-MM-dd HH:mm"></el-radio>
              <el-radio v-if="itemForm.type=='datetime'" label="yyyy-MM-dd HH:mm:ss"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!--级联cascader-->
        <div v-if="itemForm.tag == 'cascader'">
          <el-form-item label="数据配置">
            <div>
              <span>导入字典库：</span>
              <el-radio-group v-model="itemForm.library" @change="importLibraryHandle(itemForm)">
                <el-radio label="none">自定义</el-radio>
                <el-radio label="area">地区</el-radio>
              </el-radio-group>
              <div style="color: red;">(注意：不支持相同名称)</div>
            </div>
            <div v-if="itemForm.library == 'none'">
              <el-button size="mini" @click="addNodeHandle(itemForm)">+ 添加根节点</el-button>
              <el-tree :data="itemForm.data" node-key="value" :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    添加子项
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
            </span>
              </el-tree>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import area from '../config/area'
  import render from './render'

  export default {
    name: 'devForm',
    data () {
      return {
        list2: [[]],
        dragOptions2: {
          group: 'drag',
          sort: true,
        },
        dialogFormVisible: false,
        itemForm: {
          checkArr: [{}],
        },
        inputVisible: false, // tag 显示控制
        inputValue: '', // tag 输入
        /* 分页 start */
        editableTabsValue: '1',
        editableTabs: [{name: '1'}],
        /* 分页 end */
      }
    },
    props: {
      initList: {
        type: Array,
        default () {
          return []
        },
      },
    },
    watch: {
      initList (d) {
        if (Array.isArray(d[0])) {
          this.list2 = d
          // this.editableTabsValue = (d.length) + ''
          this.editableTabs = d.map((item, index) => {
            return {
              name: (index + 1) + '',
            }
          })
        } else { // 以前一维数组兼容处理
          this.list2 = d ? [d] : []
        }
      },
    },
    components: {
      draggable,
      render,
    },
    methods: {
      onSubmit () {
        let configList = JSON.parse(JSON.stringify(this.list2))
        configList.forEach((item) => {
          item.forEach(vaItem => {
            vaItem.bindValue = (typeof vaItem.bindValue) === 'string' ? '' : [] // 初始数据
          })
        })
        this.$emit('getData', configList)
      },
      deleteHandle (item, index, tabIndex) {
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.list2[tabIndex].splice(index, 1)
        }).catch(() => {})
      },

      /* 项的配置处理 start */
      editHandle (item, index) {
        this.itemForm = item
        this.dialogFormVisible = true
      },
      //  tag事件
      handleClose (tag, tIndex) {
        this.itemForm.data.splice(tIndex, 1)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.itemForm.data.push({label: inputValue})
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      // 日期配置
      datePickerTypeChange (itemForm) {
        itemForm.bindValue = ''
        if (itemForm.type === 'date') {
          itemForm.valueFormat = 'yyyy-MM-dd'
        } else if (itemForm.type === 'datetime') {
          itemForm.valueFormat = 'yyyy-MM-dd HH:mm:ss'
        }
      },
      //  级联数据配置 树
      append (data) {
        // console.log(data)
        this.$prompt('请输入名称 (注意：不支持相同名称)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,20}$/,
          inputErrorMessage: '20个字符以内',
        }).then(({value}) => {
          // let newChild = {value: value + Math.random(), label: value}
          let newChild = {value: value, label: value}
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          data.children.push(newChild)
        }).catch(() => {
        })
      },
      addNodeHandle (itemForm) { // 添加根节点
        this.$prompt('请输入名称 (注意：不支持相同名称)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,20}$/,
          inputErrorMessage: '20个字符以内',
        }).then(({value}) => {
          // const rootNode = {value: value + Math.random(), label: value}
          const rootNode = {value: value, label: value}
          itemForm.data.push(rootNode)
        }).catch(() => {
        })
      },
      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.value === data.value)
        children.splice(index, 1)
        if (children.length === 0) {
          parent.data.children = null
        }
      },
      importLibraryHandle (itemForm) {
        console.log(itemForm.library)
        switch (itemForm.library) {
          case 'none':
            itemForm.data = []
            break
          case 'area':
            console.log(area)
            itemForm.data = area
            break
          default:
            itemForm.data = []
        }
      },
      /* 项的配置处理 end */

      /* 分页 start */
      addTab (targetName) {
        let pages = this.editableTabs.length + 1
        let newTabName = pages + ''
        this.editableTabs.push({
          name: newTabName,
        })
        this.editableTabsValue = newTabName
        this.list2.push([])
      },
      removeTab (targetName) {
        this.$confirm('删除分页将删除当前分页下的所有配置,确认是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
                this.list2.splice(index, 1)
              }
            })
          }

          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        }).catch(() => {})
      },
      /* 分页 end */
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  /*表单*/
  .form-box-cpt {
    border: 1px solid #ccc;
    padding: 20px;
    max-height: 610px;
    /*overflow-y: scroll;*/
    .form-box-item-div {
      position: relative;
      .operate-box {
        position: absolute;
        z-index: 1000;
        top: 0;
        right: 10px;
        /*display: none;*/
        i {
          cursor: pointer;
        }
      }
      &:hover {
        .operate-box {
          display: inline-block;
        }
      }
    }
    .form-box-item-inline {
      display: inline-block;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .form-box-cpt {

    /*bag 样式*/
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
