<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="请假信息录入" name="first">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="width: 600px;margin: auto"
          >
            <div class="createPost-main-container">
              <div style="font-size: 20px;font-weight: 500;text-align: center;padding-left: 100px;margin-bottom: 20px">{{ this.configInfo.SYS_NAME.value }}<lable style="color: red">{{postForm.leaveStudyYear}}</lable> 学年  <lable style="color: red">{{term.name}}</lable> 学生请假单</div>
              <el-row>  <el-col :span="24">
                <el-form-item  prop="year" label-width="150px" class="postInfo-container-item">
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
                  <el-form-item label="开始时间：" prop="startTime" label-width="150px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.startTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%"
                      placeholder=""
                      @change="calTime"
                    />

                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="结束时间：" prop="endTime" label-width="150px" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.endTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%"
                      placeholder=""
                      @change="calTime"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="请假总计：" prop="actualPayAmount" label-width="150px" class="postInfo-container-item">
                   <el-lable style="color: red">{{days}}</el-lable> 天  <el-lable  style="color: red">{{hours}}</el-lable> 小时
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="假别：" prop="leaveType" label-width="150px" class="postInfo-container-item">
                    <el-radio-group v-model="postForm.leaveType">

                      <el-radio  v-for="item in AllEnum.请假类型" :label="item">{{item}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="请假事由：" prop="reason" label-width="150px" class="postInfo-container-item">
                    <el-input type="textarea" :rows="6" maxlength="500" v-model="postForm.reason" show-word-limit />
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
      term:{},
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
      gradeInfo: [],
      studentInfo:[],
      type: 'detail',
      postForm: {},
      rules: {
        administrativeClbumId: [{ required: true, message: '班级', trigger: 'blur'}],
        studentId: [{ required: true, message: '学生', trigger: 'blur'}],
        startTime: [{ required: true, message: '开始时间', trigger: 'blur'}],
        endTime: [{ required: true, message: '结束时间', trigger: 'blur'}],
        leaveType: [{ required: true, message: '假别', trigger: 'blur'}],
      },
      dataId: this.$route.query.id,
      days:0,
      hours:0,
      AllEnum: {},// 全部枚举

      configInfo:{}
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
      if(!this.$route.query.id){
        this.editStatus = true
      }
      this.getDetail()
    }
    this.getConfig()
    that.getClbumList()
    that.getcurrentTerm()
    that.getAllEnum()
  },
  methods: {
    getConfig() {
      let that = this
      this.$api.globalConfig.getValuesByKey({ key: 'sys' }).then(res => {
        this.configInfo = res.data.fieldValues
      })
    },
    getAllEnum(){
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
    calTime(){
      if(this.postForm.endTime <= this.postForm.startTime){
        this.$notify({
          title: '时间错误',
          message: '结束时间必须大于起始时间',
          type: 'error',
          duration: 2000
        })
        return
      }
      if(this.postForm.endTime && this.postForm.startTime) {
        var stamp = new Date(this.postForm.endTime).getTime() - new Date(this.postForm.startTime).getTime();
        var time = (stamp / 1000);
        if (null != time && "" != time) {

          if (time > 60 && time < 60 * 60) {
            this.days = 0
            this.hours = 1
          } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            this.days = 0
            this.hours = parseInt(time / 3600.0)
            if(time % 3600.0 >0){
              this.hours = this.hours + 1
            }
          } else if (time >= 60 * 60 * 24) {
            this.days = parseInt(time / 3600.0 / 24)
            this.hours = parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24)
            if(time % 3600.0 % 24 >0){
              this.hours = this.hours + 1
            }
          } else {
            this.days = 0
            this.hours = 1
          }


          this.postForm.days = this.days
          this.postForm.hours =  this.hours
        }
      }
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
      if (this.dataId) {
        this.$api.leave.detail(this.dataId).then(res => {
          this.postForm = res.data
          this.days = this.postForm.days
          this.hours =  this.postForm.hours


          if(this.postForm.studentSampleInfoDTO){
            this.postForm.administrativeGradeId = this.postForm.studentSampleInfoDTO.administrativeGradeId
            this.postForm.administrativeSpecialtyId = this.postForm.studentSampleInfoDTO.administrativeSpecialtyId
            this.postForm.administrativeClbumId = this.postForm.studentSampleInfoDTO.administrativeClbumId
            this.getStudent()
          }
        })
      }
    },
    getcurrentTerm() {
        this.$api.leave.currentTerm().then(res => {
            this.term = res.data
          this.postForm.leaveStudyYear = this.term.year
          this.postForm.leaveStudyTermId = this.term.id

        })
    },
    handleCreate() {
      if(this.postForm.endTime <= this.postForm.startTime){
        this.$notify({
          title: '时间错误',
          message: '结束时间必须大于起始时间',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.leave.edit(this.postForm).then(res => {
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
            this.$api.leave.add(this.postForm).then(res => {
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
