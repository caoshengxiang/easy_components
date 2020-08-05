<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="false"  v-loading="vLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="学历证书" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title">基</div>
                    <div class="icon-info">基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职工编号：" label-width="140px" class="postInfo-container-item">
                      <span>{{postForm.staff.staffNo}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职工姓名：" label-width="140px" class="postInfo-container-item">
                      <span>{{postForm.user.name}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="性别：" label-width="140px" class="postInfo-container-item">
                      <span>{{postForm.user.sex}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="身份证号：" label-width="140px" class="postInfo-container-item">
                      <span>{{postForm.user.idNo}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="有无教师资格证：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.hasTeacherCertification"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option key="1" label="有" :value="true"/>
                        <el-option key="2" label="无" :value="false"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教师资格类型：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.teacherCertificationType" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职称类型：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.professionalTitleType" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="获专业技术职务时间：" label-width="140px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.obtainDutyDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder=""
                        style="width: 100%;"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业技术职务级别：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.dutyLevel"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['专业技术职务级别']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="聘任专业技术职务：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.professionalDuty"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['聘任专业技术职务']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">全</div>
                    <div class="icon-info">全日制学历</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="全日制学历(学位)：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.education"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['全日制学历(学位)']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="学位：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.degree"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['学位']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业时间：" label-width="140px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.graduateDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder=""
                        style="width: 100%"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业院校：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.graduateSchool" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业专业：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.graducateSpecialty" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#FD774B">最</div>
                    <div class="icon-info">最高学历</div>
                  </h3>
                </div>

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="最高学历(学位)：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.highestEducation"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['最高学历(学位)']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="学位：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.highestDegree"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['学位']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业时间：" label-width="140px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.highestGraduateDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业院校：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.highestGraduateSchool" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="毕业专业：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.highestGraducateSpecialty" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#FF687B">专</div>
                    <div class="icon-info">专业技术职务(最高)：</div>
                  </h3>
                </div>

                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职位等级：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.dutyCertificateLevel"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['职位等级']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="名称：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.dutyName" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="发证单位：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.issueUnit" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="发证日期：" label-width="140px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.issueDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#43D6B3">职</div>
                    <div class="icon-info" style="width: 75px">职业资格证书</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="等级：" label-width="140px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.qulificationCertificateLevel"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style=" width: 100%"
                      >
                        <el-option
                          v-for="(item, index) in AllEnum['职业资格证书']"
                          :key="index"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="证书名称：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.qulificationCertificateName" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="发证单位：" label-width="140px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.qulificationCertificateIssueUnit" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="发证日期：" label-width="140px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.staff.qulificationCertificateIssueDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
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
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {
    user: {},
    staff: {}
  }

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return null
        }
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    data() {
      return {
        type: 'detail',
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请填写年份',
            trigger: 'change'
          }],
        },
        dataId: this.$route.query.id,
        activeName: 'first',
        AllEnum: {},
        vLoading: false,
      }
    },
    created() {
      if (this.detailInfo) {
        this.postForm = this.detailInfo
      } else {
        this.getDetail()
      }
      this.getAllEnum()
    },
    methods: {
      getAllEnum() {
        const that = this
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
      getDetail() {
        if (this.dataId) {
          this.$api.staff.detailBase(this.dataId).then(res => {
            this.postForm = res.data
          })
        }
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.vLoading = true
            this.$api.staff.editEduBase(this.postForm).then(res => {
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
              this.vLoading = false
            }).catch(() => {
              this.vLoading = false
            })
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
</style>
