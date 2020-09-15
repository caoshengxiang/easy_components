<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container postInfo-container"
               style="position: relative"
      >
        <el-tabs v-model="activeName" type="border-card" style="width: 100%" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgb(64,71,255)">基</div>
                <div class="icon-info">基本信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="学号：" prop="studyCode" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.studyCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名：" prop="name" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.name" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名拼音：" prop="spell" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.spell" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话：" prop="mobile" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.mobile" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="性别：" prop="type" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.sex" placeholder="性别" clearable class="filter-item" style="width: 100%">
                    <el-option v-for="item in AllEnum.性别" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件类型：" prop="certificateType" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.certificateType" placeholder="证件类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.证件类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号码：" prop="idNo" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.idNo" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期：" prop="birthday" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.birthday"
                    type="date"
                    style="width: 100%"
                    placeholder="出生日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民族：" prop="nation" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.nation" placeholder="民族" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.民族" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="政治面貌：" prop="politicsStatus" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.politicsStatus" placeholder="政治面貌" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.政治面貌" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="健康状况：" prop="health" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.health" placeholder="健康状况" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.健康状况" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学生来源：" prop="studentResource" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.studentResource" placeholder="学生来源" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.学生来源" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:rgba(255,175,41,1)">基</div>
                <div class="icon-info">基本情况</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="招生对象：" prop="recruit" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.recruit" placeholder="招生对象" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.招生对象" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="招生方式：" prop="recruitWay" label-width="120px" class="postInfo-container-item">
                  <el-select v-model="postForm.recruitWay" placeholder="招生方式" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.招生方式" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="入学年月：" prop="studyDate" label-width="120px" class="postInfo-container-item">
                  <el-date-picker
                    v-model="postForm.studyDate"
                    type="date"
                    placeholder="入学年月"
                     style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生源地行政区划码：" prop="sourcePlaceCode" label-width="120px" class="postInfo-container-item">
                  <el-input v-model="postForm.sourcePlaceCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="毕业学校：" prop="graduateSchool" label-width="120px" class="postInfo-container-item">
                  <el-select
                    v-model="postForm.graduateSchool"
                    placeholder="毕业学校"
                    clearable
                    style="width: 100%"
                    class="filter-item"
                  >
                    <el-option v-for="item in areaInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="监护人电话：" prop="memberMobile" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.memberMobile" class="filter-item"/>

                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FD774B">行</div>
                <div class="icon-info">学业基本情况</div>
              </h3>
            </div>

            <el-row>
              <el-col :span="6">
                <el-form-item label="年级：" prop="administrativeGradeId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeGradeId" @change="getClbumList()" placeholder="年级" clearable
                             style="width: 100%" class="filter-item"
                  >
                    <el-option v-for="item in classInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业：" prop="administrativeSpecialtyId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeSpecialtyId" placeholder="专业" @change="changeSpe" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in majorInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="班级：" prop="administrativeClbumId" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.administrativeClbumId" placeholder="班级" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in gradeInfo" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">

                <el-form-item label="班级类型：" prop="classType" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.classType" placeholder="班级类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in classTypes" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="户口所在地行政区域划码：" prop="registerPlaceCode" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.registerPlaceCode" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="户口性质：" prop="registerProperties" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.registerProperties" placeholder="户口性质" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.户口性质" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="学生居住地类型：" prop="registerAddrType" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.registerAddrType" placeholder="学生居住地类型" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in AllEnum.学生居住地类型" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

                <el-form-item label="是否建档立卡贫困户：" prop="ifPool" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-select v-model="postForm.ifPool" placeholder="是否建档立卡贫困户" clearable class="filter-item"
                             style="width: 100%"
                  >
                    <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FF687B">学</div>
                <div class="icon-info">考试考试信息</div>
              </h3>
            </div>

            <el-row>

              <el-col :span="6">
                <el-form-item label="准考证号：" prop="candidateNumber" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.candidateNumber" class="filter-item"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="考生号：" prop="examineeNumber" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.examineeNumber" class="filter-item"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="考试总分：" prop="totalScore" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.totalScore" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin-top:20px;width:100%;height:1px;background:rgba(242,242,242,1);"/>
            <div style="margin-bottom: 30px">
              <h3 class="title">
                <div class="avatar-wrapper icon-title" style="background:#FF687B">选</div>
                <div class="icon-info">考生选填信息</div>
              </h3>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="考生特长：" prop="speciality" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.speciality" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="考生既往病史：" prop="pastHistory" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.pastHistory" class="filter-item"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="体检结论：" prop="physicalExamination" label-width="120px"
                              class="postInfo-container-item"
                >
                  <el-input v-model="postForm.physicalExamination" class="filter-item"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import { validURL } from '@/utils/validate'

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
        editStatus: true,
        props: {
          label: 'name',
          value: 'id'
        },
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        AllEnum: {}, //全部枚举
        activeName: 'first',
        gradeInfo: [],
        classInfo: [],
        majorInfo: [],
        type: 'add',
        postForm: {
        },
        rules: {

          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'change'
          }],
          certificateType: [{
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
          }],
          idNo: [{
            required: true,
            message: '请填写证件号码',
            trigger: 'change'
          }],
          mobile: [{
            required: true,
            message: '请填写联系电话',
            trigger: 'change'
          }],
          /* studentCode: [{ required: true, message: '请填写学籍号', trigger: 'change' }],
           studyCode: [{ required: true, message: '请填写学号', trigger: 'change' }],
           spell: [{ required: true, message: '请填写姓名拼音', trigger: 'change' }],
           sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
           birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
           country : [{ required: true, message: '请选择国籍/地区', trigger: 'change' }],
           compatriot: [{ required: true, message: '请选择港澳台侨外', trigger: 'change' }],
           maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
           nation : [{ required: true, message: '请选择民族', trigger: 'change' }],
           recruitType: [{ required: true, message: '请选择联招合作类型', trigger: 'change' }],
           entryType: [{ required: true, message: '请选择入学方式', trigger: 'change' }],
           englishName: [{ required: true, message: '请填写英文名称', trigger: 'change' }],
           studentType: [{ required: true, message: '请选择学习方式', trigger: 'change' }],
           cultivateModel: [{ required: true, message: '请选择分段培养方式', trigger: 'change' }],
           ifTrailingChildren: [{ required: true, message: '请选择是否随迁子女', trigger: 'change' }],
           state: [{ required: true, message: '请选择当前状态', trigger: 'change' }],
           studyStyle : [{ required: true, message: '请选择学习形式', trigger: 'change' }],
           studyWay : [{ required: true, message: '请选择就读方式', trigger: 'change' }],
           cate: [{ required: true, message: '请选择学生类别', trigger: 'change' }],
           belongPoliceStation: [{ required: true, message: '请填写所属派出所', trigger: 'change' }],
           railwayRange: [{ required: true, message: '请填写乘火车区间', trigger: 'change' }],
           administrativeGradeId : [{ required: true, message: '请选择年级', trigger: 'change' }],
           administrativeSpecialtyId : [{ required: true, message: '请选择专业', trigger: 'change' }],
           administrativeClbumId : [{ required: true, message: '请选择班级', trigger: 'change' }],
           schoolGradeId: [{ required: true, message: '请选择学籍年级', trigger: 'change' }],
           schoolSpecialtyId: [{ required: true, message: '请选择学籍专业', trigger: 'change' }],
           schoolClbumId: [{ required: true, message: '请选择学籍班级', trigger: 'change' }],
           countyName : [{ required: true, message: '请选择户口地址信息', trigger: 'change' }],
           educationForm: [{ required: true, message: '请选择联招合作办学形式', trigger: 'change' }],
           nativePlaceCode: [{ required: true, message: '籍贯地行政区划码', trigger: 'change' }],
           birthPlaceCode : [{ required: true, message: '请填写出生地行政区划码', trigger: 'change' }],
           registerAddr: [{ required: true, message: '请填写详细地址', trigger: 'change' }],
           educationSchoolCode: [{ required: true, message: '请填写联招合作学校代码', trigger: 'change' }],
           outsidePlace: [{ required: true, message: '请填写校外教学点', trigger: 'change' }],*/
        },
        options: [{
          value: '1',
          label: '四川',
          children: [{
            value: '2',
            label: '成都',
            children: [{
              value: '3',
              label: '武侯区'
            }]
          }]
        }],
        areasls: [],
        areas: [],
        classTypes:[]
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      let that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = true
      }

      that.getGradeList()//赛选框年级
      that.getSpecialtyList()

      that.getAllEnum()
      that.areaList()
      that.admissionSource()
    },
    methods: {

      admissionSource() {
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
      changeSpe(opt){
        let that = this
        if(!opt) {
          that.postForm.administrativeClbumId = ''
          that.postForm.classType = ''
        }
        that.classTypes = []
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
        that.getClbumList()
      },
      handleChange(e) {
        console.log(e)
      },
      areaList() {
        let that = this
        that.$api.baseInfo.areaList().then(data => {
          if (data.code === 200) {
            that.areas = data.data
            that.toTree(that.areas)
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      toTree(data) {
        let that = this
        let result = []
        if (!Array.isArray(data)) {
          return result
        }
        data.forEach(item => {
          delete item.children
        })
        let map = {}
        data.forEach(item => {
          map[item.id] = item
        })
        data.forEach(item => {
          let parent = map[item.pid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            result.push(item)
          }
        })

        console.log(result)
        that.areasls = result
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
      getSpecialtyList() {
        let that = this
        that.$api.baseInfo.getSpecialtyList().then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.majorInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getClbumList() {
        let that = this

        that.gradeInfo = []
        that.$api.baseInfo.getClbumList({
          gradeId: that.postForm.administrativeGradeId,
          specialtyId: that.postForm.administrativeSpecialtyId
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            //返回成功
            that.gradeInfo = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      getDetail() {
        let that = this
        that.$api.student.getDetail(that.$route.query.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            that.changeSpe(true)
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      save() {
        let that = this
        this.$refs.postForm.validate(valid => {
          if (valid) {
            that.$api.student.editStudent({ ...that.postForm }).then(data => {
              that.loading = false
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })

                that.$router.push({
                  path: '/views/recruit/registration/list',
                  // query: {
                  //   menuLevel1: this.$route.query.menuLevel1,
                  //   menuId: this.$route.query.menuId,
                  // }
                })
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
