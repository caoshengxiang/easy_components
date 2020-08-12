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
                    <el-form-item label="宿舍编号：" prop="code" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.code" class="filter-item"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="宿舍类型：" prop="cate" label-width="200px" class="postInfo-container-item ">
                      <el-select v-model="postForm.cate" class="filter-item" style="float: left; width: 100%"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in AllEnum.宿舍类型"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="宿舍负责人：" prop="managerId" label-width="200px" class="postInfo-container-item ">
                      <el-select v-model="postForm.managerId" filterable class="filter-item"
                                 style="float: left; width: 100%" placeholder="请选择">
                        <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="宿舍位置：" prop="location" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.location" class="filter-item"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="容纳人数：" prop="capacity" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.capacity" type="number" class="filter-item"/>

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注：" label-width="200px" class="postInfo-container-item ">
                      <el-input v-model="postForm.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"
                                placeholder="请填写备注"/>
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
        staff: [],
        AllEnum: [],
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
      if (that.detailInfo) {
        that.postForm = that.detailInfo
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id
        that.getDetail()
        that.editStatus = false
      }
      that.getStaffList()
      that.getAllEnum()
    },
    methods: {
      getStaffList() {
        const that = this
        that.$api.staff.stafflist().then(data => {
          that.loading = false
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
      getDetail() {
        const that = this
        that.$api.dormitory.getDetail(that.id).then(data => {
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
              that.$api.dormitory.editDormitory({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑宿舍成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/dormitory/dormitoryInfo/list',
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
            } else {
              // //新增
              // //编辑
              that.$api.dormitory.addDormitory({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增宿舍成功',
                    type: 'success',
                    duration: 2000
                  })
                  that.$router.push({
                    path: '/views/dormitory/dormitoryInfo/list',
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
            font-size: 14px;
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

  }

  .download-button {
    margin-bottom: 5px;
    margin-top: 5px;
    float: right;
  }
</style>
