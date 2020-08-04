<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout @save="save">
      <el-tabs value="first" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 5% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="宿舍编号：" prop="code" label-width="200px" class="postInfo-container-item ">
                    <el-input v-model="postForm.code" class="filter-item"/>

                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="宿舍类型：" prop="cate" label-width="200px" class="postInfo-container-item ">
                    <el-input v-model="postForm.cate" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="宿舍负责人：" prop="managerName" label-width="200px" class="postInfo-container-item ">
                    <el-input v-model="postForm.managerName" class="filter-item"/>
                  </el-form-item>
                </el-col>
              </el-row>
                <el-row>
                  <el-col :span="24">
                  <el-form-item label="人员详情：" prop="managerName" label-width="200px" class="postInfo-container-item ">
                    <div v-for="item in postForm.bedDatas" style="padding-left:15px;margin-right: 30px">{{item.studentName}}-{{item.bedNo}}</div>
                  </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-tab-pane></el-tabs>

    </y-detail-page-layout>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { validURL } from '@/utils/validate'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    name: 'ComplexTable',
    components: { Breadcrumb, YDetailPageLayout },
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
        staff: [],
        AllEnum:[],
        type: 'detail',
        postForm: {},
        rules: {
          code: [{
            required: true,
            message: '请填写宿舍编号',
            trigger: 'change'
          }],
          managerId: [{
            required: true,
            message: '请填写宿舍联系人',
            trigger: 'blur'
          }],
          cate: [{
            required: true,
            message: '请选择宿舍类型',
            trigger: 'blur'
          }],
          managerPhone: [{
            required: true,
            message: '请填写负责人电话',
            trigger: 'blur'
          }],
          location: [{
            required: true,
            message: '请填写宿舍位置',
            trigger: 'blur'
          }],
          capacity: [{
            required: true,
            message: '请填写宿舍容纳人数',
            trigger: 'blur'
          }],
        },
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this
      if (that.detailInfo){
        that.postForm = that.detailInfo
      } else if (that.$route.query.id){
        that.id = that.$route.query.id
        that.getDetail()
      }
      that.getStaffList()
      that.getAllEnum()
    },
    methods: {
      getStaffList() {
        const that = this
        that.$api.baseInfo.getStaffList().then(data => {
          that.loading = false
          if (data.code === 200) {
            // 返回成功
            that.staff = data.data.records
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        that.listLoading = false
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
      getDetail(){
        const that = this;
        that.$api.dormitory.getDetail(that.id).then(data => {
          that.loading = false;
          if (data.code === 200){
            that.postForm = data.data;
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      save(){
        const that = this
        that.$refs.postForm.validate(valid => {
          if (valid) {
            if (that.$route.query.id){
              // //编辑
              that.$api.dormitory.editDormitory({...that.postForm}).then(data => {
                that.loading = false;
                if (data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '新增宿舍成功',
                    type: 'success',
                    duration: 2000
                  })

                  const back = this.$route.query.back
                  if (back) {
                    that.$router.push(back)
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
              that.$api.dormitory.addDormitory({...that.postForm}).then(data => {
                that.loading = false;
                if (data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '新增宿舍成功',
                    type: 'success',
                    duration: 2000
                  })
                  const back = this.$route.query.back
                  if (back) {
                    that.$router.push(back)
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
  @import "~@/styles/mixin.scss";

  .staff-detail {
  }

  .createPost-container {

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          .el-form-item__label {
            width: 21px;
            height: 9px;
            font-size: 9px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }

    .avatar-wrapper {
      width: 20px;
      height: 20px;
      position: relative;
      border-radius: 50%;
      background-color: #2A8FE3;
      text-align: center;
      line-height: 20px;
    }

    .viewTable .title {
      text-align: left
    }

    .icon-title {
      font-size: 10px;
      float: left;
      color: rgba(255, 255, 255, 1);
    }

    .icon-info {
      text-align: left;
      padding-top: 5px;
      margin-left: 30px;
      height: 10px;
      font-size: 10px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;
  }
</style>
