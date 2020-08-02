<template>
  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout :save="save">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="建筑物：" prop="type" label-width="120px" class="postInfo-container-item ">
                      <el-select
                        v-model="postForm.constructionId"
                        default-value="0"
                        placeholder="所属建筑物"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in constructionList" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="教室编号：" prop="code" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.code" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 使用面积：" prop="area  " label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.area" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="教室类型：" prop="cate" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.cate"
                        placeholder="教室类型"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in roomType" :key="item.name" :label="item.name" :value="item.name" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实际容纳人数：" prop="capacity" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.capacity" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="最大排课量：" prop="courseMax" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.courseMax" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="网络状态："
                      prop="networkCondition"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.networkCondition"
                        placeholder="网络状态"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="是否多媒体："
                      prop="ifMultimedia"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.ifMultimedia"
                        placeholder="是否多媒体"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否可用：" prop="ifAvailable" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.ifAvailable"
                        placeholder="是否可用"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="摄像头地址：" prop="cameraAddr" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.cameraAddr" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="教室备注：" prop="remark" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.remark" type="textarea" class="filter-item" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="教室平面图：" prop="type" label-width="120px" class="postInfo-container-item">
                      <fileUpload
                        ref="uploadCourseChapter1"
                        :isdisabled="false"
                        :file-list="[{path:postForm.planGraph}]"
                        :style-type="1"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="教室图片：" prop="type" label-width="120px" class="postInfo-container-item">
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
  import fileUpload from '@/components/FileUpload'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'ComplexTable',
    components: {
      Breadcrumb,
      YDetailPageLayout,
      fileUpload
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
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        postForm: {},
        constructionList: [],
        pagePara: {
          current: 0,
          size: 10
        },
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
        roomType: []
      }
    },
    created() {
      const that = this
      that.type = that.$route.query.type
      if (that.detailInfo) {
        that.postForm = that.detailInfo
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
      }

      that.getConstructionPage() // //查询建筑物列表
      that.getByTypeId('type')
    },

    methods: {
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            that.roomType = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getConstructionPage() {
        const that = this
        that.pagePara.size = 10000
        that.$api.assetinfo.getConstructionPage({ ...that.pagePara }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.constructionList = data.data.records
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
        const that = this
        that.$api.assetinfo.getTeachingRoomDetail(that.id).then(data => {
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
        if (that.$refs.uploadCourseChapter1.getFileList().length === 0 || that.$refs.uploadCourseChapter2.getFileList().length === 0) {
          that.$message.error('请上传图片!')
          return
        }
        that.postForm.planGraph = that.$refs.uploadCourseChapter1.getFileList()[0].fileName
        that.postForm.pic = that.$refs.uploadCourseChapter2.getFileList()[0].fileName
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.$api.assetinfo.editTeachingRoom({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑教室成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/views/baseinfo/assetinfo/roomlist",
                  //   query: {
                  //     type: "add"
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
              that.$api.assetinfo.addTeachingRoom({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增教室成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/baseinfo/roomindex",
                  //   query: {
                  //     type: "add"
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
