<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="editStatus">
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
                  <el-form-item label="流失状态：" prop="loseState" label-width="150px" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.loseState"
                      placeholder="流失状态"
                      clearable
                      class="filter-item"
                      style="width: 100%;"
                    >
                      <el-option  v-for="item in AllEnum.流失状态" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="疑似/流失时间：" prop="loseTime" label-width="150px" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.loseTime" placeholder="疑似/流失时间"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%"/>

                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="原因描述：" prop="reason" label-width="150px" class="postInfo-container-item">
                    <el-checkbox-group v-model="reason">
                      <el-checkbox :label="item" v-for="item in AllEnum.流失原因描述"/>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="学生去向：" prop="studentQx" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="3" maxlength="500" v-model="postForm.studentQx" show-word-limit />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="回流措施：" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="3" maxlength="500" v-model="postForm.huiliuWay" show-word-limit />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="效果：" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="3" maxlength="500" v-model="postForm.effect" show-word-limit />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注：" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="3" maxlength="500" v-model="postForm.remark" show-word-limit />
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
      editStatus:false,
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
      reason:[],
      areaInfo:[],
      specialty: [],
      gradeInfo: [],
      classInfo:[],
      majorInfo:[],
      studentInfo:[],
      type: 'detail',
      postForm: {
      },
      rules: {
        studentId: [{required: true, message: '学生',  trigger: 'blur' }],
        loseState: [{required: true, message: '流失状态',  trigger: 'blur' }],
        loseTime: [{required: true, message: '疑似/流失时间',  trigger: 'blur' }],
        reason: [{required: true, message: '原因描述',  trigger: 'blur' }],
        studentQx: [{required: true, message: '学生去向',  trigger: 'blur' }],
      },
      departmentList: [],
      staff: [],
      dataId: this.$route.query.id,
      AllEnum: {}// 全部枚举
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
      that.editStatus = false
    } else {
      if(!this.$route.query.id){
        this.editStatus = true
      }
      this.getDetail()
    }
    that.getAllEnum()
    that.getSpecialtyList()
    that.getGradeList()
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
          administrativeClbumId: that.postForm.administrativeClbumId
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
      let that = this
      if (this.dataId) {
        this.$api.loseStudent.detail(this.dataId).then(res => {
          this.postForm = res.data

          if(this.postForm.studentSampleInfoDTO){
            this.postForm.administrativeGradeId = this.postForm.studentSampleInfoDTO.administrativeGradeId
            this.postForm.administrativeSpecialtyId = this.postForm.studentSampleInfoDTO.administrativeSpecialtyId
            this.postForm.administrativeClbumId = this.postForm.studentSampleInfoDTO.administrativeClbumId
            this.getGradeList()
            this.getSpecialtyList()
            this.getClbumList()
            this.getStudent()
          }
          if(this.postForm.reason){
            this.postForm.reason.split(',').forEach(function (item) {
              that.reason.push(item)
            })

          }
        })
      }
    },
    handleCreate() {
      this.postForm.reason = this.reason.toString()
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.loseStudent.edit(this.postForm).then(res => {
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
            this.$api.loseStudent.add(this.postForm).then(res => {
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
