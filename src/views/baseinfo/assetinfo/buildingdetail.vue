<template>
  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout @save="save">
      <el-tabs value="first" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="建筑物名称：" prop="name" label-width="120px" class="postInfo-container-item ">
                      <el-input v-model="postForm.name" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="简写名称：" prop="alias" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.alias" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 校区：" prop="campus" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.campus"
                        placeholder="教室类型"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in campus" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">

                  <el-col :span="8">
                    <el-form-item label="单位（部门）：" prop="orgId" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.orgId"
                        placeholder="部门"
                        clearable
                        style="width: 100%"
                        class="filter-item"
                      >
                        <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="建筑使用年限："
                      prop="yearLimit"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.yearLimit" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑物分类：" prop="cate" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.cate"
                        placeholder="建筑物分类"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in typeNo" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="建筑物结构码：" prop="structure" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.structure"
                        placeholder="建筑物结构码"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in structuralNo" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑物层数：" prop="floor" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.floor" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建成年月：" prop="buildDate" label-width="120px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.buildDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">

                  <el-col :span="8">
                    <el-form-item label="建筑物投资总额：" prop="amount" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.amount" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="经费来源："
                      prop="financialResource"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.financialResource"
                        placeholder="经费来源"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in source" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房屋产权：" prop="property" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.property"
                        placeholder="房屋产权"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in propertyRight"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="总建成面积：" prop="buildArea" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.buildArea" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑物占地面积：" prop="area" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.area" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="总使用面积：" prop="useArea" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.useArea" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row style="margin-left: 150px">

                  <el-col :span="8">
                    <el-form-item label="摄像头地址：" prop="cameraAddr" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.cameraAddr" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="抗震设防烈度："
                      prop="antiKnockDegree"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.antiKnockDegree"
                        placeholder="抗震设防烈度"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in code1" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="抗震设防标准："
                      prop="antiKnockStandard"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.antiKnockStandard"
                        placeholder="抗震设防标准"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in code2" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="建筑物状况：" prop="state" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.state"
                        placeholder="建筑物状况"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in buildStatus" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="权属证号：" prop="no" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.no" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑物地址：" prop="addr" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.addr" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="建筑物平面图：" prop="type" label-width="120px" class="postInfo-container-item">
                      <fileUpload
                        ref="uploadCourseChapter1"
                        :isdisabled="false"
                        :file-list="[{path:postForm.planGraph}]"
                        :style-type="1"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑物图片：" prop="type" label-width="120px" class="postInfo-container-item">
                      <fileUpload
                        ref="uploadCourseChapter2"
                        :isdisabled="false"
                        :file-list="[{path:postForm.pic}]"
                        :style-type="1"
                      />
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
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      fileUpload,
      YDetailPageLayout
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
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
        editCourseChapterForm1: {},
        editCourseChapterForm2: {},
        postForm: {},
        rules: {
          name: [{
            required: true,
            message: '请填写建筑物名称',
            trigger: 'change'
          }],
          alias: [{
            required: true,
            message: '请填写建筑物简称',
            trigger: 'change'
          }],
          campus: [{
            required: true,
            message: '请填写建筑物校区',
            trigger: 'change'
          }],
          orgId: [{
            required: true,
            message: '请选择使用部门',
            trigger: 'change'
          }],
          yearLimit: [{
            required: true,
            message: '请填写建筑物年限',
            trigger: 'change'
          }],
          cate: [{
            required: true,
            message: '请选择建筑物分类',
            trigger: 'change'
          }],
          structure: [{
            required: true,
            message: '请选择建筑物结构',
            trigger: 'change'
          }],
          floor: [{
            required: true,
            message: '请填写建筑物楼层',
            trigger: 'change'
          }],
          buildDate: [{
            required: true,
            message: '请选择建成年月',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请填写建筑物经费',
            trigger: 'change'
          }],
          financialResource: [{
            required: true,
            message: '请选择经费来源',
            trigger: 'change'
          }],
          property: [{
            required: true,
            message: '请填写建筑物产权',
            trigger: 'change'
          }],
          buildArea: [{
            required: true,
            message: '请填写建筑物建筑面积',
            trigger: 'change'
          }],
         useArea: [{
            required: true,
            message: '请填写使用面积',
            trigger: 'change'
          }],
          area: [{
            required: true,
            message: '请填写建筑物建成面积',
            trigger: 'change'
          }],
       /*    antiKnockDegree: [{
            required: true,
            message: '请选择抗震设防烈度',
            trigger: 'change'
          }],
          antiKnockStandard: [{
            required: true,
            message: '请选择抗震设防标准',
            trigger: 'change'
          }],
          state: [{
            required: true,
            message: '请选择建筑物状况',
            trigger: 'change'
          }],
          no: [{
            required: true,
            message: '请填写权属证号',
            trigger: 'change'
          }],
          addr: [{
            required: true,
            message: '请填写建筑物地',
            trigger: 'change'
          }],
          cameraAddr: [{
            required: true,
            message: '请填写摄像头地址',
            trigger: 'change'
          }],*/
        },
        departmentList: [],
        structuralNo: [], // 建筑物结构
        typeNo: [], // 建筑物结构
        source: [], // 建筑物结构
        propertyRight: [], // 建筑物结构
        code1: [], // 建筑物结构
        code2: [], // 建筑物结构
        buildStatus: [],
        campus: []
      }
    },
    created() {
      const that = this

      if (that.detailInfo) {
        that.postForm = that.detailInfo
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
      }

      that.getDepartmentList() // //查询建筑物列表
      that.getByTypeId('structuralNo')
      that.getByTypeId('typeNo')
      that.getByTypeId('source')
      that.getByTypeId('propertyRight')
      that.getByTypeId('code1')
      that.getByTypeId('code2')
      that.getByTypeId('buildStatus')
      that.getByTypeId('campus')
    },
    methods: {
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'structuralNo':
                that.structuralNo = data.data
                break
              case 'typeNo':
                that.typeNo = data.data
                break
              case 'source':
                that.source = data.data
                break
              case 'propertyRight':
                that.propertyRight = data.data
                break
              case 'code1':
                that.code1 = data.data
                break
              case 'code2':
                that.code2 = data.data
                break
              case 'buildStatus':
                that.buildStatus = data.data
                break
              case 'campus':
                that.campus = data.data
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
      getDepartmentList() {
        const that = this
        that.$api.organization.simpleAll().then(data => {
          if (data.code === 200) {
            that.departmentList = data.data
            console.log()
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
        that.$api.assetinfo.getConstructionDetail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
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
        if (that.$refs.uploadCourseChapter1.getFileList().length == 0 || that.$refs.uploadCourseChapter2.getFileList().length == 0) {
          //that.$message.error('请上传图片!')
         //  return
          that.postForm.planGraph = ''//that.$refs.uploadCourseChapter1.getFileList()[0].fileName
          that.postForm.pic =''// that.$refs.uploadCourseChapter2.getFileList()[0].fileName
        }
        else{
          that.postForm.planGraph = that.$refs.uploadCourseChapter1.getFileList()[0].fileName
          that.postForm.pic = that.$refs.uploadCourseChapter2.getFileList()[0].fileName
        }

        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.assetinfo.editConstruction({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑建筑物成功',
                    type: 'success',
                    duration: 2000
                  })
              that.$router.push({
                path: '/views/baseinfo/assetinfo/buildinglist',
                query: {
                  menuLevel1: this.$route.query.menuLevel1
                }
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
              that.$api.assetinfo.addConstruction({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增建筑物成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/buildinglist',
                    query: {
                      menuLevel1: this.$route.query.menuLevel1
                    }
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

</style>
