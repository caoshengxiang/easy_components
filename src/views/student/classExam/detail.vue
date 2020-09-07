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
                  <el-form-item label="年份：" prop="year" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="年份" type="number" v-model="postForm.year" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学期：" prop="termId" label-width="150px" class="postInfo-container-item">

                    <el-select
                      v-model="postForm.termId"
                      placeholder="学期"
                      clearable
                      style="width: 100%"
                      class="filter-item"
                    >
                      <el-option v-for="item in termOptions" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="考核学月：" prop="month" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="月份" type="number" v-model="postForm.month" class="filter-item"/>
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
      grantType: [  {
        key: '',
        label: '全部'
      },{
        key: 1,
        label: '奖学金'
      }, {
        key: 2,
        label: '助学金'
      }],
      areaInfo:[],
      specialty: [],
      gradeInfo: [],
      classInfo:[],
      majorInfo:[],
      studentInfo:[],
      type: 'detail',
      postForm: {},
      rules: {
        year: [{
          required: true,
          message: '年份',
          trigger: 'blur'
        }],
        month: [{
          required: true,
          message: '月份',
          trigger: 'blur'
        }],
        termId: [{
          required: true,
          message: '学期',
          trigger: 'blur'
        }],
      },
      departmentList: [],
      staff: [],
      dataId: this.$route.query.id,
      termOptions: [],
      yearsOptions: []
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
    that.getDepartmentList() // //查询建筑物列表
    that.getSpecialtyList()
    that.getGradeList()
    that.getTerm()

  },
  methods: {
    getTerm() {
      this.$api.dormitoryCheck.terms().then(res => {
        this.termOptions = res.data
      })
      this.$api.dormitoryCheck.years().then(res => {
        this.yearsOptions = res.data
      })
    },
    getDepartmentList() {
      const that = this
      that.$api.organization.simpleAll().then(data => {
        that.loading = false
        if (data.code === 200) {
          that.departmentList = data.data
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
          that.classInfo = data.data
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
          that.majorInfo = data.data
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
      that.$api.baseInfo.getClbumList({
        gradeId: that.postForm.administrativeGradeId,
        specialtyId: that.postForm.administrativeSpecialtyId
      }).then(data => {
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
    getStudent(){
      const that = this
      if(!that.postForm.administrativeClbumId){
        that.studentInfo = []
      }
      else {
        that.$api.student.getStudentList({
          administrativeGradeId: that.postForm.administrativeGradeId,
          administrativeSpecialtyId: that.postForm.administrativeSpecialtyId,
          administrativeSchoolClbumId: that.postForm.administrativeClbumId
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.studentInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }
    },
    getDetail() {
      if (this.dataId) {
        this.$api.grant.detail(this.dataId).then(res => {
          this.postForm = res.data
        })
      }
    },
    handleCreate() {
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.classExam.edit(this.postForm).then(res => {
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
            this.$api.classExam.add(this.postForm).then(res => {
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
