<template>

  <div class="assetinfo-detail app-container" >
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="width: 600px;margin: auto;">
            <div class="createPost-main-container">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="系部编号：" prop="code" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.code" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="系部名称：" prop="name" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.name" class="filter-item" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="系部负责人：" prop="leaderId" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.leaderId" placeholder="负责人" clearable filterable style="width: 200px">
                      <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
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
        editStatus:true,
        type: 'detail',
        postForm: {},
        rules: {
          code: [{
            required: true,
            message: '请填写系部编号',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写系部名称',
            trigger: 'change'
          }],
          leaderId: [{
            required: true,
            message: '请选择系部负责人',
            trigger: 'change'
          }]
        },
        gangwei: [],
        staff: []
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
        that.editStatus = false
      }
      that.staffAll()
    },
    methods: {
      simpleAll(){
        const that = this
        that.$api.post.staffAll().then(data => {
          if (data.code === 200){
            // 返回成功
            that.gangwei = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      staffAll(){
        const that = this
        that.$api.staff.stafflist().then(data => {
          if (data.code === 200){
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
      getDetail(){
        const that = this;
        that.$api.department.detail(that.id).then(data => {
          that.loading = false;
          if (data.code === 200){
            that.postForm = data.data;
            that.staffAll()
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
            that.postForm.leaderName = that.staff.find(m => m.id === that.postForm.leaderId).name
            if (that.$route.query.id){
              // //编辑
              that.$api.department.edit({...that.postForm}).then(data => {
                that.loading = false;
                if (data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '编辑系部成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/views/baseinfo/department/list",
                  // })
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
              that.$api.department.add({...that.postForm}).then(data => {
                that.loading = false;
                if (data.code === 200){
                  this.$notify({
                    title: '成功',
                    message: '新增系部成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path:"/views/baseinfo/department/list",
                  // })
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
