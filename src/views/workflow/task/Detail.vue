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
        <component :is="componentsId(form.menuNo)" :detailInfo="formData"></component>
      </el-card>
      <el-card v-if="show" class="y-form-card">
        <div slot="header" class="clearfix">
          <span>申请历史</span>
        </div>
        <component :is="componentsId(form.menuNo)" :detailInfo="originData"></component>
      </el-card>
    </y-detail-page-layout>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  //功能详情列表
  //姚备注，需要用的列表加到list里面
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
    recruitTaskDetail: () => import('@/views/recruit/task/detail'),
    recruitTaskPlan: () => import('@/views/recruit/plan/detail'),
    recruitBirthPalce: () => import('@/views/recruit/birthplace/detail'),
    studentMorningExam: () => import('@/views/student/morningExam/detail'),
    studentLoseStudent: () => import('@/views/student/loseStudent/detail'),
    studentClassExam: () => import('@/views/student/classExam/detail'),
    baseInfoAssetInfoUserInfo6: () => import('@/views/baseinfo/userinfo6/detailInfo'),
    moralManageSetNotice: () => import('@/views/moralManage/classNotice/setNotice'),
    moralManageRule: () => import('@/views/moralManage/notification/detail'),
    moralManageCommentManage: () => import('@/views/moralManage/commentManage/detail'),
    moralManageCommonCommentManage: () => import('@/views/moralManage/commonCommentManage/detail'),
    moralManageScoreManage: () => import('@/views/moralManage/scoreManage/detail'),
    rewardsAndPunishmentsInfoDetail: () => import('@/views/rewardsAndPunishments/info/detail'),
    rewardsAndPunishmentsUndoDetail: () => import('@/views/rewardsAndPunishments/undo/detail'),
    communityManage: () => import('@/views/leagueActivities/communityManage/detail'),
    memberManage: () => import('@/views/leagueActivities/memberManage/detail'),
    branchManage: () => import('@/views/leagueActivities/branchManage/detail'),
    leagueMember: () => import('@/views/leagueActivities/leagueMember/detail'),
    leagueFee: () => import('@/views/leagueActivities/leagueFee/detail'),
    studentCadres: () => import('@/views/leagueActivities/studentCadres/detail'),
    studentActivities: () => import('@/views/leagueActivities/studentActivities/detail'),
    leagueMemberActivities: () => import('@/views/leagueActivities/leagueMemberActivities/detail'),
    dormitoryBatchApprove: ()=>import('../../../views/dormitory/dormitoryCheck/listBatch_approve'),
    dormitoryApprove: ()=>import('../../../views/dormitory/dormitoryCheck/checkRecord_approve'),
    dormitoryCheck: () => import('@//views/dormitory/dormitoryCheck/add'),
    classRecord: () => import('@/views/dormitory/classRecord/add'),
    classNotice:() =>('@/views/moralManage/classNotice/detailForFlow')
  }
  export default {
    name: 'WorkflowDetail',
    components: {
      Breadcrumb,
      YDetailPageLayout,
      'studentClassExam':detailList.studentClassExam,
      'dormitoryCheck': detailList.dormitoryCheck,
      'classRecord': detailList.classRecord,
      'communityManage': detailList.communityManage,
      'memberManage': detailList.memberManage,
      'branchManage': detailList.branchManage,
      'leagueMember': detailList.leagueMember,
      'leagueFee': detailList.leagueFee,
      'studentCadres': detailList.studentCadres,
      'studentActivities': detailList.studentActivities,
      'leagueMemberActivities': detailList.leagueMemberActivities,
      'baseInfoAssetInfo': detailList.baseInfoAssetInfo,
      'baseInfoAssetInfoBuilding': detailList.baseInfoAssetInfoBuilding,
      'baseInfoAssetInfoRoom': detailList.baseInfoAssetInfoRoom,
      'baseInfoAssetInfoTraining': detailList.baseInfoAssetInfoTraining,
      'baseInfoAssetInfoFacilities': detailList.baseInfoAssetInfoFacilities,
      'baseInfoAssetInfoDepartment': detailList.baseInfoAssetInfoDepartment,
      'baseInfoAssetInfoCourse': detailList.baseInfoAssetInfoCourse,
      'baseInfoAssetInfoMajor': detailList.baseInfoAssetInfoMajor,
      'baseInfoAssetInfoGrade': detailList.baseInfoAssetInfoGrade,
      'baseInfoAssetInfoClass': detailList.baseInfoAssetInfoClass,
      'baseInfoAssetInfoUserInfo': detailList.baseInfoAssetInfoUserInfo,
      'baseInfoAssetInfoStdInfo': detailList.baseInfoAssetInfoStdInfo,
      'baseInfoAssetInfoDormitory': detailList.baseInfoAssetInfoDormitory,
      'baseInfoAssetInfoStdDeleteInfo': detailList.baseInfoAssetInfoStdDeleteInfo,
      'baseInfoAssetInfoStdMoveInfo': detailList.baseInfoAssetInfoStdMoveInfo,
      'TeachingAffairsSemesterEdit': detailList.TeachingAffairsSemesterEdit,
      'TeachingAffairsSemesterClassTime': detailList.TeachingAffairsSemesterClassTime,
      'staffDetail': detailList.staffDetail,
      'staffEduDetail': detailList.staffEduDetail,
      'staffwageDetail': detailList.staffwageDetail,
      'dormitoryBatchApprove': detailList.dormitoryBatchApprove,
      'dormitoryApprove': detailList.dormitoryApprove,
      'recruitTaskDetail':detailList.recruitTaskDetail,
      'recruitTaskPlan': detailList.recruitTaskPlan,
      'recruitBirthPalce':  detailList.recruitBirthPalce,
      'studentMorningExam': detailList.studentMorningExam,
      'studentLoseStudent': detailList.studentLoseStudent,
      'baseInfoAssetInfoUserInfo6': detailList.baseInfoAssetInfoUserInfo6,
      'moralManageSetNotice': detailList.moralManageSetNotice,
      'moralManageRule': detailList.moralManageRule,
      'moralManageCommentManage': detailList.moralManageCommentManage,
      'moralManageCommonCommentManage': detailList.moralManageCommonCommentManage,
      'moralManageScoreManage': detailList.moralManageScoreManage,
      'rewardsAndPunishmentsInfoDetail': detailList.rewardsAndPunishmentsInfoDetail,
      'rewardsAndPunishmentsUndoDetail': detailList.rewardsAndPunishmentsUndoDetail,
      'classNotice':detailList.classNotice
    },
    props: {
      //保存方法
      detailInfo: {
        type: Object,
        default: {}
      }
    },
    computed:{
      componentsId:function () {
        return function (menuNo) {
          switch (menuNo) {
            case '_views_student_classExam_list':
              return this.componentsAuditList.studentClassExam
            case '_views_dormitory_dormitoryCheck_list':
              return this.componentsAuditList.dormitoryCheck
            case '_views_dormitory_classRecord_list':
              return this.componentsAuditList.classRecord
            case '_views_leagueActivities_communityManage_list':
              return this.componentsAuditList.communityManage
            case '_views_leagueActivities_memberManage_list':
              return this.componentsAuditList.memberManage
            case '_views_leagueActivities_branchManage_list':
              return this.componentsAuditList.branchManage
            case '_views_leagueActivities_leagueMember_list':
              return this.componentsAuditList.leagueMember
            case '_views_leagueActivities_leagueFee_list':
              return this.componentsAuditList.leagueFee
            case '_views_leagueActivities_studentCadres_list':
              return this.componentsAuditList.studentCadres
            case '_views_rewardsAndPunishments_info_list':
              return this.componentsAuditList.studentActivities
            case '_views_leagueActivities_leagueMemberActivities_list':
              return this.componentsAuditList.leagueMemberActivities
            case '_views_leagueActivities_studentActivities_list':
              return this.componentsAuditList.rewardsAndPunishmentsInfoDetail
            case '_views_rewardsAndPunishments_undo_list':
              return this.componentsAuditList.rewardsAndPunishmentsUndoDetail
            case '_views_baseinfo_assetinfo_list':
              return this.componentsAuditList.baseInfoAssetInfo
            case '_views_baseinfo_assetinfo_buildinglist':
              return this.componentsAuditList.baseInfoAssetInfoBuilding
            case '_views_baseinfo_assetinfo_roomlist':
              return this.componentsAuditList.baseInfoAssetInfoRoom
            case '_views_baseinfo_assetinfo_traininglist':
              return this.componentsAuditList.baseInfoAssetInfoTraining
            case '_views_baseinfo_assetinfo_facilitieslist':
              return this.componentsAuditList.baseInfoAssetInfoFacilities
            case '_views_baseinfo_department_list':
              return this.componentsAuditList.baseInfoAssetInfoDepartment
            case '_views_baseinfo_course_list':
              return this.componentsAuditList.baseInfoAssetInfoCourse
            case '_views_baseinfo_major_list':
              return this.componentsAuditList.baseInfoAssetInfoMajor
            case '_views_baseinfo_grade_list':
              return this.componentsAuditList.baseInfoAssetInfoGrade
            case '_views_baseinfo_class_list':
              return this.componentsAuditList.baseInfoAssetInfoClass
            case '_views_baseinfo_userinfo_list':
              return this.componentsAuditList.baseInfoAssetInfoUserInfo
            case '_views_dormitory_dormitoryInfo_dormitoryStdList':
              return this.componentsAuditList.baseInfoAssetInfoStdInfo
            case '_views_dormitory_dormitoryInfo_list':
              return this.componentsAuditList.baseInfoAssetInfoDormitory
            case '_views_dormitory_dormitoryInfo_dormitoryStdList_remove':
              return this.componentsAuditList.baseInfoAssetInfoStdDeleteInfo
            case '_views_dormitory_dormitoryInfo_dormitoryStdList_move':
              return this.componentsAuditList.baseInfoAssetInfoStdMoveInfo
            case '_views_teachingAffairs_semester_list':
              return this.componentsAuditList.TeachingAffairsSemesterEdit
            case '_views_teachingAffairs_semester_classTime':
              return this.componentsAuditList.TeachingAffairsSemesterClassTime
            case '_views_staff_list':
              return this.componentsAuditList.staffDetail
            case '_views_staff_eduDetail':
              return this.componentsAuditList.staffEduDetail
            case '_views_staff_wageDetail':
              return this.componentsAuditList.staffwageDetail
            case '_views_recruit_task_list':
              return this.componentsAuditList.recruitTaskDetail
            case '_views_recruit_plan_list':
              return this.componentsAuditList.recruitTaskPlan
            case '_views_recruit_birthplace_list':
              return this.componentsAuditList.recruitBirthPalce
            case '_views_student_morningExam_list':
              return this.componentsAuditList.studentMorningExam
            case '_views_student_loseStudent_list':
              return this.componentsAuditList.studentLoseStudent
            case '_views_baseinfo_userinfo6_list':
              return this.componentsAuditList.baseInfoAssetInfoUserInfo6

            case '_views_moralManage_classNotice_list':
              return this.componentsAuditList.classNotice
            case '_views_moralManage_classNotice_setNotice':
              return this.componentsAuditList.moralManageSetNotice
            case '_views_moralManage_notification_list':
              return this.componentsAuditList.moralManageRule
            case '_views_moralManage_commentManage_list':
              return this.componentsAuditList.moralManageCommentManage
            case '_views_moralManage_commonCommentManage_list':
              return this.componentsAuditList.moralManageCommonCommentManage
            case '_views_moralManage_scoreManage_list':
              return this.componentsAuditList.moralManageScoreManage

            case '_views_dormitory_dormitoryCheck_checkRecord':
              return this.componentsAuditList.dormitoryApprove
            case '_views_dormitory_dormitoryCheck_list_dormitoryDeduction':
              return this.componentsAuditList.dormitoryBatchApprove
          }
          return ''
        }
      }
    },
    data() {
      return {
        form: {},
        formData: {},
        originData: {},
        show: false,
        componentsAuditList:{
          classNotice:'classNotice',
          studentClassExam:'studentClassExam',
          dormitoryCheck:'dormitoryCheck',
          classRecord:'classRecord',
          rewardsAndPunishmentsInfoDetail:'rewardsAndPunishmentsInfoDetail',
          rewardsAndPunishmentsUndoDetail:'rewardsAndPunishmentsUndoDetail',
          baseInfoAssetInfo:'baseInfoAssetInfo',
          baseInfoAssetInfoBuilding:'baseInfoAssetInfoBuilding',
          baseInfoAssetInfoRoom:'baseInfoAssetInfoRoom',
          baseInfoAssetInfoTraining:'baseInfoAssetInfoTraining',
          baseInfoAssetInfoFacilities:'baseInfoAssetInfoFacilities',
          baseInfoAssetInfoDepartment:'baseInfoAssetInfoDepartment',
          baseInfoAssetInfoCourse:'baseInfoAssetInfoCourse',
          baseInfoAssetInfoMajor:'baseInfoAssetInfoMajor',
          baseInfoAssetInfoGrade:'baseInfoAssetInfoGrade',
          baseInfoAssetInfoClass:'baseInfoAssetInfoClass',
          baseInfoAssetInfoUserInfo:'baseInfoAssetInfoUserInfo',
          baseInfoAssetInfoStdInfo:'baseInfoAssetInfoStdInfo',
          baseInfoAssetInfoDormitory:'baseInfoAssetInfoDormitory',
          baseInfoAssetInfoStdDeleteInfo:'baseInfoAssetInfoStdDeleteInfo',
          baseInfoAssetInfoStdMoveInfo:'baseInfoAssetInfoStdMoveInfo',
          TeachingAffairsSemesterEdit:'TeachingAffairsSemesterEdit',
          TeachingAffairsSemesterClassTime:'TeachingAffairsSemesterClassTime',
          staffDetail:'staffDetail',
          staffEduDetail:'staffEduDetail',
          staffwageDetail:'staffwageDetail',
          recruitTaskDetail:'recruitTaskDetail',
          recruitTaskPlan: 'recruitTaskPlan',
          recruitBirthPalce: 'recruitBirthPalce',
          studentMorningExam: 'studentMorningExam',
          studentLoseStudent: 'studentLoseStudent',
          baseInfoAssetInfoUserInfo6: 'baseInfoAssetInfoUserInfo6',
          moralManageSetNotice: 'moralManageSetNotice',
          moralManageRule: 'moralManageRule',
          moralManageCommentManage: 'moralManageCommentManage',
          moralManageCommonCommentManage: 'moralManageCommonCommentManage',
          moralManageScoreManage: 'moralManageScoreManage',
          communityManage: 'communityManage',
          memberManage: 'memberManage',
          branchManage: 'branchManage',
          leagueMember: 'leagueMember',
          leagueFee: 'leagueFee',
          studentCadres: 'studentCadres',
          studentActivities: 'studentActivities',
          leagueMemberActivities: 'leagueMemberActivities',
          dormitoryBatchApprove:'dormitoryBatchApprove',
          dormitoryApprove:'dormitoryApprove',
        }
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
