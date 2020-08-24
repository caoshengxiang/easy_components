<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true" menu-no="_views_set_info_edit">
      <el-tabs value="first" style="position: relative; top: -18px;"><!--兼容对齐加了一个空的-->
        <el-tab-pane label="基础信息" name="first">
          <el-form
            v-loading="listLoading"
            label-width="160px"
            ref="postForm"
            :model="postForm"
            class="form-container"
          >

            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-bottom: 30px;" class="info-title-box">
                  <h3 class="title" style="margin-top: 0">
                    <div class="avatar-wrapper icon-title">基</div>
                    <div class="icon-info">学校基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="学校标识码" class="postInfo-container-item">
                      <el-input v-model="postForm.CODE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="学校名称" class="postInfo-container-item">
                      <el-input v-model="postForm.SCHOOL_NAME.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="所在地区" class="postInfo-container-item">
                      <el-input v-model="postForm.REGION.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="所在城市" class="postInfo-container-item">
                      <el-input v-model="postForm.CITY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="当前校名启用日期" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.SCHOOL_NAME_DATE.value" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.SCHOOL_NAME_DATE.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="建校日期" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.BUILD_DATE.value" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.BUILD_DATE.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="建校基础" class="postInfo-container-item">
                      <el-input v-model="postForm.BUILD_BASE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="学校举办者" class="postInfo-container-item">
                      <el-input v-model="postForm.SCHOOL_HOST.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="上级主管" class="postInfo-container-item">
                      <el-input v-model="postForm.SUPERVISOR.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="教学主管部门" class="postInfo-container-item">
                      <el-input v-model="postForm.TEACHING_DEPARTMENT.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="学校性质类别" class="postInfo-container-item">
                      <el-input v-model="postForm.SCHOOL_PROPERTY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <div>&nbsp;</div>
                  </el-col>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px" class="info-title-box">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(124,194,255)">示</div>
                    <div class="icon-info">示范性中等职业学校级别</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="示范性中等职业学校立项部门" class="postInfo-container-item">
                      <el-input v-model="postForm.PROJECT_DEPARTMENT.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="示范性中等职业学校立项日期" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.PROJECT_DATE.value" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.PROJECT_DATE.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="重点中等职业学校级别" class="postInfo-container-item">
                      <el-input v-model="postForm.IMPORT_LEVEL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="重点中等职业学校立项部门" class="postInfo-container-item">
                      <el-input v-model="postForm.IMPORT_PROJECT_DEPARTMENT.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="重点中等职业学校立项日期" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.IMPORT_PROJECT_DATE.value" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.IMPORT_PROJECT_DATE.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8"/>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="复核结论" class="postInfo-container-item">
                      <el-input v-model="postForm.CONCLUSION.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="复核日期" class="postInfo-container-item">
                      <!--                      <el-input v-model="postForm.MAILING_ADDR.value" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.CHECK_DATE.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px" class="info-title-box">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">法</div>
                    <div class="icon-info">法人信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="通信地址" class="postInfo-container-item">
                      <el-input v-model="postForm.MAILING_ADDR.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="邮政编码" class="postInfo-container-item">
                      <el-input v-model="postForm.POSTAL_CODE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="学校网址" class="postInfo-container-item">
                      <el-input v-model="postForm.SCHOOL_WEBSITE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息教工号" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_NO.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息姓名" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_NAME.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息性别" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_SEX.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息职务" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_DUTY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息区号-电话号码" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_PHONE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息手机号" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_MOBILE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="法定代表人信息电子邮箱" class="postInfo-container-item">
                      <el-input v-model="postForm.LEGAL_PERSON_EMAIL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8"/>
                  <el-col :span="12" :lg="8"/>
                </el-row>

                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px" class="info-title-box">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(100,217,214)">联</div>
                    <div class="icon-info">联系人信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息教工号" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_NO.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息姓名" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_NAME.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息性别" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_SEX.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息职务" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_DUTY.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息区号-电话号码" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_PHONE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息手机号" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_MOBILE.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8">
                    <el-form-item label="联系人信息电子邮箱" class="postInfo-container-item">
                      <el-input v-model="postForm.CONTACTER_PERSON_EMAIL.value" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :lg="8"/>
                  <el-col :span="12" :lg="8"/>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="" name="two"/>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  const defaultForm = {}

  export default {
    name: 'SetInfo',
    components: {
      Breadcrumb,
      YDetailPageLayout
    },
    data() {
      return {
        listLoading: false,
        postForm: Object.assign({}, defaultForm),
        rules: {
          type: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        this.listLoading = true
        this.$api.globalConfig.getValuesByKey({ key: 'BASE_INFO' }).then(res => {
          this.postForm = res.data.fieldValues
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleCreate() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.globalConfig.detail({
              key: 'BASE_INFO',
              fieldValues: this.postForm
            }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0;
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;

  }
</style>
