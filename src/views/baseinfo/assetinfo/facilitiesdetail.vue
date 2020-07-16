<template>
  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="save">
      <el-tabs value ="first" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container"  style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="设施名称：" prop="name" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.name"   class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="设施产权："  prop="property" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.property"   class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 使用状况："  prop="useCondition" label-width="200px" class="postInfo-container-item">
                      <el-select v-model="postForm.useCondition" placeholder="使用状况" clearable class="filter-item" style="width: 100%">
                        <el-option key="1" label="已使用" value="1" />
                        <el-option key="2" label="未投入使用" value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="所属校区："  prop="campus" label-width="200px" class="postInfo-container-item">
                      <el-select v-model="postForm.campus" placeholder="所属校区" clearable style="width: 100%" class="filter-item">
                        <el-option key="1" label="江安校区" value="1" />
                        <el-option key="2" label="望江校区" value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建成年月："  prop="buildDate" label-width="200px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.buildDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建设费用："  prop="buildCost" label-width="200px" class="postInfo-container-item">
                            <el-input v-model="postForm.buildCost"   class="filter-item" />

                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="是否正常："  prop="ifNormal" label-width="200px" class="postInfo-container-item">
                      <el-select  v-model="postForm.ifNormal" placeholder="是否正常" clearable class="filter-item" style="width: 100%">
                        <el-option key="true" label="是" value="true" />
                        <el-option key="false" label="否" value="false" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经费来源："  prop="financialResource" label-width="200px" class="postInfo-container-item">
                      <el-select  v-model="postForm.financialResource" placeholder="经费来源" clearable class="filter-item" style="width: 100%">
                        <el-option key="1" label="财务部" value="1" />
                        <el-option key="2" label="商务部" value="0" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="使用机构（部门）："  prop="buildDate" label-width="200px" class="postInfo-container-item">
                      <el-select v-model="postForm.orgId" placeholder="部门" clearable style="width: 100%" class="filter-item">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>   <el-row style="margin-left: 150px">

                <el-col :span="8">
                  <el-form-item label="型号："  prop="model" label-width="200px" class="postInfo-container-item">
                    <el-input v-model="postForm.model"   class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="品牌："  prop="brand" label-width="200px" class="postInfo-container-item">
                    <el-input v-model="postForm.brand"   class="filter-item" />

                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报废状态："  prop="state" label-width="200px" class="postInfo-container-item">
                    <el-select  v-model="postForm.state" placeholder="报废状态" clearable class="filter-item" style="width: 100%">
                      <el-option key="1" label="未报废" value="1" />
                      <el-option key="2" label="已报废" value="2" />
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
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  export default {
    name: 'ComplexTable',
    components: {Breadcrumb,fileUpload,YDetailPageLayout},
    data() {
      return {
        editCourseChapterForm:{ path:'/creative/vcg/veer/800water/veer-133190023.jpg' },
        postForm:{},
        rules: {
          name: [{ required: true, message: '请填写名称', trigger: 'change' }],
          property: [{ required: true, message: '请选择产权', trigger: 'change' }],
          useCondition: [{ required: true, message: '请填写使用状况', trigger: 'change' }],
          campus: [{ required: true, message: '请选择所属校区', trigger: 'change' }],
          buildDate: [{ required: true,  message: '请填写建成年月', trigger: 'change' }],
          buildCost: [{ required: true, message: '请输入经费', trigger: 'change' }],
          ifNormal: [{ required: true, message: '请选择是否正常', trigger: 'change' }],
          financialResource: [{ required: true, message: '请选择经费来源', trigger: 'change' }],
          orgId: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
          model: [{ required: true, message: '请填写型号', trigger: 'change' }],
          brand: [{ required: true, message: '请填写品牌', trigger: 'change' }],
          state: [{ required: true, message: '请选择报废状态', trigger: 'change' }]
        },
        departmentList:[]
      }
    },
    created(){
      let that = this
      if(that.$route.query.id){
        that.id = that.$route.query.id
        that.getDetail()
      }

      that.getDepartmentList() ////查询建筑物列表
    },
    methods:{
      getDepartmentList(){
        let that = this;
        that.$api.baseInfo.getDepartmentList({current:0,size:10000}).then(data => {
          if(data.code === 200){
            that.departmentList = data.data.records
            console.log()
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getDetail(){
        let that = this;
        that.$api.assetinfo.getFacilityDetail(that.id ).then(data => {
          that.loading = false;
          if(data.code === 200){
            that.postForm = data.data;
          }
          else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save(){
        let that = this
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if(that.$route.query.id){
              ////编辑
              that.$api.assetinfo.editFacility({...that.postForm}).then(data => {
                that.loading = false;
                if(data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '编辑设施成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path:"/baseinfo/facilitiesindex",
                    query: {
                      type: "add"
                    }
                  })
                }
                else{
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            }
            else {
              ////新增
              ////编辑
              that.$api.assetinfo.addFacility({...that.postForm}).then(data => {
                that.loading = false;
                if(data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '新增设施成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path:"/baseinfo/facilitiesindex",
                    query: {
                      type: "add"
                    }
                  })
                }
                else{
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
