<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="save">
      <el-tabs value ="first" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
            <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
                <div class="createPost-main-container">
                  <div class="postInfo-container">
                    <el-row >
                      <el-col :span="8">
                        <el-form-item label="土地产权：" prop="property" label-width="200px" class="postInfo-container-item ">
                          <el-select v-model="postForm.property" placeholder="土地产权" clearable class="filter-item " style="width: 100%">
                            <el-option v-for="item in propertyRight" :key="item.id.toString()" :label="item.name" :value="item.id.toString()" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="使用状况："  prop="status" label-width="200px" class="postInfo-container-item">
                          <el-select v-model="postForm.status" placeholder="使用状况" clearable class="filter-item" style="width: 100%">
                            <el-option v-for="item in useStatus" :key="item.id" :label="item.name" :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label=" 所在校区："  prop="campus" label-width="200px" class="postInfo-container-item">
                          <el-select v-model="postForm.campus" placeholder="所在校区" clearable class="filter-item" style="width: 100%">
                            <el-option v-for="item in campus" :key="item.id" :label="item.name" :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>

                    </el-row>
                    <el-row >
                      <el-col :span="8">
                      <el-form-item label="土地用途："  prop="user" label-width="200px" class="postInfo-container-item">
                        <el-select v-model="postForm.user" placeholder="土地用途" clearable class="filter-item" style="width: 100%">
                          <el-option v-for="item in purpose" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                      <el-col :span="8">
                        <el-form-item label="土地面积（平方米）："  prop="area" label-width="200px" class="postInfo-container-item">
                          <el-input v-model="postForm.area"   class="filter-item" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="土地证号："  prop="certificateNum" label-width="200px" class="postInfo-container-item">
                          <el-input v-model="postForm.certificateNum"   class="filter-item" />
                        </el-form-item>
                      </el-col>


                    </el-row>
                    <el-row >
                      <el-col :span="8">
                        <el-form-item label="土地价格（万元）："  prop="price" label-width="200px" class="postInfo-container-item">
                          <el-input v-model="postForm.price"   class="filter-item" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="用地地址："  prop="addr" label-width="200px" class="postInfo-container-item">
                          <el-input v-model="postForm.addr"   class="filter-item" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="用地备注："  prop="type" label-width="200px" class="postInfo-container-item">
                          <el-input type="textarea" v-model="postForm.remark"   class="filter-item" />
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
    components: {Breadcrumb,YDetailPageLayout},
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
        postForm: {},
        rules: {
          property: [{ required: true,message:'请选择土地产权', trigger: 'change' }],
          status: [{ required: true, message: '请选择土地使用状态', trigger: 'change' }],
          campus: [{ required: true, message: '请选择土地所在校区', trigger: 'change' }],
          user: [{ required: true, message: '请选择土地用途', trigger: 'change' }],
          area: [{ required: true, message: '请填写土地面积', trigger: 'change' }],
          certificateNum: [{ required: true, message: '请填写土地证号', trigger: 'change' }],
          price: [{ required: true, message: '请填写土地价格', trigger: 'change' }],
          addr: [{ required: true, message: '请填写土地地址', trigger: 'change' }],
        },
        id: 0,
        propertyRight:[],//土地产权
        useStatus:[],//使用状况
        campus:[],//所在校区
        purpose:[],// 土地用途
      }
    },
    created(){
      let that = this
      that.type = that.$route.query.type

      if(that.detailInfo){
        that.postForm = that.detailInfo
      }
      else if(that.$route.query.id){
        that.id = that.$route.query.id
        that.getDetail()
      }

      that.purpose = that.getByTypeId(53)
      that.campus = that.getByTypeId(52)
      that.useStatus = that.getByTypeId(51)
      that.propertyRight = that.getByTypeId(50)
    },
    methods:{
      getByTypeId(id){
        const that = this
        that.$api.dictData.getByTypeId({ dictTypeId: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
               case 50:
                 that.propertyRight = data.data
                break;
                case 51:
                  that.useStatus = data.data
                break;
                case 52:
                  that.campus = data.data
                break;
                case 53:
                  that.purpose = data.data
                break;
            }
            return data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getDetail(){
        let that = this;
        that.$api.assetinfo.getLandDetail(that.id ).then(data => {
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
              that.$api.assetinfo.editLand({...that.postForm}).then(data => {
                that.loading = false;
                if(data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '编辑用地成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path:"/views/baseinfo/assetinfo/list",
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
              that.$api.assetinfo.addLand({...that.postForm}).then(data => {
                that.loading = false;
                if(data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '新增用地成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path:"/views/baseinfo/assetinfo/list",
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
