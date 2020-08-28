<template>
  <div class="rewardsAndPunishments-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs>
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增撤销' : '编辑撤销'">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="padding-right: 15%; padding-top: 100px">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row style="margin-left: 150px;">
                  <el-col :span="24" style="text-align: center; margin-bottom: 50px">
                    {{sysCfg.SYS_NAME || ''}}
                    <br/>
                    奖/惩撤销表
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="6">
                    <el-form-item label="年级：" prop="gradeId" label-width="120px" class="postInfo-container-item ">
                      <el-select v-model="postForm.gradeId" @change="getClbumList"
                                 placeholder="年级"
                                 @clear="clearClbumStd"
                                 clearable
                                 style="width: 100px" class="filter-item"
                      >
                        <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="专业：" prop="specialtyId" label-width="120px" class="postInfo-container-item ">
                      <el-select
                        v-model="postForm.specialtyId"
                        placeholder="专业"
                        clearable
                        class="filter-item"
                        @change="getClbumList"
                        @clear="clearClbumStd"
                      >
                        <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label=" 班级：" prop="clbumId" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.clbumId" placeholder="班级"
                                 @change="getStdNoBedList"
                                 @clear="$set(postForm, 'studentId', '')"
                                 clearable
                                 class="filter-item" style="width: 200px"
                      >
                        <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="姓名：" prop="studentId" label-width="120px" class="postInfo-container-item">
                      <el-select v-model="postForm.studentId" placeholder="姓名" clearable
                                 class="filter-item" style="width: 200px"
                      >
                        <el-option v-for="item in noBedStd" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="6">
                    <el-form-item label="撤销文件：" prop="cancelFile" label-width="120px" class="postInfo-container-item ">
                      <fileUpload
                        :limit="1"
                        :file-list="[{path:postForm.cancelFile}]"
                        ref="cancelFile"
                        flag="routineWork"
                        :multiple="true"
                        :styleType="2"
                        allowFileTypes=".docx|.doc|.xlsx|.xls"
                        v-if="!loading"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="奖/惩：" prop="oper" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.oper"
                        placeholder="请选择奖/惩"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum['奖惩类型']" :label="item" :value="item" :key="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label=" 级别：" prop="level" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.level" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="处理时间：" prop="cancelTime" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.cancelTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:100%"
                        placeholder="选择时间"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="24">
                    <el-form-item label="处理结果：" prop="cancelReason" label-width="120px" class="postInfo-container-item">
                      <el-input type="textarea" v-model="postForm.cancelReason" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="24">
                    <el-form-item label="班主任意见：" prop="headTeacherOpinion" label-width="120px" class="postInfo-container-item">
                      <el-input type="textarea" v-model="postForm.headTeacherOpinion" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="24">
                    <el-form-item label="德育处理意见：" prop="moralOpinion" label-width="120px" class="postInfo-container-item">
                      <el-input type="textarea" v-model="postForm.moralOpinion" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="24">
                    <el-form-item label="学校处理意见：" prop="schoolOpinion" label-width="120px" class="postInfo-container-item">
                      <el-input type="textarea" v-model="postForm.schoolOpinion" class="filter-item"/>
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
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'detailForm',
    components: {
      Breadcrumb,
      fileUpload,
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
        editStatus: true,
        postForm: {},
        rules: {
          gradeId: [{
            required: true,
            message: '请选择年级',
            trigger: 'blur'
          }],
          specialtyId: [{
            required: true,
            message: '请选择专业',
            trigger: 'blur'
          }],
          clbumId: [{
            required: true,
            message: '请选择班级',
            trigger: 'blur'
          }],
          studentId: [{
            required: true,
            message: '请选择姓名',
            trigger: 'blur'
          }],
          oper: [{
            required: true,
            message: '请选择奖/惩',
            trigger: 'blur'
          }]
        },
        loading:false,
        gradeInfo:[],
        classInfo: [],
        majorInfo: [],
        noBedStd: [],
        sysCfg: {},
        AllEnum: {},
        loadComplete:false
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
      loadComplete: function (value) {
        if (value) {
          this.getClbumList()
          this.getStdNoBedList()
        }
      }
    },
    created() {
      const that = this
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
        this.loadComplete = true
      } else if (that.$route.query.rewardPunishmnetId) {
        that.getRewardPunishmentDetail(that.$route.query.rewardPunishmnetId)
        // that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        // that.editStatus = false
      }
      that.getGradeList()
      that.getSpecialtyList()
      that.getAllEnum()
      that.getSysCfg()
    },
    methods: {
      getGradeList() {
        let that = this
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
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
      getSysCfg(){
        this.$api.globalConfig.getSysCfg().then(res => {
          this.sysCfg = res.data
        })
      },
      getClbumList(row) {
        const that = this
        if (row) {
          this.$set(this.postForm, 'clbumId', '')
          this.$set(this.postForm, 'studentId', '')
        }
        that.$api.baseInfo.getClbumList({
          gradeId: that.postForm.gradeId,
          specialtyId: that.postForm.specialtyId
        }).then(data => {
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
      getStdNoBedList(row) {
        let that = this
        if (row) {
          this.$set(this.postForm,'studentId', '')
        }
        let param = {}
        if (that.postForm.clbumId > 0) {
          param.clbumId = that.postForm.clbumId
        } else {
          param = {}
        }
        that.$api.student.getStdNoBedList({ ...param }).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.noBedStd = data.data
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
      clearClbumStd() {
        this.$set(this.postForm, 'clbumId', '')
        this.$set(this.postForm, 'studentId', '')
      },
      getRewardPunishmentDetail(id){
        const that = this
        that.$api.rewardsAndPunishments.getDetail(id).then(data => {
          that.loading = false
          if (data.code === 200) {
            let {specialtyId,gradeId,clbumId,studentId,oper,level} = data.data
            that.postForm = {specialtyId,gradeId,clbumId,studentId,oper,level}
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
        that.$api.rewardsAndPunishments.getCancelDetail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            this.loadComplete = true
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
        if (that.$refs.cancelFile.getFileList().length === 0 ) {
          that.postForm.cancelFile = ''//that.$refs.uploadCourseChapter1.getFileList()[0].url
        } else {
          that.postForm.cancelFile = that.$refs.cancelFile.getFileList()[0].url
        }
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.rewardsAndPunishments.editRewardsAndPunishmentsCancel({...that.postForm}).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑撤销成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/undo',
                  })
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
              that.$api.rewardsAndPunishments.addRewardsAndPunishmentsCancel({...that.postForm},this.$route.query.rewardPunishmnetId).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '撤销奖惩成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/undo',
                  })
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
  .form-container{
    padding-top: 40px;
  }
</style>
