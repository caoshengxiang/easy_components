<template>
  <div class="app-container task-detail">
    <div class="title-container task-title">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>

    <div class="task-detail-header">
      申请信息
    </div>
      <div class="task-detail-content">
        <el-form ref="form" :model="form">
        <el-row style="text-align: left">
          <el-col :span="6">
            <el-form-item label="模块："  prop="status" label-width="100px" >
            {{form.moduleName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作类型："  prop="status" label-width="100px" >
              {{form.operationName}}
            </el-form-item>
        </el-col>
          <el-col :span="6">
            <el-form-item label="申请人："  prop="status" label-width="100px" >
              {{form.startName}}
            </el-form-item>
        </el-col>
          <el-col :span="6">
            <el-form-item label="申请时间："  prop="status" label-width="100px">
              {{form.startTime}}
            </el-form-item>
        </el-col>
        </el-row>
        </el-form>
      </div>
      <div class="task-detail-header-one">新增信息</div>
      <detail v-if="this.form.menuNo === '_views_baseinfo_assetinfo_list'" :detailInfo="this.formData"></detail>
      <div v-if="show"  class="task-detail-header-one">原始信息</div>
      <detail v-if="show &&  this.form.menuNo === '_views_baseinfo_assetinfo_list'" :detailInfo="this.originData"></detail>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import detail from '@/views/baseinfo/assetinfo/detail'
    export default {
        name: "WorkflowDetail",
      components: {Breadcrumb,detail},
      props: {
        //保存方法
        detailInfo: {
          type: Object,
          default: {}
        }
      },
      data(){
        return{
          form:{},
          formData:{},
          originData:{},
          show: false,
        }
      },
      created(){
          let that = this
          that.getDetail()
      },
      methods:{
        getDetail(){
          const that = this;
          if(that.$route.query.type == 2){
          that.$api.task.getAttendDetail(that.$route.query.id).then(res => {
            if(res.code === 200){
              //返回成功
              that.form = res.data
              that.formData = res.data.formData;
              that.originData = res.data.originData;
              if(that.originData){
                that.show = true
              }
            }
            else{
              that.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        }else
          {
            that.$api.task.getDetail(that.$route.query.id).then(res => {
              if(res.code === 200){
                //返回成功
                that.form = res.data
                that.formData = res.data.formData;
                that.originData = res.data.originData;
              }
              else{
                that.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
<style scoped>
  .task-detail >>>.title-container:not(.task-title){
    display: none !important;
  }
</style>
