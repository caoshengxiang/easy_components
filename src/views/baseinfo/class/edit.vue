<template>

  <div class="assetinfo-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="基础信息" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" style="margin: auto;">
            <div class="createPost-main-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="班级名称：" prop="name" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.name" class="filter-item"/>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="班级编号：" prop="code" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.code" class="filter-item"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="预分配人数：" prop="allocationNum" label-width="120px" class="postInfo-container-item">
                    <el-input v-model="postForm.allocationNum" type="number" class="filter-item"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="年级：" prop="gradeId" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.gradeId" placeholder="年级" clearable filterable style="width: 100%;">
                      <el-option v-for="item in gradeList " :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业：" prop="specialtyId" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.specialtyId" placeholder="专业" clearable filterable
                               style="width: 100%;"
                    >
                      <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班主任：" prop="headTeacherId" label-width="120px" class="postInfo-container-item">

                    <el-select v-model="postForm.headTeacherId" placeholder="班主任" filterable
                               style="width: 100%"
                    >
                      <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否订单班：" prop="ifOrder" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.ifOrder" placeholder="是否订单班" clearable filterable style="width: 100%;">
                      <el-option v-for="item in opt" :key="item.key" :label="item.label" :value="item.key"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班级类型：" prop="classType" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.classType" placeholder="班级类型" clearable filterable
                               style="width: 100%;"
                    >
                      <el-option v-for="item in AllEnum.班级类型" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所在校区：" prop="campus" label-width="120px" class="postInfo-container-item">
                    <el-select v-model="postForm.campus" placeholder="所在校区" clearable filterable style="width: 100%;">
                      <el-option v-for="item in campus" :key="item.name" :label="item.name" :value="item.name"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
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
        campus: [],
        opt: [{
          key: true,
          label: '是'
        }, {
          key: false,
          label: '否'
        }],
        type: 'detail',
        postForm: {},
        rules: {
          code: [{
            required: true,
            message: '请填写班级编号',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请填写班级名称',
            trigger: 'change'
          }],
          allocationNum: [{
            required: true,
            message: '请选择预计分配人数',
            trigger: 'change'
          }],
          gradeId: [{
            required: true,
            message: '请选择年级',
            trigger: 'change'
          }],
          specialtyId: [{
            required: true,
            message: '请选择专业',
            trigger: 'change'
          }],
          headTeacherId: [{
            required: true,
            message: '请选择班主任',
            trigger: 'change'
          }],
          ifOrder: [{
            required: true,
            message: '请选择是否订单班',
            trigger: 'change'
          }],
          classType: [{
            required: true,
            message: '请选择班级类型',
            trigger: 'change'
          }],
          campus: [{
            required: true,
            message: '请选择校区',
            trigger: 'change'
          }],
        },
        gangwei: [],
        staff: [],
        AllEnum: [],
        majorList: [],
        gradeList: []
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
      that.getAllEnum()
      that.getMajor()
      that.getGrade()
      that.staffAll()
      that.getByTypeId('campus')
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
            }
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      staffAll() {
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
      getMajor() {
        const that = this
        that.$api.major.listbase({ ...that.listQuery, ...that.pagePara }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.majorList = data.data
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      },
      getGrade() {
        const that = this
        that.$api.grade.listbase({ ...that.listQuery, ...that.pagePara }).then(data => {
          if (data.code === 200) {
            // 返回成功
            that.gradeList = data.data
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
      simpleAll() {
        const that = this
        that.$api.post.simpleAll().then(data => {
          if (data.code === 200) {
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
      getDetail() {
        const that = this
        that.$api.clbum.detail(that.id).then(data => {
          that.loading = false
          if (data.code === 200) {
            that.postForm = data.data
            that.staffAll()
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
              that.$api.clbum.edit({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑班级成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/class/list',
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
              that.$api.clbum.add({ ...that.postForm }).then(data => {
                that.loading = false
                if (data.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增班级成功',
                    type: 'success',
                    duration: 2000
                  })
                  // that.$router.push({
                  //   path: '/views/baseinfo/class/list',
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
