<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title">基</div>
                    <div class="icon-info">基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="18">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="学生姓名：" prop="planCount" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.planCount" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="性别：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.sex" placeholder="性别" clearable class="filter-item" style="width: 100%">
                            <el-option v-for="item in AllEnum.性别" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="出生日期：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-date-picker
                            v-model="postForm.birthday"
                            type="date"
                            placeholder="出生日期"
                            style="width:100%"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="民族：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.memberNation" placeholder="民族" clearable class="filter-item"
                                     style="width: 100%"
                          >
                            <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件类型：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.memberCertificationType" placeholder="证件类型" clearable
                                     class="filter-item" style="width: 100%"
                          >
                            <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件号码：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.memberIdNo" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="联系电话：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.memberIdNo" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="家庭地址：" prop="type" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.memberIdNo" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="" prop="type" label-width="80px" class="postInfo-container-item">
                        <fileUpload
                          ref="uploadCourseChapter1"
                          :isdisabled="false"
                          :file-list="[{path:postForm.planGraph}]"
                          :style-type="1"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(21,72,111)">卡</div>
                    <div class="icon-info">持卡信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="邮政卡卡号：" prop="planCount" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="持卡人姓名：" prop="planCount" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="持卡人联系方式：" prop="planCount" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="开户行：" prop="planCount" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">考</div>
                    <div class="icon-info">报考信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="报读年级：" prop="gradeId" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.gradeId"
                        placeholder="请选择年级"
                        clearable
                        style="width: 100%"
                        class="filter-item"
                      >
                        <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="报读专业：" prop="specialtyId" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.specialtyId"
                        placeholder="请选择专业"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in specialty" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="报读班级：" prop="specialtyId" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.clbumId"
                        placeholder="请选择班级"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in clbumInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">

                    <el-form-item label="是否住校：" prop="type" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.memberGuardian2" placeholder="是否住校" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="报考原因：" prop="courseDate" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.memberHealth" placeholder="健康状况" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.报考原因" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>


                  <el-col :span="6">
                    <el-form-item label="健康状况：" prop="deadTime" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.memberGuardian2" placeholder="是否住校" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt2" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="postForm.memberGuardian2">
                    <el-form-item label="病情描述" prop="deadTime" label-width="150px" class="postInfo-container-item">
                      <el-input v-if="postForm.memberGuardian2" type="textarea" :rows="6" maxlength="500" v-model="postForm.id" show-word-limit />
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#9E9CF4">毕</div>
                    <div class="icon-info">毕业信息</div>
                  </h3>
                </div>

                <el-row>

                  <el-col :span="6">
                    <el-form-item label="毕业学校：" prop="type" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.admissionIds"
                                 style="width:100%"
                                 placeholder="请选择招生生源地">
                        <el-option
                          v-for="item in areaInfo"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="毕业班级名称：" prop="type" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.memberIdNo" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否参加二诊：" prop="type" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.memberGuardian2" placeholder="是否住校" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt1" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="postForm.memberGuardian2">
                    <el-form-item label="二诊分数：" prop="type" label-width="150px" class="postInfo-container-item">
                      <el-input  style="x`width: 100%" v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否参加中考：" prop="planCount" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.memberGuardian2" placeholder="是否住校" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt1" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" v-if="postForm.memberGuardian2" >
                    <el-form-item label="中考分数：" prop="planCount" label-width="150px" class="postInfo-container-item">

                      <el-input style="width: 100%" v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" v-if="postForm.memberGuardian2" >
                    <el-form-item label="中考报名号：" prop="planCount" label-width="150px" class="postInfo-container-item">

                      <el-input  v-if="postForm.memberGuardian2" style="width: 100%" v-model="postForm.planCount" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import { validURL } from '@/utils/validate'
import YDetailPageLayout from '@/components/YDetailPageLayout'
import fileUpload from '@/components/FileUpload'

export default {
  name: 'ComplexTable',
  components: {
    Breadcrumb,
    YDetailPageLayout,
    fileUpload
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      opt2: [{
        key: true,
        label: '有病史'
      }, {
        key: false,
        label: '无病史'
      }],
      opt1: [{
        key: true,
        label: '参加'
      }, {
        key: false,
        label: '未参加'
      }],
      opt: [{
        key: true,
        label: '是'
      }, {
        key: false,
        label: '否'
      }],
      specialty: [],
      gradeInfo: [],
      type: 'detail',
      postForm: {},
      rules: {
        gradeId: [{
          required: true,
          message: '请选择年纪',
          trigger: 'blur'
        }],
        specialtyId: [{
          required: true,
          message: '请选择专业',
          trigger: 'blur'
        }],
        planCount: [{
          required: true,
          message: '请输入计划招生人数',
          trigger: 'blur'
        }],
        deadTime: [{
          required: true,
          message: '请选择截止时间',
          trigger: 'change'
        }]
      },
      dataId: this.$route.query.id,
      AllEnum:[],
      areaInfo:[],
      clbumInfo:[]
    }
  },
  watch: {
    detailInfo: function (value) {
      this.postForm = value
    },
  },
  created() {
    let that = this
    if (this.detailInfo) {
      this.postForm = this.detailInfo
    } else {
      this.getDetail()
    }

    that.getSpecialtyList()
    that.getGradeList()
    that.getClbumList()
    that.getAllEnum()
    that.getAreaList()
  },
  methods: {
    getAreaList() {
      const that = this
      that.$api.admissionSource.listAll().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.areaInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getAllEnum() {
      let that = this
      that.$api.globalConfig.getAllEnum().then(data => {
        if (data.code === 200) {
          that.AllEnum = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getSpecialtyList() {
      const that = this
      that.$api.baseInfo.getSpecialtyList().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.specialty = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getGradeList() {
      const that = this
      that.$api.baseInfo.getGradeList().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.gradeInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getClbumList() {
      const that = this
      that.$api.baseInfo.getClbumList().then(data => {
        that.loading = false
        if (data.code === 200) {
          // 返回成功
          that.clbumInfo = data.data
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    getDetail() {
      if (this.dataId) {
        this.$api.plan.detail(this.dataId).then(res => {
          this.postForm = res.data
        })
      }
    },
    handleCreate() {
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.plan.edit(this.postForm).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                })
                const back = this.$route.query.back
                if (back) {
                  this.$router.push(back)
                }
              }
            })
          }
        })
      } else { // 新增
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.plan.add(this.postForm).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
                const back = this.$route.query.back
                if (back) {
                  this.$router.push(back)
                }
              }
            })
          }
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
/*@import "~@/styles/mixin.scss";*/
</style>
