<template>
  <div
    v-loading="loading"
    class="workflow-design"
    :element-loading-text="loadingText"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="header clearfix">
      <span class="title">流程设计</span>
      <div class="option-btn">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="danger" @click="resetDesign">重置</el-button>
      </div>
    </div>
    <div
      id="canvas"
      class="disabledUpdateText"
      @click="canvasClick"
      @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event,$event)"
    />
    <e-vue-contextmenu id="contextStyle" ref="ctxshow" @ctx-show="show" @ctx-hide="hide">
      <ul>
        <li v-show="rcContentMenus.indexOf('btn1')>-1" data-id="btn1" @click="save"><i class="el-icon-success" />&nbsp;<span>保存设计</span>
        </li>
        <li v-show="rcContentMenus.indexOf('btn2')>-1" data-id="btn2" @click="addUserTask"><i
          class="el-icon-circle-plus"
        />&nbsp;<span>添加用户步骤</span></li>
        <li v-show="rcContentMenus.indexOf('btn4')>-1" data-id="btn4" @click="editTask"><i class="el-icon-setting" />&nbsp;<span>属性</span>
        </li>
        <li v-show="rcContentMenus.indexOf('btn5')>-1" data-id="btn5" @click="deleteTask"><i class="el-icon-delete" />&nbsp;<span>删除</span>
        </li>
        <li v-show="rcContentMenus.indexOf('btn6')>-1" data-id="btn6" @click="connectLine"><i class="el-icon-share" />&nbsp;<span>连线</span>
        </li>
        <li v-show="rcContentMenus.indexOf('btn7')>-1" data-id="btn7" @click="resetDesign"><i
          class="el-icon-refresh"
        />&nbsp;<span>重置</span></li>
      </ul>
    </e-vue-contextmenu>
    <el-dialog
      :visible.sync="dialogFormVisible"
      center
      :show-close="false"
      :destroy-on-close="true"
    >
      <el-form :model="currentNodeForm" :rules="rules" ref="form">
        <el-form-item label="步骤名称" label-width="100px" prop="nodeName">
          <el-input v-model="currentNodeForm.nodeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="审批类型" label-width="100px" prop="userType">
          <el-radio-group v-model="currentNodeForm.userType" @change="changeUserType">
            <el-radio-button :label="1">用户</el-radio-button>
            <el-radio-button :label="2">岗位</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="`${currentNodeForm.userType ==1 ?'用户':'岗位'}名称`" label-width="100px" prop="userIds">
          <div @click="selectAuditUser">
            <el-input :placeholder="`请选择${currentNodeForm.userType ==1 ?'用户':'岗位'}`" class="input-with-select" :readonly="true" :value="userListNameStr">
              <el-button slot="append" type="primary">选择</el-button>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="协作" label-width="100px" prop="nodeType">
          <el-radio-group v-model="currentNodeForm.nodeType">
            <el-radio :label="1">竞争</el-radio>
            <el-radio :label="2">会签</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTask">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <y-user-select :title="`请选择审批用户`" v-model="selectUserDialogStatus" @getSelectedUser="getSelectedUser" :initSelectedUser="currentNodeForm.userIds"></y-user-select>
    <y-post-select :title="`请选择审批岗位`" v-model="selectPostUserDialogStatus" @getSelectedUser="getSelectedUser" :initSelectedUser="currentNodeForm.userIds" :multiSelect="false"></y-post-select>
  </div>
</template>

<script>
  import CustomModeler from './customModeler'
  import { xmlStr } from './assets/xmlStr'
  import YUserSelect from '@/components/YUserSelect'
  import YPostSelect from '@/components/YPostSelect'

  export default {
    name: 'YWorkFDesign',
    components:{YUserSelect,YPostSelect},
    watch:{
      dialogFormVisible:function (value) {
        if (value === false)
          this.initAllTaskStyle()
      }
    },
    computed: {
      userListNameStr () {
        let name = ''
        if (this.currentNodeForm.userIds && this.currentNodeForm.userIds.length > 0){
          switch (this.currentNodeForm.userType) {
            case 1:
              name = this.getStaffNameListStr(this.currentNodeForm.userIds)
              break;
            case 2:
              name = this.getPostNameListStr(this.currentNodeForm.userIds)
              break;
          }
        }
        return name
      },
    },
    props: {
      id: {
        type: String,
        required: false,
        default: ''
      }
    },
    data() {
      return {
        bpmnModeler: null,
        loading: true,
        loadingText: '正在初始化控件...',
        contextMenuVisible: true,
        rcContentMenus: [],
        currentClickTask: null,
        currentClickEvent: null,
        dialogFormVisible: false,
        diagramData: [],
        form:{},
        currentNodeForm:{},
        selectUserDialogStatus:false,
        selectPostUserDialogStatus:false,
        staffListData:[],
        testName:'',
        postListData:[],
        rules:{
          nodeName: [
            { required: true, message: '请输入步骤名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          userType:[
            { required: true, message: '请选择审批类型', trigger: 'blur' }
          ],
          userIds:[
            { required: true, message: '请选择审批人', trigger: 'blur' }
          ],
          nodeType:[
            { required: true, message: '请选择', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.getStaffList();
      this.getPostList();
    },
    mounted() {
      const that = this
      that.bpmnModeler = new CustomModeler({
        container: '#canvas'
      })
      that.loadingText = '正在初始化数据'

      // 如果接收id不为空，请求服务器数据
      if (that.id) {
        that.$api.workflow.getDetail(that.id).then(res => {
          if(res.code === 200){
            if (res.data) {
              that.form = res.data;
              if (res.data.diagramBpmn) {
                that.initDesign(res.data.diagramBpmn)
              }else{
                that.initDesign(xmlStr)
              }
            }
          }else{
            that.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      } else {
        // 重置
        that.initDesign(xmlStr)
      }
    },
    methods: {
      addEventBusListener() {
        // 监听 element
        const that = this
        const eventBus = this.bpmnModeler.get('eventBus')
        const modeling = this.bpmnModeler.get('modeling')
        const elementRegistry = this.bpmnModeler.get('elementRegistry')
        const eventTypes = ['element.dblclick']
        eventTypes.forEach(function (eventType) {
          eventBus.on(eventType, function (e) {
            if (!e || e.element.type === 'bpmn:Process') {
              return false
            }
            if (eventType === 'element.dblclick') {
              switch (e.element.type) {
                case 'bpmn:StartEvent':
                  that.$alert('这是开始节点', '提示', {
                    confirmButtonText: '确定',
                    center: true
                  })
                  break
                case 'bpmn:EndEvent':
                  that.$alert('这是结束节点', '提示', {
                    confirmButtonText: '确定',
                    center: true
                  })
                  break
                case 'bpmn:UserTask':
                  that.currentClickTask = e.element
                  that.editTask()
                  break
              }
            }
          })
        })
      },
      initDesign(xmlData) {
        const that = this
        that.bpmnModeler.importXML(xmlData, function (err) {
          that.loading = false
          if (err) {
            that.$confirm('源数据初始化错误，是否重置该流程设计?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              that.initDesign(xmlStr)
            }).catch(() => {
            })
          } else {
            //容器
            that.bpmnModeler.get('canvas').zoom('fit-viewport')

            //关联节点数据初始化
            const elementRegistry = that.bpmnModeler.get('elementRegistry');
            const userTaskList = elementRegistry.filter(
              (item) => item.type === 'bpmn:UserTask'
            );
            if (userTaskList && userTaskList.length > 0) {
              userTaskList.forEach(function (item) {
                that.diagramData.push({
                  nodeId:item.businessObject.id,
                  nodeName:item.businessObject.name
                });
              });
              //合并处理
              if (that.form.diagramData){
                try {
                  const dgmData = JSON.parse(that.form.diagramData);
                  if (dgmData && dgmData.length > 0){
                    let recItem;
                    dgmData.forEach(function (item) {
                      recItem = that.diagramData.find(m => m.nodeId == item.nodeId);
                      if (recItem) {
                        that.$set(recItem,'userType',item.userType)
                        that.$set(recItem,'userIds',item.userIds)
                        that.$set(recItem,'nodeType',item.nodeType)
                      }
                    })
                  }
                }catch (e) {}
              }
            }

            //事件监听
            that.addEventBusListener()
          }
        })
      },
      resetDesign() {
        const that = this
        that.$refs.ctxshow.hideMenu()
        that.$confirm('此操作将重置该流程设计, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.initDesign(xmlStr)
        }).catch(() => {
        })
      },
      addUserTask(e) {
        this.$refs.ctxshow.hideMenu()
        if (!this.currentClickTask) {
          return
        }
        const modeling = this.bpmnModeler.get('modeling')
        const elementFactory = this.bpmnModeler.get('elementFactory')
        const autoPlace = this.bpmnModeler.get('autoPlace')
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' })
        modeling.setColor(shape, {
          fill: 'yellow'
        })
        this.initAllTaskStyle()
        autoPlace.append(this.currentClickTask, shape)

        this.diagramData.push({
          nodeId:shape.businessObject.id,
          nodeName:shape.businessObject.name,
          userType:1,
          nodeType:1,
          userIds:[]
        });

        const mouseEvents = document.createEvent('MouseEvents')
        mouseEvents.initEvent('click', false, true)
        document.body.querySelector('#canvas').dispatchEvent(mouseEvents)
      },
      selectedTask(htmlEle) {
        const that = this
        const modeling = this.bpmnModeler.get('modeling')
        that.initAllTaskStyle()
        const taskId = that.findCurrentClickDomTask(htmlEle)
        if (taskId) {
          const elementRegistry = that.bpmnModeler.get('elementRegistry')
          that.currentClickTask = elementRegistry.get(taskId)
          modeling.setColor(this.currentClickTask, {
            fill: 'yellow'
          })

          return that.currentClickTask
        } else {
          return null
        }
      },
      show(e) {
        this.hide()
        this.currentClickEvent = e
        if (e && e.target) {
          const currTask = this.selectedTask(e.target)
          if (currTask) {
            if (currTask.type === 'bpmn:EndEvent') {
              this.$refs.ctxshow.hideMenu()
            } else {
              switch (currTask.type) {
                case 'bpmn:StartEvent':
                  const elementRegistry = this.bpmnModeler.get('elementRegistry');
                  const userTaskList = elementRegistry.filter(
                    (item) => item.type === 'bpmn:UserTask'
                  );
                  if (userTaskList && userTaskList.length > 0){
                    this.rcContentMenus = ['btn2', 'btn6']
                  }else{
                    this.rcContentMenus = ['btn2']
                  }
                  break;
                case 'bpmn:SequenceFlow':
                  this.rcContentMenus = ['btn5']
                  break;
                case 'bpmn:Process':
                  this.rcContentMenus = ['btn1', 'btn7']
                  break;
                default:
                  this.rcContentMenus = ['btn2', 'btn4', 'btn5', 'btn6']
                  break;
              }
            }
          } else {
            this.rcContentMenus = ['btn1', 'btn7']
          }
        } else {
          this.rcContentMenus = ['btn1', 'btn7']
        }
      },
      hide() {
        this.rcContentMenus = []
      },
      deleteTask() {
        const that = this
        that.$refs.ctxshow.hideMenu()
        that.$confirm('请确认是否删除该节点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (that.currentClickTask) {
            if (that.currentClickTask.type === 'bpmn:StartEvent') {
              that.$message.error('开始节点不能删除')
              return
            }
            if (that.currentClickTask.type === 'bpmn:EndEvent') {
              that.$message.error('结束节点不能删除')
              return
            }
            const modeling = that.bpmnModeler.get('modeling')
            modeling.removeElements([that.currentClickTask])
            if (that.diagramData && that.diagramData.length > 0) {
              let currNodeIndex = that.diagramData.findIndex(m => m.nodeId == that.currentClickTask.businessObject.id);
              if (currNodeIndex >= 0){
                that.diagramData.splice(currNodeIndex,1)
              }
            }

          } else {
            that.$message.error('你没有选中任何节点')
          }
        }).catch(() => {
        })
      },
      save() {
        const that = this
        that.$refs.ctxshow.hideMenu()
        // eslint-disable-next-line handle-callback-err
        that.saveDiagram(function (err, xml) {
          that.form.diagramBpmn = xml;
          if (that.diagramData && that.diagramData.length > 0){
            that.form.diagramData = JSON.stringify(that.diagramData)
          }
          that.$utils.loading.show();
          that.$api.workflow.save(that.form).then(res => {
            that.$utils.loading.hide();
            if(res.code === 200){
              that.$message.success('操作成功！');
            }
            else{
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        })
      },
      connectLine() {
        this.$refs.ctxshow.hideMenu()
        if (!this.currentClickTask) {
          return
        }
        const connect = this.bpmnModeler.get('connect')
        connect.start(this.currentClickEvent, this.currentClickTask)
      },
      editTask(data) {
        this.$refs.ctxshow.hideMenu()
        const currNode = this.diagramData.find(m => m.nodeId == this.currentClickTask.businessObject.id)
        if (!currNode){
          this.$message({
            type: 'error',
            message: '发生未知错误，无效编辑'
          })
          return;
        }

        this.currentNodeForm = {...currNode}
        if (!this.currentNodeForm.userType){
          this.$set(this.currentNodeForm,'userType',1)
        }
        if (!this.currentNodeForm.nodeType){
          this.$set(this.currentNodeForm,'nodeType',1)
        }

        this.dialogFormVisible = true
      },
      // 下载为bpmn格式,done是个函数，调用的时候传入的
      saveDiagram(done) {
        // 把传入的done再传给bpmn原型的saveXML函数调用
        this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
          done(err, xml)
        })
      },
      saveTask() {
        const that = this
        that.$refs.form.validate((valid) => {
          if (!valid){
            return false
          }
          const modeling = that.bpmnModeler.get('modeling')
          modeling.updateProperties(that.currentClickTask, {
            name: that.currentNodeForm.nodeName
          })
          let dgmNodeData = that.diagramData.find(m => m.nodeId == that.currentNodeForm.nodeId)
          if (dgmNodeData) {
            that.$set(dgmNodeData,'nodeId',that.currentNodeForm.nodeId)
            that.$set(dgmNodeData,'nodeName',that.currentNodeForm.nodeName)
            that.$set(dgmNodeData,'userType',that.currentNodeForm.userType)
            that.$set(dgmNodeData,'userIds',that.currentNodeForm.userIds)
            that.$set(dgmNodeData,'nodeType',that.currentNodeForm.nodeType)
          }
          that.dialogFormVisible = false
        })
      },
      findCurrentClickDomTask(e) {
        const isElement = function (obj) {
          return !!(obj && (obj.nodeType === 1)) // 判断是否是Element元素
        }
        if (isElement(e)) {
          const taskId = e.getAttribute('data-element-id')
          if (taskId && taskId !== 'Process_1') {
            return taskId
          } else {
            if (e.parentNode) {
              return this.findCurrentClickDomTask(e.parentNode)
            } else {
              return null
            }
          }
        }
        return null
      },
      canvasClick(e) {
        const that = this
        if (e && e.target) {
          const currTask = that.selectedTask(e.target)
        }
      },
      initAllTaskStyle() {
        const that = this
        const elementRegistry = that.bpmnModeler.get('elementRegistry')
        const nodeList = elementRegistry.filter(
          (item) => item.type === 'bpmn:UserTask'
        )
        const modeling = that.bpmnModeler.get('modeling')
        if (nodeList && nodeList.length > 0) {
          modeling.setColor(nodeList, {
            fill: 'white'
          })
        }
      },
      getSelectedUser(value){
        if (value && value.length > 0){
          this.currentNodeForm.userIds = value.map(m =>m.id);
        }else{
          this.currentNodeForm.userIds = []
        }
      },
      changeUserType(){
        this.currentNodeForm.userIds = []
      },
      getStaffList(){
        const that = this;
        that.$api.baseInfo.getStaffList().then(res => {
          if(res.code === 200){
            if (res.data && res.data.records && res.data.records.length > 0){
              that.staffListData = res.data.records;
            }
          }else{
            that.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      },
      getStaffNameListStr(selectedUserIdList){
        const that = this
        if (selectedUserIdList && selectedUserIdList.length > 0){
          let selectedList = []
          let selectedItem = null;
          selectedUserIdList.forEach(function (id) {
            selectedItem = that.staffListData.find(m =>m.id == id)
            if (selectedItem)
              selectedList.push(selectedItem)
          })
          if (selectedList && selectedList.length > 0)
            return selectedList.map(m =>m.name).join(',')
        }

        return ''
      },
      selectAuditUser(){
        if (this.currentNodeForm.userType === 1){
          this.selectUserDialogStatus = true
        }else{
          this.selectPostUserDialogStatus = true;
        }
      },
      getPostList(){
        const that = this;
        that.$api.post.simpleAll().then(res => {
          if(res.code === 200){
            if (res.data && res.data.length > 0){
              that.postListData = res.data;
            }
          }else{
            that.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      },
      getPostNameListStr(selectedUserIdList){
        const that = this
        if (selectedUserIdList && selectedUserIdList.length > 0){
          let selectedList = []
          let selectedItem = null;
          selectedUserIdList.forEach(function (id) {
            selectedItem = that.postListData.find(m =>m.id == id)
            if (selectedItem)
              selectedList.push(selectedItem)
          })
          if (selectedList && selectedList.length > 0)
            return selectedList.map(m =>m.name).join(',')
        }

        return ''
      }
    }
  }
</script>

<style scoped lang="scss">
  $assets: '~@/components/YWorkFDesign/assets/';
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  @import "./assets/css/main.scss";
</style>
<style lang="scss">
  .workflow-design #canvas {
    .djs-label {
      fill: #0e76a8 !important;
      display: inherit !important;
    }

    &.disabledUpdateText .djs-direct-editing-parent {
      display: none;
    }

    .djs-connection path {
      stroke: #0e76a8 !important;
    }

    defs marker path {
      fill: #0e76a8 !important;
      stroke: #0e76a8 !important;
    }

    .djs-palette {
      display: none;
    }
  }
</style>
