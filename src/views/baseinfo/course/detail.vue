<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 5% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="课程编号：" prop="code" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.code" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="课程名称：" prop="name" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.name" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 课程类型：" prop="cate" label-width="200px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.cate"
                        placeholder="课程类型"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.课程类型" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="课程属性：" prop="property" label-width="200px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.property"
                        placeholder="课程属性"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.课程属性" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学时：" prop="hours" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.hours" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学分：" prop="credit" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.credit" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="周上课节数：" prop="classNum" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.classNum" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item
                      label="教学计划规定课时数："
                      prop="planClassHour"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.planClassHour" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item
                      label="实践课程数："
                      prop="practiceClassHour"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.practiceClassHour" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>

                  <el-col :span="8">
                    <el-form-item label="课程性质：" prop="quality" label-width="200px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.quality"
                        placeholder="课程性质"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.课程性质" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="是否校企合作开发课程："
                      prop="ifCooperation"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifCooperation"
                        placeholder="是否校企合作开发课程"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="精品课程："
                      prop="excellentCourse"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.excellentCourse"
                        placeholder="精品课程"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.精品课程" :key="item" :label="item" :value="item"/>

                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>

                  <el-col :span="8">
                    <el-form-item label="授课年级：" prop="grade" label-width="200px" class="postInfo-container-item">
                      <el-checkbox-group v-model="postForm.grade">
                        <el-checkbox :label="item" v-for="item in AllEnum.授课年级"/>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="主要授课地点：" prop="venue" label-width="200px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.venue"
                        placeholder="主要授课地点"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in AllEnum.主要授课地点" :key="item" :label="item" :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="主要授课方式："
                      prop="teachingWay"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.teachingWay" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>

                  <el-col :span="8">
                    <el-form-item label="考试/考核主要方式：" prop="examWay" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.examWay" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="是否完成课程建设项目："
                      prop="ifComplete"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifComplete"
                        placeholder="是否完成课程建设项目"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item
                      label="否已经制定课程标准："
                      prop="ifFormulate"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifFormulate"
                        placeholder="否已经制定课程标准"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="所属教研组：" label-width="200px" class="postInfo-container-item">
                      <el-select v-model="postForm.researchGroupId" placeholder="所属教研组（一期未启用）" clearable
                                 class="filter-item" style="width: 100%"
                      >
                        <el-option key="1" label="语文组" value="1"/>
                        <el-option key="2" label="数学组" value="2"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="教材（一期未启用）：" label-width="200px" class="postInfo-container-item">
                      <el-select v-model="postForm.textbookId" placeholder="教材" clearable class="filter-item"
                                 style="width: 50%"
                      >
                        <el-option key="1" label="语文" value="1"/>
                        <el-option key="2" label="数学" value="2"/>
                      </el-select>
                      <el-select v-model="postForm.textbookId" placeholder="教材" clearable class="filter-item"
                                 style="width: 50%"
                      >
                        <el-option key="1" label="九年义务教育语文" value="1"/>
                        <el-option key="2" label="马克里" value="2"/>
                      </el-select>
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
        editStatus: true,
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        grade: null,
        postForm: {
          grade: []
        },
        classInfo: [],
        rules: {
          code: [{
            required: true,
            message: '请输入课程编号',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请输入课程名称',
            trigger: 'change'
          }],
          cate: [{
            required: true,
            message: '请选择课程类别',
            trigger: 'change'
          }],
          property: [{
            required: true,
            message: '请选择课程属性',
            trigger: 'change'
          }],
          hours: [{
            required: true,
            message: '请填写学时',
            trigger: 'change'
          }],
          credit: [{
            required: true,
            message: '请填写学分',
            trigger: 'change'
          }],
          classNum: [{
            required: true,
            message: '请填写周上课节数',
            trigger: 'change'
          }],
          courseType: [{
            required: true,
            message: '请选择课程类型',
            trigger: 'change'
          }],
          planClassHour: [{
            required: true,
            message: '请填写教学计划规定课时数',
            trigger: 'change'
          }],
          practiceClassHour: [{
            required: true,
            message: '请填写实践课时数',
            trigger: 'change'
          }],
          quality: [{
            required: true,
            message: '请选择课程性质',
            trigger: 'change'
          }],
          ifCooperation: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          excellentCourse: [{
            required: true,
            message: '请选择是否精品课程',
            trigger: 'change'
          }],
          venue: [{
            required: true,
            message: '请填写授课地点',
            trigger: 'change'
          }],
          teachingWay: [{
            required: true,
            message: '请选择授课方式',
            trigger: 'change'
          }],
          examWay: [{
            required: true,
            message: '请填写考试/考核主要方式',
            trigger: 'change'
          }],
          ifComplete: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          ifFormulate: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          grade: [{
            required: true,
            message: '请选择授课年级',
            trigger: 'change'
          }]
        },
        id: 0,
        courseProperties: [], // 课程属性
        courseCategory: [], // 课程类别
        campus: [], // 校区
        vipCourse: [], // 精品课程
        courseCate: [], // 课程类型
        courseNature: [], // 课程性质
        teachingRoom: [], // 授课低点
        AllEnum: {}// 全部枚举
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.postForm.grade = that.postForm.grade.split(',')
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }
      that.getGradeList()
      that.getAllEnum()
      that.getByTypeId('courseProperties')
      that.getByTypeId('courseCategory')
      that.getByTypeId('campus')
      that.getByTypeId('courseCate')
      that.getByTypeId('courseNature')
    },
    methods: {

      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'campus':
                that.campus = data.data
                break
              case 'courseCategory':
                that.courseCategory = data.data
                break
              case 'courseProperties':
                that.courseProperties = data.data
                break
              case 'courseCate':
                that.courseCate = data.data
                break
              case 'courseNature':
                that.courseNature = data.data
                break
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
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

      getGradeList() {
        const that = this
        that.$api.baseInfo.getGradeList().then(data => {
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
      getDetail() {
        const that = this
        that.$api.course.detail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            that.postForm.grade = that.postForm.grade.split(',')
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
        that.$refs.postForm.validate(valid => {
          if (valid) {
            that.postForm.grade = that.postForm.grade.toString()
            if (that.$route.query.id) {
              // //编辑
              that.$api.course.edit({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑课程成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/course/list',
                  //   query: {
                  //     type: 'add'
                  //   }
                  // })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
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
              that.$api.course.add({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增课程成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/baseinfo/courseindex',
                  //   query: {
                  //     type: 'add'
                  //   }
                  // })
                  const back = this.$route.query.back
                  if (back) {
                    this.$router.push(back)
                  }
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
</style>
