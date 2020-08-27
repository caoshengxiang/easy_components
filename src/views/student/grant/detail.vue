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
                      placeholder="年份" v-model="postForm.year" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="月份：" prop="month" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="月份" v-model="postForm.month" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="年级：" prop="gradeId" label-width="150px" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.administrativeGradeId"
                      placeholder="年级"
                      clearable
                      style="width:100%"
                      class="filter-item"
                      @change="getClbumList"
                    >
                      <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="专业：" prop="gradeId" label-width="150px" class="postInfo-container-item">

                    <el-select
                      v-model="postForm.administrativeSpecialtyId"
                      placeholder="专业"
                      clearable
                      class="filter-item"
                      @change="getClbumList"
                      style="width:100%"
                    >
                      <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="班级：" prop="administrativeClbumId" label-width="150px" class="postInfo-container-item">

                    <el-select
                      v-model="postForm.administrativeClbumId"
                      placeholder="班级"
                      clearable
                      class="filter-item"
                      style="width:100%"
                      @change="getStudent"
                    >
                      <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学生：" prop="studentId" label-width="150px" class="postInfo-container-item">

                    <el-select
                      v-model="postForm.studentId"
                      placeholder="学生"
                      clearable
                      class="filter-item"
                      style="width:100%"
                    >
                      <el-option v-for="item in studentInfo" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="24">
                  <el-form-item label="类型：" prop="grantType" label-width="150px" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.grantType"
                      placeholder="类型"
                      clearable
                      style="width:100%"
                      class="filter-item"
                    >
                      <el-option v-for="item in grantType" :key="item.key" :label="item.label" :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="应发奖金：" prop="shouldPayAmount" label-width="150px" class="postInfo-container-item">
                    <el-input placeholder="应发奖金" v-model="postForm.shouldPayAmount" class="filter-item"/>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="实发奖金：" prop="actualPayAmount" label-width="150px" class="postInfo-container-item">
                    <el-input placeholder="实发奖金" v-model="postForm.actualPayAmount" class="filter-item"/>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="银行卡号：" prop="bankCard" label-width="150px" class="postInfo-container-item">
                    <el-input placeholder="银行卡号" v-model="postForm.bankCard" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="申请描述：" prop="remark" label-width="150px" class="postInfo-container-item">
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
        studentId: [{
          required: true,
          message: '学生',
          trigger: 'blur'
        }],
        grantType: [{
          required: true,
          message: '助学类型',
          trigger: 'change'
        }],
        shouldPayAmount: [{
          required: true,
          message: '应发金额',
          trigger: 'change'
        }],
        actualPayAmount: [{
          required: true,
          message: '实发金额',
          trigger: 'change'
        }],
        bankCard: [{
          required: true,
          message: '银行卡号',
          trigger: 'change'
        }],
        remark: [{
          required: true,
          message: '描述',
          trigger: 'change'
        }]
      },
      departmentList: [],
      staff: [],
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
    that.getDepartmentList() // //查询建筑物列表
    that.getSpecialtyList()
    that.getGradeList()
  },
  methods: {
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
      that.$api.student.getStudentList({
        gradeId: that.postForm.administrativeGradeId,
        specialtyId: that.postForm.administrativeSpecialtyId,
        schoolClbumId: that.postForm.administrativeClbumId
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
            this.$api.grant.edit(this.postForm).then(res => {
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
            this.$api.grant.add(this.postForm).then(res => {
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
