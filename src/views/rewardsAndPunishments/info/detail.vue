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
                    {{sysCfg.SCHOOL_NAME.value || ''}}
                    <br/>
                    奖/惩登记表
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label="年级：" prop="gradeId" label-width="120px" class="postInfo-container-item ">
                      <el-select v-model="postForm.gradeId" @change="getClbumList" placeholder="年级" clearable
                                 @clear="clearClbumStd"
                                 style="width: 100px" class="filter-item"
                      >
                        <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label="专业：" prop="specialtyId" label-width="120px" class="postInfo-container-item ">
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
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label=" 班级：" prop="clbumId" label-width="120px" class="postInfo-container-item">
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
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label="姓名：" prop="studentId" label-width="120px" class="postInfo-container-item">
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
<!--                </el-row>-->
<!--                <el-row style="margin-left: 150px">-->
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label="附件：" prop="attachment" label-width="120px" style="height: 20px" class="postInfo-container-item ">
                      <fileUpload
                        :limit="1"
                        :fileList="[{path:postForm.attachment}]"
                        ref="attachment"
                        allowFileTypes=".docx|.doc|.xlsx|.xls"
                        :styleType="2"
                        v-if="!loading"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :xs="8" :sm="8">
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
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label=" 级别：" prop="level" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.level" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :xs="8" :sm="8">
                    <el-form-item label="处理时间：" prop="operateTime" label-width="120px" class="postInfo-container-item">
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
        <el-button round @click="printInfo" style="margin: auto; display: block" v-show="!isEdit && postForm.id" >打印</el-button>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from './components/YDetailPageLayout'
  import printPdf from "./printPdf";
  import html2canvas from "html2canvas";
  import jsPDF from "jspdf";

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
          }],
          operateResult: [{
            required: true,
            message: '请输入处理结果',
            trigger: 'blur'
          }]
        },
        sysCfg: {
          SCHOOL_NAME: {}
        },
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        noBedStd: [],
        AllEnum:{},
        loading:false,
        originData:{},
        loadComplete: false,
        urlStr: '',
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
      loadComplete: function (value) {
        if (value) {
          this.getClbumList();
          this.getStdNoBedList()
        }
      },
      isEdit: function (value) {
        if (!value) {
          this.getClbumList();
          this.getStdNoBedList()
        }
      }
    },
    created() {
      const that = this;

      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        this.originData = {...that.postForm};
        that.editStatus = false;
        that.loadComplete = true
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = false
      }
      this.getGradeList();
      this.getSpecialtyList();
      that.getSysCfg();
      that.getAllEnum()
    },
    methods: {
      getGradeList() {
        let that = this;
        that.$api.baseInfo.getGradeList().then(data => {
          that.loading = false;
          if (data.code === 200) {
            //返回成功
            that.classInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        });
        that.listLoading = false
      },
      getAllEnum() {
        const that = this;
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
        const that = this;
        if (row) {
          this.$set(this.postForm, 'clbumId', '');
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
        let that = this;
        if (row) {
          this.$set(this.postForm, 'studentId', '')
        }
        let param = {};
        if (that.postForm.clbumId > 0) {
          param.administrativeClbumId = that.postForm.clbumId;
          param.administrativeSpecialtyId = that.postForm.specialtyId;
          param.administrativeGradeId = that.postForm.gradeId
        } else {
          param = {}
        }
        that.$api.student.getStudentList({ ...param }).then(data => {
          that.loading = false;
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
        const that = this;
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
        this.$set(this.postForm, 'clbumId', '');
        this.$set(this.postForm, 'studentId', '')
      },
      getSysCfg(){
        this.$api.globalConfig.getValuesByKey({ key: 'BASE_INFO' }).then(res => {
          this.sysCfg = res.data.fieldValues;
        })
      },
      printInfo() {
        // console.log(printPdf('#rewardsAndPunishmentsDetailInfo', '奖惩'))
        // console.log(psf)
        html2canvas(document.querySelector('#rewardsAndPunishmentsDetailInfo'), {
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
          window.open('/pdf/web/viewer.html')
        })
      },
      getDetail() {
        const that = this;
        that.$api.rewardsAndPunishments.getDetail(that.id).then(data => {
          that.loading = false;
          if (data.code === 200) {
            that.postForm = data.data;
            that.originData = {...that.postForm};
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
        const that = this;
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
                that.loading = false;
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑奖惩成功',
                    type: 'success',
                    duration: 2000
                  });
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/info',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              }).catch(_ => this.loading = false);
            } else {
              // //新增
              // //编辑
              that.$api.rewardsAndPunishments.addRewardsAndPunishments({...that.postForm}).then(data => {
                that.loading = false;
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增奖惩成功',
                    type: 'success',
                    duration: 2000
                  });
                  that.$router.push({
                    path: '/views/rewardsAndPunishments/info',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              }).catch(_ => this.loading = false);
            }
          }
        })
      },
      print() {
        document.getElementById('printF').contentWindow.print()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
