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
                  <el-form-item label="任务主题：" prop="subject" label-width="150px" class="postInfo-container-item">
                    <el-input
                      placeholder="任务主题" v-model="postForm.subject" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="年级：" prop="gradeId" label-width="150px" class="postInfo-container-item">
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
                  <el-form-item label="负责部门：" prop="respDeptId" label-width="150px" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.respDeptId"
                      placeholder="使用部门"
                      style="width: 100%"
                      clearable
                      class="filter-item"
                    >
                      <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="招生宣讲人：" prop="speakerId" label-width="150px" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.speakerId"
                      placeholder="教室类型"
                      clearable
                      class="filter-item"
                      style="width: 100%"
                    >
                      <el-option v-for="item in staff" :key="item.userId" :label="item.name" :value="item.userId"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="招生生源地：" prop="admissionIds" label-width="150px" class="postInfo-container-item">
                    <el-select v-model="postForm.admissionIds"
                               style="width:100%"
                               @change="changeValue" multiple placeholder="请选择招生生源地">
                      <el-option
                        v-for="item in areaInfo"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="招生目标数：" prop="targetCount" label-width="150px" class="postInfo-container-item">
                    <el-input placeholder="招生目标数"  type="number" :change="check_num()"  v-model="postForm.targetCount" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="任务时间：" prop="deadTime" label-width="150px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.deadTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      style="width:100%"
                      class="filter-item"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      end-placeholder="结束日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="招生内容：" prop="content" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.content" show-word-limit />
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
      areaInfo:[],
      specialty: [],
      gradeInfo: [],
      type: 'detail',
      postForm: {},
      rules: {
        gradeId: [{
          required: true,
          message: '请选择年级',
          trigger: 'blur'
        }],
        subject: [{
          required: true,
          message: '请填写任务主题',
          trigger: 'blur'
        }],
        respDeptId: [{
          required: true,
          message: '请选择负责部门',
          trigger: 'blur'
        }],
        speakerId: [{
          required: true,
          message: '请选择宣讲人',
          trigger: 'change'
        }],
        admissionIds: [{
          required: true,
          message: '请选择生源地',
          trigger: 'change'
        }],
        targetCount: [{
          required: true,
          message: '请选择招生目标数',
          trigger: 'change'
        }],
        deadTime: [{
          required: true,
          message: '请选择任务时间',
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
    that.getStaffList()
    that.getAreaList()
  },
  methods: {
    check_num(){
      var license_num = this.postForm.targetCount;
      license_num = license_num.toString().replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
      if (license_num.indexOf('.') < 0 && license_num != '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        license_num = parseInt(license_num);
      }
      this.postForm.targetCount = license_num;
    },
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
    getStaffList() {
      const that = this
      that.$api.staff.stafflist().then(data => {
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
        this.$api.adminssionTask.detail(this.dataId).then(res => {
          this.postForm = res.data
          let temp = []
          if(this.postForm.admissionIds) {
            this.postForm.admissionIds.split(',').forEach(function (item) {
              temp.push(parseInt(item))
            })
          }else{
            this.postForm.admissionIds = []
          }
          this.postForm.admissionIds = temp
          this.postForm.deadTime = []
          this.postForm.deadTime.push(this.postForm.startTime)
          this.postForm.deadTime.push(this.postForm.endTime)
        })
      }
    },
    handleCreate() {
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.postForm.startTime = this.postForm.deadTime[0]
            this.postForm.endTime = this.postForm.deadTime[1]
            this.postForm.admissionIds = this.postForm.admissionIds.toString()
            this.$api.adminssionTask.edit(this.postForm).then(res => {
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
            this.postForm.startTime = this.postForm.deadTime[0]
            this.postForm.endTime = this.postForm.deadTime[1]
            this.postForm.admissionIds = this.postForm.admissionIds.toString()
            this.$api.adminssionTask.add(this.postForm).then(res => {
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
