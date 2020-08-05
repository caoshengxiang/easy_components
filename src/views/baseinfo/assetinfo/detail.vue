<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="土地产权：" prop="property" label-width="120px" class="postInfo-container-item ">
                      <el-select
                        v-model="postForm.property"
                        placeholder="土地产权"
                        clearable
                        class="filter-item "
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
                  <el-col :span="8">
                    <el-form-item label="使用状况：" prop="status" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.status"
                        placeholder="使用状况"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in useStatus" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 所在校区：" prop="campus" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.campus"
                        placeholder="所在校区"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in campus" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="土地用途：" prop="user" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.user"
                        placeholder="土地用途"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in purpose" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="土地面积（平方米）：" prop="area" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.area" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="土地证号："
                      prop="certificateNum"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.certificateNum" class="filter-item" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="土地价格（万元）：" prop="price" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.price" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="用地地址：" prop="addr" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.addr" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="用地备注：" prop="type" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.remark" type="textarea" class="filter-item" />
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
        editStatus:true,
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        postForm: {},
        rules: {
          property: [{
            required: true,
            message: '请选择土地产权',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择土地使用状态',
            trigger: 'change'
          }],
          campus: [{
            required: true,
            message: '请选择土地所在校区',
            trigger: 'change'
          }],
          user: [{
            required: true,
            message: '请选择土地用途',
            trigger: 'change'
          }],
          area: [{
            required: true,
            message: '请填写土地面积',
            trigger: 'change'
          }],
          certificateNum: [{
            required: true,
            message: '请填写土地证号',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请填写土地价格',
            trigger: 'change'
          }],
          addr: [{
            required: true,
            message: '请填写土地地址',
            trigger: 'change'
          }],
        },
        id: 0,
        propertyRight: [], // 土地产权
        useStatus: [], // 使用状况
        campus: [], // 所在校区
        purpose: [], // 土地用途
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
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }

      that.getByTypeId('purpose')
      that.getByTypeId('campus')
      that.getByTypeId('useStatus')
      that.getByTypeId('propertyRight')
    },
    methods: {
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            switch (id) {
              case 'propertyRight':
                that.propertyRight = data.data
                break
              case 'useStatus':
                that.useStatus = data.data
                break
              case 'campus':
                that.campus = data.data
                break
              case 'purpose':
                that.purpose = data.data
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
      getDetail() {
        const that = this
        that.$api.assetinfo.getLandDetail(that.id).then(data => {
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
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.assetinfo.editLand({ ...that.postForm }).then(data => {
                that.loading = false
                if(data.code === 250){


                }
               else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑用地成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/assetinfo/list',
                  //   query: {
                  //     type: 'add'
                  //   }
                  // })
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/list',
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
              that.$api.assetinfo.addLand({ ...that.postForm }).then(data => {
                that.loading = false
                if(data.code === 250){

                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/list',
                    query: {
                      menuLevel1: this.$route.query.menuLevel1
                    }
                  })
                }
                else if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增用地成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/assetinfo/list',
                  //   query: {
                  //     type: 'add'
                  //   }
                  // })
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/list',
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
