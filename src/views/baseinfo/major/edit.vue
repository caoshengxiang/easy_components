<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业代码：" prop="code" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.code" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业名称：" prop="name" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.name" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="专业简称：" prop="alias" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.alias" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="所属部系：" prop="departmentId" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.departmentId" clearable filterable style="width: 100%">
                        <el-option v-for="item in departList" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="学制：" prop="academicYear" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.academicYear" clearable filterable style="width: 100%">

                        <el-option v-for="item in AllEnum.学制" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="班级类型：" prop="classType" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.classType" placeholder="多个以中文逗号隔开" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="专业技能方向："
                      prop="skillDirection"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.skillDirection" placeholder="" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="修业年限："
                      prop="studyDuration"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.studyDuration" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="批准设置日期："
                      prop="approveDate"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-date-picker
                        v-model="postForm.approveDate"

                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="首次招生日期："
                      prop="firstEnrollDate"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-date-picker
                        v-model="postForm.firstEnrollDate"

                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否停招：" prop="ifStop" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.ifStop"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="停招时间	：" prop="stopDate" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.stopDate"

                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="是否撤销：" prop="ifRevocation" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.ifRevocation"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="撤销时间："
                      prop="revocationDate"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-date-picker
                        v-model="postForm.revocationDate"

                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item label="重点专业：" prop="keySpecialty" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.keySpecialty"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.重点专业" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="特色专业："
                      prop="featuredSpecialty"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.featuredSpecialty"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.特色专业" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="国际合作专业："
                      prop="ifInternational"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifInternational"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="校企合作专业："
                      prop="ifSchoolEnterprise"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifSchoolEnterprise"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6">
                    <el-form-item
                      label="是否全日制专业："
                      prop="ifFullTime"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifFullTime"
                        placeholder=""
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6" :span="6" />
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
        editStatus:true,

        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        type: 'detail',
        postForm: {},
        rules: {
          code: [{
            required: true,
            message: '请填写专业编号',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写专业名称',
            trigger: 'change'
          }],
          departmentId: [{
            required: true,
            message: '请选择系部',
            trigger: 'change'
          }],
          alias: [{
            required: true,
            message: '请输入专业简称',
            trigger: 'change'
          }],
          academicYear: [{
            required: true,
            message: '请选择学制',
            trigger: 'change'
          }],
          classType: [{
            required: true,
            message: '请输入班级类型',
            trigger: 'change'
          }],
          skillDirection: [{
            required: true,
            message: '请输入专业技能方向',
            trigger: 'change'
          }],
          studyDuration: [{
            required: true,
            message: '请输入专业年限',
            trigger: 'change'
          }],
          approveDate: [{
            required: true,
            message: '请选择批准设置日期',
            trigger: 'change'
          }],
          firstEnrollDate: [{
            required: true,
            message: '请选择首次招生日期',
            trigger: 'change'
          }],
          ifStop: [{
            required: true,
            message: '请选择是否停招',
            trigger: 'change'
          }],
          stopDate: [{
            required: true,
            message: '请选择停招时间',
            trigger: 'change'
          }],
          ifRevocation: [{
            required: true,
            message: '请选择是否撤销',
            trigger: 'change'
          }],
          revocationDate: [{
            required: true,
            message: '请选择撤销时间',
            trigger: 'change'
          }],
          keySpecialty: [{
            required: true,
            message: '请选择重点专业',
            trigger: 'change'
          }],
          featuredSpecialty: [{
            required: true,
            message: '请选择特色专业',
            trigger: 'change'
          }],
          ifInternational: [{
            required: true,
            message: '请选择是否国际合作专业',
            trigger: 'change'
          }],
          ifSchoolEnterprise: [{
            required: true,
            message: '请选择是否校企合作专业',
            trigger: 'change'
          }],
          ifFullTime: [{
            required: true,
            message: '请选择是否全日制专业',
            trigger: 'change'
          }],
        },
        gangwei: [],
        staff: [],
        AllEnum: [],
        departList: []
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }
      that.simpleAll()
      that.getAllEnum()
      that.getdepartList()
    },
    methods: {

      getdepartList() {
        const that = this
        that.$api.department.list({
          current: 0,
          size: 10000
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.departList = data.data.records
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
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
      simpleAll() {
        const that = this
        that.$api.post.simpleAll().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.gangwei = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      staffAll() {
        const that = this
        that.$api.staff.staffpost({ postId: that.postForm.type }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.staff = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getDetail() {
        const that = this
        that.$api.major.detail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save() {
        const that = this
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.major.edit({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/major/list',
                  // })
                  const back = this.$route.query.back
                  if (back) {
                    that.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              // //新增
              // //编辑
              that.$api.major.add({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/major/list',
                  // })
                  const back = this.$route.query.back
                  if (back) {
                    that.$router.push(back)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .staff-detail {
  }

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;
  }
</style>
