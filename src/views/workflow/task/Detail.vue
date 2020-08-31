<template>
  <div class="app-container task-detail">
    <div class="title-container task-title">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout style="background-color: transparent">
      <el-card>
        <div slot="header" class="clearfix">
          <span>申请信息</span>
        </div>
        <el-form ref="form" :model="form">
          <el-row style="text-align: left">
            <el-col :span="6">
              <el-form-item label="模块：" prop="status" label-width="100px">
                {{ form.moduleName }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作类型：" prop="status" label-width="100px">
                {{ form.operationName }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人：" prop="status" label-width="100px">
                {{ form.startName }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请时间：" prop="status" label-width="100px">
                {{ form.startTime }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="y-form-card">
        <div slot="header" class="clearfix">
          <span>申请内容</span>
        </div>
        <base-info-asset-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_list'"
                              :detailInfo="this.formData"
        />
        <base-info-building-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_buildinglist'"
                                 :detailInfo="this.formData"
        />
        <base-info-room-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'"
                             :detailInfo="this.formData"
        />
        <base-info-training-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_traininglist'"
                                 :detailInfo="this.formData"
        />
        <base-info-facilities-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_facilitieslist'"
                                   :detailInfo="this.formData"
        />
        <base-info-department-info v-if="this.form.menuNo === '_views_baseinfo_department_list'"
                                   :detailInfo="this.formData"
        />
        <base-info-course-info v-if="this.form.menuNo === '_views_baseinfo_course_list'"
                               :detailInfo="this.formData"
        />
        <base-info-major-info v-if="this.form.menuNo === '_views_baseinfo_major_list'"
                              :detailInfo="this.formData"
        />
        <base-info-grade-info v-if="this.form.menuNo === '_views_baseinfo_grade_list'"
                              :detailInfo="this.formData"
        />
        <base-info-class-info v-if="this.form.menuNo === '_views_baseinfo_class_list'"
                              :detailInfo="this.formData"
        />
        <base-info-userInfo-info v-if="this.form.menuNo === '_views_baseinfo_userinfo_list'"
                                 :detailInfo="this.formData"
        />
        <base-info-std-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList'"
                            :detailInfo="this.formData"
        />
        <base-info-dormitory-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_list'"
                                  :detailInfo="this.formData"
        />
        <base-info-stdDelete-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList_remove'"
                                  :detailInfo="this.formData"
        />
        <base-info-stdMove-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList_move'"
                                :detailInfo="this.formData"
        />
        <TeachingAffairsSemesterEdit v-if="this.form.menuNo === '_views_teachingAffairs_semester_list'"
                                     :detailInfo="this.formData"
        />
        <TeachingAffairsSemesterClassTime v-if="this.form.menuNo === '_views_teachingAffairs_semester_classTime'"
                                          :detailInfo="this.formData"
        />
        <staffDetail v-if="this.form.menuNo === '_views_staff_list'" :detailInfo="this.formData"/>
        <staffEduDetail v-if="this.form.menuNo === '_views_staff_eduDetail'"
                        :detailInfo="this.formData"
        />
        <staffwageDetail v-if="this.form.menuNo === '_views_staff_wageDetail'"
                         :detailInfo="this.formData"
        />
      </el-card>
      <el-card v-if="show" class="y-form-card">
        <div slot="header" class="clearfix">
          <span>申请历史</span>
        </div>
        <base-info-asset-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_list'"
                              :detailInfo="this.originData"
        />
        <base-info-building-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_buildinglist'"
                                 :detailInfo="this.originData"
        />
        <base-info-room-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_roomlist'"
                             :detailInfo="this.originData"
        />
        <base-info-training-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_traininglist'"
                                 :detailInfo="this.originData"
        />
        <base-info-facilities-info v-if="this.form.menuNo === '_views_baseinfo_assetinfo_facilitieslist'"
                                   :detailInfo="this.originData"
        />
        <base-info-department-info v-if="this.form.menuNo === '_views_baseinfo_department_list'"
                                   :detailInfo="this.originData"
        />
        <base-info-course-info v-if="this.form.menuNo === '_views_baseinfo_course_list'"
                               :detailInfo="this.originData"
        />
        <base-info-major-info v-if="this.form.menuNo === '_views_baseinfo_major_list'"
                              :detailInfo="this.originData"
        />
        <base-info-grade-info v-if="this.form.menuNo === '_views_baseinfo_grade_list'"
                              :detailInfo="this.originData"
        />
        <base-info-class-info v-if="this.form.menuNo === '_views_baseinfo_class_list'"
                              :detailInfo="this.originData"
        />
        <base-info-userInfo-info v-if="this.form.menuNo === '_views_baseinfo_userinfo_list'"
                                 :detailInfo="this.originData"
        />
        <base-info-std-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList'"
                            :detailInfo="this.originData"
        />
        <base-info-dormitory-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_list'"
                                  :detailInfo="this.originData"
        />
        <base-info-stdDelete-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList_remove'"
                                  :detailInfo="this.originData"
        />
        <base-info-stdMove-info v-if="this.form.menuNo === '_views_dormitory_dormitoryInfo_dormitoryStdList_move'"
                                :detailInfo="this.originData"
        />
        <TeachingAffairsSemesterEdit v-if="this.form.menuNo === '_views_teachingAffairs_semester_list'"
                                     :detailInfo="this.originData"
        />
        <TeachingAffairsSemesterClassTime v-if="this.form.menuNo === '_views_teachingAffairs_semester_classTime'"
                                          :detailInfo="this.originData"
        />
        <staffDetail v-if="this.form.menuNo === '_views_staff_list'" :detailInfo="this.originData"/>
        <staffEduDetail v-if="this.form.menuNo === '_views_staff_eduDetail'"
                        :detailInfo="this.originData"
        />
        <staffwageDetail v-if="this.form.menuNo === '_views_staff_wageDetail'"
                         :detailInfo="this.originData"
        />
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
    baseInfoAssetInfo: () => import('@/views/baseinfo/assetinfo/detail'),
    baseInfoAssetInfoBuilding: () => import('@/views/baseinfo/assetinfo/buildingdetail'),
    baseInfoAssetInfoRoom: () => import('@/views/baseinfo/assetinfo/roomdetail'),
    baseInfoAssetInfoTraining: () => import('@/views/baseinfo/assetinfo/trainingdetail'),
    baseInfoAssetInfoFacilities: () => import('@/views/baseinfo/assetinfo/facilitiesdetail'),
    baseInfoAssetInfoDepartment: () => import('@/views/baseinfo/department/edit'),
    baseInfoAssetInfoCourse: () => import('@/views/baseinfo/course/detail'),
    baseInfoAssetInfoMajor: () => import('@/views/baseinfo/major/edit'),
    baseInfoAssetInfoGrade: () => import('@/views/baseinfo/grade/edit'),
    baseInfoAssetInfoClass: () => import('@/views/baseinfo/class/edit'),
    baseInfoAssetInfoUserInfo: () => import('@/views/baseinfo/userinfo/detailInfo'),
    baseInfoAssetInfoStdInfo: () => import('@/views/dormitory/dormitoryInfo/stdDetail'),
    baseInfoAssetInfoDormitory: () => import('@/views/dormitory/dormitoryInfo/detail'),
    baseInfoAssetInfoStdDeleteInfo: () => import('@/views/dormitory/dormitoryInfo/stdDelete'),
    baseInfoAssetInfoStdMoveInfo: () => import('@/views/dormitory/dormitoryInfo/stdMove'),
    TeachingAffairsSemesterEdit: () => import('../../../views/teachingAffairs/semester/edit'),
    TeachingAffairsSemesterClassTime: () => import('../../../views/teachingAffairs/semester/classTime_approve'),
    staffDetail: () => import('../../../views/staff/detail_approve'),
    staffEduDetail: () => import('../../../views/staff/eduDetail'),
    staffwageDetail: () => import('../../../views/staff/wageDetail'),
  }
  export default {
    name: 'WorkflowDetail',
    components: {
      Breadcrumb,
      YDetailPageLayout,
      'base-info-asset-info': detailList.baseInfoAssetInfo,
      'base-info-building-info': detailList.baseInfoAssetInfoBuilding,
      'base-info-room-info': detailList.baseInfoAssetInfoRoom,
      'base-info-training-info': detailList.baseInfoAssetInfoTraining,
      'base-info-facilities-info': detailList.baseInfoAssetInfoFacilities,
      'base-info-department-info': detailList.baseInfoAssetInfoDepartment,
      'base-info-course-info': detailList.baseInfoAssetInfoCourse,
      'base-info-major-info': detailList.baseInfoAssetInfoMajor,
      'base-info-grade-info': detailList.baseInfoAssetInfoGrade,
      'base-info-class-info': detailList.baseInfoAssetInfoClass,
      'base-info-userInfo-info': detailList.baseInfoAssetInfoUserInfo,
      'base-info-std-info': detailList.baseInfoAssetInfoStdInfo,
      'base-info-dormitory-info': detailList.baseInfoAssetInfoDormitory,
      'base-info-stdDelete-info': detailList.baseInfoAssetInfoStdDeleteInfo,
      'base-info-stdMove-info': detailList.baseInfoAssetInfoStdMoveInfo,
      'TeachingAffairsSemesterEdit': detailList.TeachingAffairsSemesterEdit,
      'TeachingAffairsSemesterClassTime': detailList.TeachingAffairsSemesterClassTime,
      'staffDetail': detailList.staffDetail,
      'staffEduDetail': detailList.staffEduDetail,
      'staffwageDetail': detailList.staffwageDetail,
    },
    props: {
      //保存方法
      detailInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        form: {},
        formData: {},
        originData: {},
        show: false,
      }
    },
    created() {
      let that = this
      that.getDetail()
    },
    methods: {
      getDetail() {
        const that = this
        that.$utils.loading.show()
        if (that.$route.query.type == 2) {
          that.$api.task.getAttendDetail(that.$route.query.id).then(res => {
            that.$utils.loading.hide()
            if (res.code === 200) {
              //返回成功
              that.form = res.data
              that.formData = res.data.formData
              that.originData = res.data.originData
              if (that.originData) {
                that.checkDataContent(that.formData,that.originData)
                that.show = true
              }
            } else {
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        } else {
          that.$api.task.getDetail(that.$route.query.id).then(res => {
            that.$utils.loading.hide()
            if (res.code === 200) {
              //返回成功
              that.form = res.data
              that.formData = res.data.formData
              that.originData = res.data.originData
              if (that.originData) {
                that.checkDataContent(that.formData,that.originData)
                that.show = true
              }
            } else {
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }
      },
      checkDataContent(form,orgForm){
        const that = this
        if (form && orgForm) {
          setTimeout(function () {
            let formList = document.querySelectorAll('.y-form-card .el-form')
            if (!formList) {
              that.checkDataContent(form,orgForm)
            }else{
              let fData = []
              if (formList) {
                let fDataKeys = Object.keys(form)
                fDataKeys.forEach(function (key) {
                  if (form[key] !== orgForm[key]){
                    if (form[key])
                      fData.push(form[key])
                    if (orgForm[key])
                      fData.push(orgForm[key])
                  }
                })
                formList.forEach(function (form) {
                  form.forEach(function (formItem) {
                    if (fData.indexOf(formItem.value) > -1){
                      formItem.classList.add('check-key-data')
                    }
                  })
                })
              }
            }
          },1000)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 20px;
  }
</style>
<style scoped>
  .task-detail >>> .title-container:not(.task-title) {
    display: none !important;
  }

  .task-detail >>> .y-options {
    display: none !important;
  }

  .task-detail >>> .el-card__body, .task-detail >>> .el-card__body .app-container {
    padding: 0;
  }
  .task-detail >>> .el-card__body .check-key-data,.task-detail >>> .el-card__body .check-key-data *{
    color: red !important;
  }
</style>
