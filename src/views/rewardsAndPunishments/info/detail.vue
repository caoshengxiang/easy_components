<template>
  <div class="rewardsAndPunishments-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" @editStatusChange="editStatusChange">
      <el-tabs>
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增奖惩' : '奖惩详情'">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            class="form-container"
            style="padding-right: 15%; padding-top: 100px"
            id="rewardsAndPunishmentsDetailInfo"
          >
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row style="margin-left: 150px;">
                  <el-col :span="24" style="text-align: center; margin-bottom: 50px">
                    {{sysCfg.SYS_NAME || ''}}
                    <br/>
                    奖/惩登记表
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="6">
                    <el-form-item label="年级：" prop="gradeId" label-width="120px" class="postInfo-container-item ">
                      <el-select v-model="postForm.gradeId" @change="getClbumList" placeholder="年级" clearable
                                 @clear="clearClbumStd"
                                 style="width: 100px" class="filter-item"
                      >
                        <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="专业：" prop="specialtyId" label-width="90px" class="postInfo-container-item ">
                      <el-select
                        v-model="postForm.specialtyId"
                        placeholder="专业"
                        clearable
                        class="filter-item"
                        @change="getClbumList"
                        @clear="clearClbumStd"
                        style="width: 100%;"
                      >
                        <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label=" 班级：" prop="clbumId" label-width="90px" class="postInfo-container-item">
                      <el-select v-model="postForm.clbumId" placeholder="班级"
                                 @change="getStdNoBedList"
                                 @clear="$set(postForm, 'studentId', '')"
                                 clearable
                                 class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="姓名：" prop="studentId" label-width="90px" class="postInfo-container-item">
                      <el-select v-model="postForm.studentId"
                                 placeholder="姓名"
                                 clearable
                                 class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in noBedStd" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="6">
                    <el-form-item label="附件：" prop="attachment" label-width="120px" class="postInfo-container-item ">
                      <fileUpload
                        :limit="1"
                        :fileList="[{path:postForm.attachment}]"
                        ref="attachment"
                        allowFileTypes=".docx|.doc|.xlsx|.xls"
                        :styleType="2"
                        v-if="!loading"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="奖/惩：" prop="oper" label-width="90px" class="postInfo-container-item">
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
                    <el-form-item label=" 级别：" prop="level" label-width="90px" class="postInfo-container-item">
                      <el-input v-model="postForm.level" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="处理时间：" prop="operateTime" label-width="90px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.operateTime"
                        type="datetime"
                        style="width:100%"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择时间"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="24">
                    <el-form-item label="处理结果：" prop="operateResult" label-width="120px" class="postInfo-container-item">
                      <el-input type="textarea" v-model="postForm.operateResult" class="filter-item"/>
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
        <el-button round @click="printInfo" style="margin: auto; display: block" v-show="!isEdit" >打印</el-button>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from './components/YDetailPageLayout'
  import printPdf from "./printPdf";

  export default {
    name: 'cancelDetailForm',
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
        isEdit:false,
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
        sysCfg: {},
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        noBedStd: [],
        AllEnum:{},
        loading:false,
        originData:{},
        loadComplete: false
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
      },
      isEdit: function (value) {
        if (!value) {
          this.getClbumList()
          this.getStdNoBedList()
        }
      }
    },
    created() {
      const that = this

      if (that.detailInfo) {
        that.postForm = that.detailInfo
        this.originData = {...that.postForm}
        that.editStatus = false
        that.loadComplete = true
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }
      this.getGradeList()
      this.getSpecialtyList()
      that.getSysCfg()
      that.getAllEnum()
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
          this.$set(this.postForm, 'studentId', '')
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
      getSysCfg(){
        this.$api.globalConfig.getSysCfg().then(res => {
          this.sysCfg = res.data
        })
      },
      printInfo() {
        printPdf('#rewardsAndPunishmentsDetailInfo', '奖惩')
      },
      getDetail() {
        const that = this
        that.$api.rewardsAndPunishments.getDetail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            that.originData = {...that.postForm}
            that.loadComplete = true
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      editStatusChange(value) {
        if (!value) {
          this.postForm = {...this.originData}
        }
        this.isEdit = value
      },
      save() {
        const that = this
        if (that.$refs.attachment.getFileList().length === 0 ) {
          that.postForm.attachment = ''//that.$refs.uploadCourseChapter1.getFileList()[0].url
        } else {
          that.postForm.attachment = that.$refs.attachment.getFileList()[0].url
        }

        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.rewardsAndPunishments.editRewardsAndPunishments({...that.postForm}).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑奖惩成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/info',
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
              that.$api.rewardsAndPunishments.addRewardsAndPunishments({...that.postForm}).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增奖惩成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/info',
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
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
