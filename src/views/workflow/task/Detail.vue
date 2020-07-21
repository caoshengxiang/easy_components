<template>
    <div class="workflow-detail app-container">
      <div class="title-container">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      </div>
      <y-detail-page-layout :save="save" :editStatus="true">
        <el-tabs value ="first">
          <el-tab-pane label="基础信息" name="first">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
              <el-form-item label="工作流名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="备注说明">
                <y-ueditor
                  :content="form.description"
                  :config='{
                    initialFrameWidth: null,
                    initialFrameHeight: 350,
                    readonly:false
                  }'
                  ref="contentUEditor"></y-ueditor>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </y-detail-page-layout>
    </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import YUeditor from '@/components/YUeditor'
    export default {
        name: "WorkflowDetail",
      components: {Breadcrumb,YDetailPageLayout,YUeditor},
      data(){
        return{
          form:{},
          rules:{
            name: [
              { required: true, message: '请输入工作流名称', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      created(){
        this.init();
      },
      methods:{
        init(){
          const that = this;
          if (that.$route.query.id){
            that.$utils.loading.show();
            that.$api.workflow.getDetail(that.$route.query.id).then(res => {
              that.$utils.loading.hide();
              if(res.code === 200){
                //返回成功
                that.form = res.data;
              }
              else{
                that.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
          }
        },
        save(){
          const that = this;
          that.$refs.form.validate((valid) => {
            if (valid) {
              that.$utils.loading.show();
              that.form.description = that.$refs.contentUEditor.getUEContent();
              if (that.form.id){
                that.$api.workflow.saveInfo(that.form).then(res => {
                  that.$utils.loading.hide();
                  if(res.code === 200){
                    that.$message.success('操作成功！');
                    that.$utils.routerLink("/workflow/index");
                  }
                  else{
                    that.$message({
                      type: 'error',
                      message: res.msg
                    })
                  }
                })
              } else{
                that.$api.workflow.add(that.form).then(res => {
                  that.$utils.loading.hide();
                  if(res.code === 200){
                    that.$message.success('操作成功！');
                    that.$utils.routerLink("/workflow/index");
                  }
                  else{
                    that.$message({
                      type: 'error',
                      message: res.msg
                    })
                  }
                })
              }
            } else {
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>
