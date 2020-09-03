<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="handleCreate" :edit-status="true">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title">基</div>
                    <div class="icon-info">基本信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="18">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="学生姓名：" prop="name" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.name" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="性别：" prop="sex" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.sex" placeholder="性别" clearable class="filter-item" style="width: 100%">
                            <el-option v-for="item in AllEnum.性别" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="出生日期：" prop="birthday" label-width="150px" class="postInfo-container-item">
                          <el-date-picker
                            v-model="postForm.birthday"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="出生日期"
                            style="width:100%"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="民族：" prop="nation" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.nation" placeholder="民族" clearable class="filter-item"
                                     style="width: 100%"
                          >
                            <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件类型：" prop="certificateType" label-width="150px"
                                     class="postInfo-container-item">
                          <el-select v-model="postForm.certificateType" placeholder="证件类型" clearable
                                     class="filter-item" style="width: 100%"
                          >
                            <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <fileUpload
                              ref="uploadCourseChapter"
                            :isdisabled="false"
                            :file-list="[{path:postForm.avatar}]"
                            :style-type="3"
                            :cert-type="postForm.certificateType"
                            @successAction="successAction"
                          />
                      </el-col>
                    </el-row>
                    <el-row>

                      <el-col :span="8">
                        <el-form-item label="证件号码：" prop="idNo" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.idNo" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="联系电话：" prop="homePhone" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.homePhone" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="家庭地址：" prop="homeAddr" label-width="150px" class="postInfo-container-item">
                          <el-input v-model="postForm.homeAddr" class="filter-item"/>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                    <el-col :span="6">
                      <el-form-item label="" prop="avatr" label-width="80px" class="postInfo-container-item">
                        <fileUpload
                          ref="uploadCourseChapter"
                          :isdisabled="false"
                          :file-list="[{path:postForm.avatar}]"
                          :style-type="1"
                        />
                      </el-form-item>
                    </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);" v-if="type"/>
                <div style="margin-bottom: 30px" v-if="type">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(255,61,54)">验</div>
                    <div class="icon-info">手机验证</div>
                  </h3>
                </div>
                <el-row v-if="type">
                  <el-col :span="6">
                    <el-form-item label="手机号：" prop="mobile" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.mobile" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="验证码："  prop="code" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.code"class="filter-item" style="width: 50%"/>
                      <el-button  @click="countDown"  type="success" plain> {{content}}</el-button>

                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgb(21,72,111)">卡</div>
                    <div class="icon-info">持卡信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="邮政卡卡号：" prop="postnumer" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.postnumer" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="持卡人姓名：" prop="postname" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.postname" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="持卡人联系方式：" prop="postContact" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.postContact" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="开户行：" prop="bank" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.bank" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">考</div>
                    <div class="icon-info">报考信息</div>
                  </h3>
                </div>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="报读年级：" prop="administrativeGradeId" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.administrativeGradeId"
                        placeholder="请选择年级"
                        clearable
                        style="width: 100%"
                        class="filter-item"
                      >
                        <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="报读专业：" prop="administrativeSpecialtyId" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.administrativeSpecialtyId"
                        placeholder="请选择专业"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                        @change="changeSpe"
                      >
                        <el-option v-for="item in specialty" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="班级类型：" prop="classType" label-width="150px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.classType"
                        placeholder="请选择班级"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in classTypes" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">

                    <el-form-item label="是否住校：" prop="inschooled" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.inschooled" placeholder="是否住校" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="6">
                    <el-form-item label="报考原因：" prop="applyReason" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.applyReason" placeholder="报考原因" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.报考原因" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>


                  <el-col :span="6">
                    <el-form-item label="健康状况：" prop="bsJoined" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.bsJoined" placeholder="健康状况" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt2" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-show="postForm.bsJoined">
                    <el-form-item label="病情描述" prop="bsDetail" label-width="150px" class="postInfo-container-item">
                      <el-input  type="textarea" :rows="3" maxlength="500" v-model="postForm.bsDetail"  />
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#9E9CF4">毕</div>
                    <div class="icon-info">毕业信息</div>
                  </h3>
                </div>

                <el-row>

                  <el-col :span="6">
                    <el-form-item label="毕业学校：" prop="admissionSourceId" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.admissionSourceId"
                                 style="width:100%"
                                 placeholder="请选择招生生源地">
                        <el-option
                          v-for="item in areaInfo"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="毕业班级名称：" prop="gradutionCname" label-width="150px" class="postInfo-container-item">
                      <el-input v-model="postForm.gradutionCname" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否参加二诊：" prop="ezJoined" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.ezJoined" placeholder="是否参加二诊" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt1" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-show="postForm.ezJoined" >
                    <el-form-item  label="二诊分数：" prop="ezSocre" label-width="150px" class="postInfo-container-item">
                      <el-input  style="width: 100%" v-model="postForm.ezSocre" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否参加中考：" prop="zkJoined" label-width="150px" class="postInfo-container-item">
                      <el-select v-model="postForm.zkJoined" placeholder="参加中考" clearable class="filter-item"
                                 style="width: 100%"
                      >
                        <el-option v-for="item in opt1" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6" v-show="postForm.zkJoined" >
                    <el-form-item label="中考分数：" prop="zkScore" label-width="150px" class="postInfo-container-item">

                      <el-input style="width: 100%" v-model="postForm.zkScore" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-show="postForm.zkJoined" >
                    <el-form-item label="中考报名号：" prop="zkNum" label-width="150px" class="postInfo-container-item">
                      <el-input   style="width: 100%" v-model="postForm.zkNum" class="filter-item"/>
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
import { validURL } from '@/utils/validate'
import YDetailPageLayout from '@/components/YDetailPageLayout'
import fileUpload from '@/components/FileUpload'

export default {
  name: 'ComplexTable',
  components: {
    Breadcrumb,
    YDetailPageLayout,
    fileUpload
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
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,
      canClick: true,
      classTypes:[],
      opt2: [{
        key: 1,
        label: '有病史'
      }, {
        key: 0,
        label: '无病史'
      }],
      opt1: [{
        key: 1,
        label: '参加'
      }, {
        key: 0,
        label: '未参加'
      }],
      opt: [{
        key: 1,
        label: '是'
      }, {
        key: 0,
        label: '否'
      }],
      specialty: [],
      gradeInfo: [],
      type: 'detail',
      postForm: {},
      rules: {
        name: [{ required: true,message: '姓名', trigger: 'blur' }],
        sex: [{ required: true,message: '性别', trigger: 'blur' }],
        birthday: [{ required: true,message: '出生日期', trigger: 'blur' }],
        nation: [{ required: true,message: '民族', trigger: 'blur' }],
        certificateType: [{ required: true,message: '证件类型', trigger: 'blur' }],
        idNo: [{ required: true,message: '证件号', trigger: 'blur' }],
        inschooled: [{ required: true,message: '是否住校', trigger: 'blur' }],
        admissionSourceId: [{ required: true,message: '毕业学校', trigger: 'blur' }],
        gradutionCname: [{ required: true,message: '毕业班名称', trigger: 'blur' }],
        administrativeGradeId: [{ required: true,message: '读报年级', trigger: 'blur' }],
        administrativeSpecialtyId: [{ required: true,message: '读报专业', trigger: 'blur' }],
        classType: [{ required: true,message: '班级类型', trigger: 'blur' }],
        homePhone: [{ required: true,message: '联系电话', trigger: 'blur' }],
        homeAddr: [{ required: true,message: '家庭住址', trigger: 'blur' }],
        postnumer: [{ required: true,message: '邮政卡卡号', trigger: 'blur' }],
        postname: [{ required: true,message: '持卡人姓名', trigger: 'blur' }],
        postContact: [{ required: true,message: '持卡人联系方式', trigger: 'blur' }],
        bank: [{ required: true,message: '开户行', trigger: 'blur' }],
        zkJoined: [{ required: true,message: '是否参加中考', trigger: 'blur' }],
        ezJoined: [{ required: true,message: '是否参加二诊', trigger: 'blur' }],
        bsJoined: [{ required: true,message: '是否有病史', trigger: 'blur' }],
        mobile: [{ required: true,message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true,message: '请输入验证码', trigger: 'blur' }],
        //applyReason: [{ required: true,message: '报考原因', trigger: 'blur' }],
      },
      dataId: this.$route.query.id,
      AllEnum:[],
      areaInfo:[],
      clbumInfo:[],
      type:this.$route.path == '/registration'
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
    that.getAllEnum()
    that.getAreaList()
  },
  methods: {
    successAction(data){
    console.log(data)
    },
    cert(){

    },
    countDown() {
      if(this.totalTime  < 60){
        return
      }
      this.$api.message.sendCode({ mobile:this.postForm.mobile }).then(res => {
      })

      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true  //这里重新开启
        }
      },1000)
    },
    changeSpe(){
      let that = this
      if(that.postForm.administrativeSpecialtyId) {
        that.$api.admiisionPreApply.getClassTypesBySpId(that.postForm.administrativeSpecialtyId).then(data => {
          if (data.code === 200) {
            that.classTypes = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }
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
    getAllEnum() {
      let that = this
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
        this.$api.admiisionPreApply.detail(this.dataId).then(res => {
          this.postForm = res.data

          this.changeSpe()
        })
      }
    },
    handleCreate() {
      let that = this

      if (that.$refs.uploadCourseChapter.getFileList().length === 0) {
        that.postForm.avatar = ''
      } else {
        that.postForm.avatar = that.$refs.uploadCourseChapter.getFileList()[0].url
      }
      if (this.dataId) { // 编辑
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.$api.admiisionPreApply.edit(this.postForm).then(res => {
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
            if(!this.type){
              this.$api.admiisionPreApply.add(this.postForm).then(res => {
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
            else{
              this.$api.message.checkSmsCode({ mobile:this.postForm.mobile,code:this.postForm.code }).then(res => {
                if (res.code === 200) {
                  if (res.data) {
                    this.$api.admiisionPreApply.saveOnMobile(this.postForm).then(res => {
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
                  else{
                    this.$notify({
                      title: '验证码错误',
                      message: '验证码错误',
                      type: 'error',
                      duration: 2000
                    })
                  }
                }
              })
            }
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
