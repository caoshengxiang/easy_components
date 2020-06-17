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
    <div id="canvas"></div>
  </div>
</template>

<script>
  import CustomModeler from './customModeler'
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
        testName:'1111111111111111111'
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
            if (err) {
              that.$message.info('初始化数据错误');
            }
          })
        })
      }else{
        //重置
        that.resetDesign();
      }
    },
    methods: {
      resetDesign() {
        const that = this;
        that.bpmnModeler.createDiagram(err => {
          that.loading = false;
          if (err) {
            that.$message.info('初始化错误');
          }else{
            that.bpmnModeler.get('canvas').zoom('fit-viewport')
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
      }
    }
  }
</script>

<style scoped lang="scss">
  $assets:'~@/components/yWorkFDesign/assets/';
  @import "./assets/css/main.scss";
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css' ;
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
</style>
