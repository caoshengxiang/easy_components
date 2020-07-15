<template>
    <div class="workflow-detail app-container">
      <div class="title-container">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      </div>
      <y-detail-page-layout :save="save">
        <el-tabs value ="first" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first">
            你们的表单内容
          </el-tab-pane>
          <el-tab-pane label="备注信息" name="second">
            你们的表单内容
          </el-tab-pane>
        </el-tabs>
      </y-detail-page-layout>
    </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
    export default {
        name: "WorkflowDetail",
      components: {Breadcrumb,YDetailPageLayout},
      data(){
        return{
          name:'111'
        }
      },
      methods:{
          save(){
            const that = this;
            alert(that.name);
          }
      }
    }
</script>

<style scoped>

</style>
