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
        <base-info-building-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_buildinglist'" :detailInfo="this.originData"></base-info-building-info>
        <base-info-room-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-room-info>
        <base-info-training-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-training-info>
        <base-info-facilities-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-facilities-info>
        <base-info-department-info v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-department-info>
        <base-info-course-info v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-course-info>
        <base-info-major-info v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-major-info>
        <base-info-grade-info v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-grade-info>
        <base-info-class-info v-if="this.form.menuNo === '_views_baseinfo_class_list'" :detailInfo="this.originData"></base-info-class-info>
        <base-info-userInfo-info v-if="this.form.menuNo === '_views_baseinfo_userinfo_list'" :detailInfo="this.originData"></base-info-userInfo-info>
      </el-card>
      <el-card  v-if="show">
        <div slot="header" class="clearfix">
          <span>申请历史</span>
        </div>
        <base-info-asset-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_list'" :detailInfo="this.originData"></base-info-asset-info>
        <base-info-building-info  v-if="this.form.menuNo === '_views_baseinfo_assetinfo_buildinglist'" :detailInfo="this.originData"></base-info-building-info>
        <base-info-room-info  v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-room-info>
        <base-info-training-info  v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-training-info>
        <base-info-facilities-info  v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'" :detailInfo="this.originData"></base-info-facilities-info>
        <base-info-department-info  v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-department-info>
        <base-info-course-info  v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-course-info>
        <base-info-major-info  v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-major-info>
        <base-info-grade-info  v-if="this.form.menuNo === '_views_baseinfo_department_list'" :detailInfo="this.originData"></base-info-grade-info>
        <base-info-class-info  v-if="this.form.menuNo === '_views_baseinfo_class_list'" :detailInfo="this.originData"></base-info-class-info>
        <base-info-userInfo-info  v-if="this.form.menuNo === '_views_baseinfo_userinfo_list'" :detailInfo="this.originData"></base-info-userInfo-info>
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
    baseInfoAssetInfo:()=>import("@/views/baseinfo/assetinfo/detail"),
    baseInfoAssetInfoBuilding:()=>import("@/views/baseinfo/assetinfo/buildingdetail"),
    baseInfoAssetInfoRoom:()=>import("@/views/baseinfo/assetinfo/roomdetail"),
    baseInfoAssetInfoTraining:()=>import("@/views/baseinfo/assetinfo/trainingdetail"),
    baseInfoAssetInfoFacilities:()=>import("@/views/baseinfo/assetinfo/facilitiesdetail"),
    baseInfoAssetInfoDepartment:()=>import("@/views/baseinfo/department/edit"),
    baseInfoAssetInfoCourse:()=>import("@/views/baseinfo/course/detail"),
    baseInfoAssetInfoMajor:()=>import("@/views/baseinfo/major/edit"),
    baseInfoAssetInfoGrade:()=>import("@/views/baseinfo/grade/edit"),
    baseInfoAssetInfoClass:()=>import("@/views/baseinfo/class/edit"),
    baseInfoAssetInfoUserInfo:()=>import("@/views/baseinfo/userinfo/detailInfo"),
  }

    export default {
        name: "WorkflowDetail",
      components: {
          Breadcrumb,
          YDetailPageLayout,
        "base-info-asset-info":detailList.baseInfoAssetInfo,
        "base-info-building-info":detailList.baseInfoAssetInfoBuilding,
        "base-info-room-info":detailList.baseInfoAssetInfoRoom,
        "base-info-training-info":detailList.baseInfoAssetInfoTraining,
        "base-info-facilities-info":detailList.baseInfoAssetInfoFacilities,
        "base-info-department-info":detailList.baseInfoAssetInfoDepartment,
        "base-info-course-info":detailList.baseInfoAssetInfoCourse,
        "base-info-major-info":detailList.baseInfoAssetInfoMajor,
        "base-info-grade-info":detailList.baseInfoAssetInfoGrade,
        "base-info-class-info":detailList.baseInfoAssetInfoClass,
        "base-info-userInfo-info":detailList.baseInfoAssetInfoUserInfo,
      },
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
