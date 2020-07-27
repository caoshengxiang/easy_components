<template>
  <div class="app-container task-detail">
    <div class="title-container task-title">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout style="background-color: transparent">
      <el-card>
        <div slot="header" class="clearfix">
          <span>申请信息</span>
        </div>
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
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>申请内容</span>
        </div>
        <base-info-asset-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_list'" :detailInfo="this.originData"></base-info-asset-info>
      </el-card>
      <el-card v-if="show &&  this.form.menuNo === '_views_baseinfo_assetinfo_list'">
        <div slot="header" class="clearfix">
          <span>申请历史</span>
        </div>
        <base-info-asset-info :detailInfo="this.originData"></base-info-asset-info>
      </el-card>
    </y-detail-page-layout>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  //功能详情列表
  //姚备注，需要用的列表加到list里面，components里面注意声明，参考
  const detailList = {
    baseInfoAssetInfo:()=>import("@/views/baseinfo/assetinfo/detail")
  }

    export default {
        name: "WorkflowDetail",
      components: {Breadcrumb,YDetailPageLayout,"base-info-asset-info":detailList.baseInfoAssetInfo},
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
          that.$utils.loading.show();
          if(that.$route.query.type == 2){
          that.$api.task.getAttendDetail(that.$route.query.id).then(res => {
            that.$utils.loading.hide();
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
                message: res.msg
              })
            }
          })
        }else
          {
            that.$api.task.getDetail(that.$route.query.id).then(res => {
              that.$utils.loading.hide();
              if(res.code === 200){
                //返回成功
                that.form = res.data
                that.formData = res.data.formData;
                that.originData = res.data.originData;
              }
              else{
                that.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .el-card{
    margin-bottom: 20px;
  }
</style>
<style scoped>
  .task-detail >>>.title-container:not(.task-title){
    display: none !important;
  }
  .task-detail >>>.y-options{
    display: none !important;
  }
  .task-detail >>>.el-card__body,.task-detail >>>.el-card__body .app-container{
    padding: 0;
  }
</style>
