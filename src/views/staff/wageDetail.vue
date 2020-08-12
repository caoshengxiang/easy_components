<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="false" v-loading="vLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
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
                    <el-form-item label="职工编号：" label-width="180px" class="postInfo-container-item">
                      <!--                      <el-input disabled v-model="" class="filter-item"/>-->
                      <span>{{ postForm.staff.staffNo }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="职工姓名：" label-width="180px" class="postInfo-container-item">
                      <!--                      <el-input disabled v-model="postForm.user.name" class="filter-item"/>-->
                      <span>{{ postForm.user.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="性别：" label-width="180px" class="postInfo-container-item">
                      <!--                      <el-input disabled v-model="postForm.user.sex" class="filter-item"/>-->
                      <span>{{ postForm.user.sex }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="身份证号：" label-width="180px" class="postInfo-container-item">
                      <!--                      <el-input disabled v-model="postForm.user.idNo" class="filter-item"/>-->
                      <span>{{ postForm.user.idNo }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="基本工资：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.baseSalary" class="filter-item"/>
                      <!--                      <span>{{postForm.staff.baseSalary}}</span>-->
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="学段：" label-width="180px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.staff.phase"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="(item, index) in AllEnum['学段']" :key="index" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">工</div>
                    <div class="icon-info">工资情况</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="岗位工资或见习期工资	：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.postSalary" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="薪级工资：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.gradeSalary" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="10%工资：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.tenSalary" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="农村教师津补贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.countryAllowance" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="农村教师岗位补助：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.countrySubsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="乡镇工作补贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.townSubsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="津补贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.subsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="教龄津贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.teachingAgeSubsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="独子费：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.onlyFee" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="70%绩效：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.seventyPerformance" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="特教津贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.specialSubsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="特级教师津贴：" label-width="180px" class="postInfo-container-item">
                      <el-input v-model="postForm.staff.specialTeacherSubsidy" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="工资总额：" label-width="180px" class="postInfo-container-item">
                      <!--                      <span style="color: red;font-size: 16px;font-weight: bold;">0</span>-->
                      <el-input v-model="postForm.staff.totalSalary" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6"/>
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
    data() {
      return {
        vLoading: false,
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
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
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
            this.$api.staff.editsalaryBase(this.postForm).then(res => {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
