<template>
  <div class="workflow-design">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>流程设计</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div id="canvas" style="height: 500px;border: 1px solid red;"></div>
    </el-card>
  </div>
</template>

<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import API from '@/api'
  export default {
    name: 'YWorkFDesign',
    created() {
      const that = this
      // API.workflow.getDetail().then(data => {
      //   var modeler = new BpmnModeler({
      //     container: '#canvas'
      //   })
      //   modeler.importXML(data, function(err) {
      //   })
      // })
    },
    methods: {
      test() {
        const that = this
      }
    }
  }
</script>

<style scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css' ;
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
</style>
