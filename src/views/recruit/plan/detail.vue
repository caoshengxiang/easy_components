<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="width: 600px;margin: auto;"
          >
            <div class="createPost-main-container">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="招生年级：" prop="gradeId" label-width="150px" class="postInfo-container-item">
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
                <el-col :span="24">
                  <el-form-item label="招生专业：" prop="specialtyId" label-width="150px" class="postInfo-container-item">
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
                <el-col :span="24">
                  <el-form-item label="计划招生人数：" prop="planCount" label-width="150px" class="postInfo-container-item">
                    <el-input v-model="postForm.planCount" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="截止时间：" prop="deadTime" label-width="150px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.deadTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%"
                      placeholder=""
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注：" prop="courseDate" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.remark" show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
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
    },
    methods: {
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
