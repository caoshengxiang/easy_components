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
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item
                      label="使用教室："
                      prop="teachingRoomId"
                      label-width="120px"
                      class="postInfo-container-item "
                    >
                      <el-select
                        v-model="postForm.teachingRoomId"
                        placeholder="教室类型"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in teachingRoomList" :key="item.id" :label="item.code" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实训室名称：" prop="name" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.name" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label=" 建成日期：" prop="buildDate" label-width="120px" class="postInfo-container-item">
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
                    <el-form-item label="实训室类别：" prop="cate" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.cate"
                        placeholder="实训室类别"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in experimentRoomType"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="使用结构（部门）：" prop="type" label-width="120px" class="postInfo-container-item">
                      <el-select
                        v-model="postForm.orgId"
                        default-value="0"
                        placeholder="使用部门"
                        clearable
                        style="width: 100%"
                        class="filter-item"
                      >
                        <el-option v-for="item in constructionList" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="资产员："
                      prop="propertyUserId"
                      label-width="120px"
                      class="postInfo-container-item"
                    >
                      <el-select
                        v-model="postForm.propertyUserId"
                        placeholder="教室类型"
                        clearable
                        class="filter-item"
                        style="width: 100%"
                      >
                        <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-left: 150px">
                  <el-col :span="8">
                    <el-form-item label="工位数：" prop="stationNum" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.stationNum" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="适用专业："
                      prop="applicableMajor"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.applicableMajor" class="filter-item" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实训室介绍：" prop="introduce" label-width="120px" class="postInfo-container-item">
                      <el-input v-model="postForm.introduce" type="textarea" class="filter-item" />
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
        constructionList: [],
        teachingRoomList: [],
        rules: {
          teachingRoomId: [{
            required: true,
            message: '请选择所属教室',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写实训室名称',
            trigger: 'change'
          }],
          cate: [{
            required: true,
            message: '请选择实训室类别',
            trigger: 'change'
          }],
          orgId: [{
            required: true,
            message: '请选择使用机构',
            trigger: 'change'
          }],
          propertyUserId: [{
            required: true,
            message: '请填写资产员',
            trigger: 'change'
          }],
          stationNum: [{
            required: true,
            message: '请填写工位数',
            trigger: 'change'
          }],
          applicableMajor: [{
            required: true,
            message: '请填写适用专业',
            trigger: 'change'
          }],
          introduce: [{
            required: true,
            message: '请填写实训室介绍',
            trigger: 'change'
          }],
          buildDate: [{
            required: true,
            message: '请选择建成年月',
            trigger: 'change'
          }],
        },
        id: 0,
        experimentRoomType: [],
        staff: []
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
      that.getStaffList()
      that.getByTypeId('trainingType')
      that.organizationSimpleAll() // //查询建筑物列表
      that.getTeachingList() // //查询建筑物列表

    },
    methods: {
      getStaffList() {
        const that = this
        that.$api.staff.stafflist().then(data => {
          if (data.code === 200) {
            // 返回成功
            that.staff = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getByTypeId(id) {
        const that = this
        that.$api.dictData.getByCode({ code: id }).then(data => {
          if (data.code === 200) {
            that.experimentRoomType = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getTeachingList() {
        const that = this
        that.$api.assetinfo.getTeachingRoomPage({
          current: 0,
          size: 1000
        }).then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.teachingRoomList = data.data.records
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
        that.$api.assetinfo.getTrainingRoomDetail(that.id).then(data => {
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
      organizationSimpleAll() {
        const that = this
        that.$api.baseInfo.organizationSimpleAll().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.constructionList = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
      },
      save() {
        const that = this
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id) {
              // //编辑
              that.postForm.id = that.$route.query.id
              that.$api.assetinfo.editTrainingRoom({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑实训室成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/views/baseinfo/assetinfo/trainingdlist",
                  //   query: {
                  //     type: "add"
                  //   }
                  // })
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/trainingdlist',
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
              that.$api.assetinfo.addTrainingRoom({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增实训室成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/baseinfo/trainingindex",
                  //   query: {
                  //     type: "add"
                  //   }
                  // })
                  that.$router.push({
                    path: '/views/baseinfo/assetinfo/trainingdlist',
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
