<template>
  <div class="workflow-design"
       v-loading="loading"
       :element-loading-text="loadingText"
       element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="header clearfix">
      <span class="title">流程设计</span>
      <div class="option-btn">
        <el-button type="primary">保存</el-button>
        <el-button type="danger" @click="resetDesign">重置</el-button>
        <el-button type="danger">返回</el-button>
      </div>
    </div>
    <div id="canvas" class="disabledUpdateText" @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event,$event)"></div>
    <e-vue-contextmenu ref="ctxshow" id="contextStyle" @ctx-show="show" @ctx-hide="hide">
      <ul>
        <li v-show="rcContentMenus.indexOf('btn1')>-1" data-id="btn1" @click="save"><i class="el-icon-success"></i>&nbsp;<span>保存设计</span></li>
        <li v-show="rcContentMenus.indexOf('btn2')>-1" data-id="btn2" @click="addUserTask"><i class="el-icon-circle-plus"></i>&nbsp;<span>添加用户步骤</span></li>
        <li v-show="rcContentMenus.indexOf('btn4')>-1" data-id="btn4"><i class="el-icon-setting"></i>&nbsp;<span>属性</span></li>
        <li v-show="rcContentMenus.indexOf('btn5')>-1" data-id="btn5" @click="deleteTask"><i class="el-icon-delete"></i>&nbsp;<span>删除</span></li>
        <li v-show="rcContentMenus.indexOf('btn6')>-1" data-id="btn5" @click="connectLine"><i class="el-icon-share"></i>&nbsp;<span>连线</span></li>
      </ul>
    </e-vue-contextmenu>
  </div>
</template>

<script>
  import CustomModeler from './customModeler'
  import { xmlStr } from './assets/xmlStr'
  export default {
    name: 'YWorkFDesign',
    props:{
      id: {
        type: String,
        required: false,
        default:''
      }
    },
    data(){
      return{
        bpmnModeler:null,
        loading:true,
        loadingText:'正在初始化控件...',
        contextMenuVisible:true,
        rcContentMenus:[],
        currentClickTask:null,
        currentClickEle:null
      }
    },
    mounted(){
      const that = this;
      that.bpmnModeler = new CustomModeler({
        container: '#canvas'
      });
      that.loadingText = '正在初始化数据';

      //如果接收id不为空，请求服务器数据
      if (that.id){
        that.$api.workflow.getDetail().then(data => {
          that.loading = false;
          that.bpmnModeler.importXML(data, function(err) {
            if (!err) {
              // const elementRegistry = that.bpmnModeler.get('elementRegistry');
              // that.nodeList = elementRegistry.filter (
              //   (item) => item.type === 'bpmn:UserTask' || item.type === 'bpmn:ServiceTask'
              // );
              // let modeling = that.bpmnModeler.get('modeling');
              // modeling.setColor(that.nodeList[0], {
              //   stroke: 'green',
              //   fill: 'yellow'
              // });
              that.addEventBusListener();
            }else{
              that.$message.error('初始化数据错误');
            }
          })
        })
      }else{
        //重置
        that.resetDesign();
      }
    },
    methods: {
      addEventBusListener() {
        // 监听 element
        let that = this
        const eventBus = this.bpmnModeler.get('eventBus')
        const modeling = this.bpmnModeler.get('modeling')
        const elementRegistry = this.bpmnModeler.get('elementRegistry')
        const eventTypes = ['element.changed','element.dblclick']
        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, function(e) {
            if (!e || e.element.type == 'bpmn:Process'){
              return false;
            }
          })
        })
      },
      resetDesign() {
        const that = this;
        that.bpmnModeler.importXML(xmlStr, function(err) {
          that.loading = false;
          if (err) {
            that.$message.error('初始化错误');
          }else{
            that.bpmnModeler.get('canvas').zoom('fit-viewport');
            var eventBus = that.bpmnModeler.get('eventBus');

            var events = [
              'element.click',
              'element.dblclick'
            ]
            events.forEach(event => {
              eventBus.on(event, (e) => {
                // console.log(event, 'on', e.element.id)
              })
            })
          }
        })
      },
      addUserTask(e) {
        this.$refs.ctxshow.hideMenu();
        if (!this.currentClickTask) {
          return;
        }
        const elementFactory = this.bpmnModeler.get('elementFactory');
        const autoPlace = this.bpmnModeler.get('autoPlace');
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
        autoPlace.append(this.currentClickTask, shape);
      },
      show(e) {
        this.hide();
        this.currentClickEle = e;
        console.log(e);
        if (e && e.target && e.target.parentNode){
          let taskId = e.target.parentNode;
          if (taskId) {
            taskId = taskId.getAttribute('data-element-id');
            if (!taskId){
              taskId = e.target.parentNode.parentNode.parentNode;
              if (taskId) {
                taskId = taskId.getAttribute('data-element-id');
              }
            }
            if (taskId) {
              const elementRegistry = this.bpmnModeler.get('elementRegistry');
              this.currentClickTask = elementRegistry.get(taskId);
              if (this.currentClickTask.type === 'bpmn:EndEvent' || this.currentClickTask.type === 'bpmn:SequenceFlow') {
                this.rcContentMenus = ['btn5'];
              }else{
                this.rcContentMenus = ['btn2','btn4','btn5','btn6'];
              }
            }else{
              this.rcContentMenus = ['btn1'];
            }
          }else{
            this.rcContentMenus = ['btn1'];
          }
        }else{
          this.rcContentMenus = ['btn1'];
        }
      },
      hide() {
        this.rcContentMenus = [];
      },
      deleteTask(){
        const that = this;
        that.$refs.ctxshow.hideMenu();
        if (that.currentClickTask) {
          if (that.currentClickTask.type === 'bpmn:StartEvent') {
            that.$message.error('开始节点不能删除');
            return;
          }
          if (that.currentClickTask.type === 'bpmn:EndEvent') {
            that.$message.error('结束节点不能删除');
            return;
          }
          const modeling = that.bpmnModeler.get('modeling');
          modeling.removeElements([that.currentClickTask]);
        }else{
          that.$message.error('你没有选中任何节点');
        }
      },
      save(){
        const that = this;
        that.$refs.ctxshow.hideMenu();
        that.$message.success('保存成功');
      },
      connectLine(){
        this.$refs.ctxshow.hideMenu();
        if (!this.currentClickTask) {
          return;
        }
        const connect = this.bpmnModeler.get('connect');
        connect.start(this.currentClickEle,this.currentClickTask);
      }
    }
  }
</script>

<style scoped lang="scss">
  $assets:'~@/components/yWorkFDesign/assets/';
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css' ;
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  @import "./assets/css/main.scss";
</style>
<style lang="scss">
  .workflow-design #canvas{
    .djs-label{
      fill: #0e76a8 !important;
      display: inherit !important;
    }
    &.disabledUpdateText .djs-direct-editing-parent{
      display: none;
    }
    .djs-connection path{
      stroke: #0e76a8 !important;
    }
    defs marker path{
      fill: #0e76a8 !important;
      stroke: #0e76a8 !important;
    }
    .djs-palette{
      display: none;
    }
  }
</style>
