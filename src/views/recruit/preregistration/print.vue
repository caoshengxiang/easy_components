<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout  @save="save" saveBtnName="打印">

          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container"   style="position: relative;padding: 1px 20px;width: 1100px;margin: auto;"  id="studentInfo"    >
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
                        <el-form-item label="证件类型：" prop="certificateType" label-width="150px" class="postInfo-container-item">
                          <el-select v-model="postForm.certificateType" placeholder="证件类型" clearable
                                     class="filter-item" style="width: 100%"
                          >
                            <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="证件号码：" prop="idNo" label-width="150px" class="postInfo-container-item">
                       {{postForm.idNo}}
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
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


                <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
                <div style="margin-bottom: 30px">
                  <h3 class="title">
                    <div class="avatar-wrapper icon-title" style="background:#9E9CF4">诺</div>
                    <div class="icon-info">承诺书</div>
                  </h3>
                </div>

                <div style="font-size: 10px;letter-spacing: 1px;color: grey;line-height: 20px" v-html="configInfo.PROTOCOL.value"></div>

                <div style="margin-top: 30px">
                  <el-checkbox v-model="checked1" >我同意</el-checkbox>
                </div>

                <div style="margin-top: 30px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="家长签字：" label-width="110px" :label-position="position" class="postInfo-container-item">
                        <div style="margin-top:25px;width:200px;height:1px; background:black;"></div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="学校经办人签字：" label-width="150px" class="postInfo-container-item">
                        <div style="margin-top:25px;width:200px;height:1px; background:black;"></div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="缴费发票编号：" label-width="110px" class="postInfo-container-item">
                        <div style="margin-top:25px;width:200px;height:1px; background:black;"></div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日期：" label-width="150px" class="postInfo-container-item">
                        {{new Date().getFullYear()}} - {{(new Date().getMonth()+1).toString().padStart(2, '0')}} - {{new Date().getDate().toString().padStart(2, '0')}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-form>

    </y-detail-page-layout>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import { validURL } from '@/utils/validate'
import YDetailPageLayout from '@/components/YDetailPageLayout/index_detail'
import fileUpload from '@/components/FileUpload'
import printPdf from '../../../utils/printPdf'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      administrativeSpecialtyName:'',
      position:'left',
      checked1:false,
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
        //applyReason: [{ required: true,message: '报考原因', trigger: 'blur' }],
      },
      dataId: this.$route.query.id,
      AllEnum:[],
      areaInfo:[],
      clbumInfo:[],
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

      that.getSpecialtyList()
    } else {
      this.getDetail()
    }
    that.getGradeList()
    that.getAllEnum()
    that.getAreaList()
  },
  methods: {
    getConfig() {
      let that = this
      this.$api.globalConfig.getValuesByKey({ key: 'sys' }).then(res => {
        this.configInfo = res.data.fieldValues
        this.configInfo.PROTOCOL.value = this.configInfo.PROTOCOL.value.replace("600元（陆佰元整）", this.configInfo.PAYMENT.value)
        this.configInfo.PROTOCOL.value = this.configInfo.PROTOCOL.value.replace("name", this.postForm.name)
        this.specialty.forEach(function (item) {
          if(item.id === that.postForm.administrativeSpecialtyId){
            that.administrativeSpecialtyName = item.name
          }
        })
        this.configInfo.PROTOCOL.value = this.configInfo.PROTOCOL.value.replace("major", that.administrativeSpecialtyName)
      })
    },
    save() {
      // console.log(printPdf('#rewardsAndPunishmentsDetailInfo', '奖惩'))
      // console.log(psf)
      html2canvas(document.querySelector('#studentInfo'), {
        // 背景设为白色（默认为黑色）
        background: '#fff',
        dpi: 400, // 导出pdf清晰度,DPI越低，扫描的清晰度越低
        scale: 3
      }).then(canvas => {
        // document.body.appendChild(canvas)
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89
        // 未生成pdf的html页面高度
        var leftHeight = contentHeight
        // pdf页面偏移
        var position = 0
        // html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
        var imgWidth = 595.28
        var imgHeight = 592.28 / contentWidth * contentHeight
        var pageData = canvas.toDataURL('image/jpeg', 1.0)
        // eslint-disable-next-line
        var pdf = new jsPDF('', 'pt', 'a4')
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        // pdf.save(`${name}.pdf`)
        this.urlStr = pdf.output('dataurlstring')
        localStorage.setItem('r-print-url', this.urlStr);
        let url = process.env.VUE_APP_BASE_WEB + '/pdf/web/viewer.html'
        window.open(url)
      })
   //   if (this.postForm.name) {
     //   printPdf('#studentInfo', this.postForm.name + '-' + this.postForm.id)
    //  }
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
          this.getConfig()
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
          this.getSpecialtyList()
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
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
/*@import "~@/styles/mixin.scss";*/
</style>
