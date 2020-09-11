<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="通知书详情" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="专业：" prop="specialty" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.specialty" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="年级：" prop="grade" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.grade" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="班级：" prop="clbum" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.clbum" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="学期：" prop="termName" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.termName" class="filter-item"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="学生姓名："
                      prop="studentName"
                      label-width="200px"
                      class="postInfo-container-item"
                    >
                      <el-input v-model="postForm.studentName" class="filter-item"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="通知书发放时间：" prop="sendDate" label-width="200px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.sendDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="离校时间：" prop="holidayDate" label-width="200px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.holidayDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="一、二年级报道时间：" prop="underGradeRegisterDate" label-width="200px" class="postInfo-container-item">
<!--                      <el-input v-model="postForm.underGradeRegisterDate" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.underGradeRegisterDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="三年级报道时间：" prop="seniorGradeRegisterDate" label-width="200px" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.seniorGradeRegisterDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="创建时间：" prop="created" label-width="200px" class="postInfo-container-item">
<!--                      <el-input v-model="postForm.created" class="filter-item"/>-->
                      <el-date-picker
                        v-model="postForm.created"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="创建人：" prop="creator" label-width="200px" class="postInfo-container-item">
                      <el-input v-model="postForm.creator" class="filter-item"/>
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
        postForm: {},
        rules: {},
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = false
      }

    },
    methods: {
      getDetail() {
        const that = this;
        that.$api.classNotice.getDetail(that.id).then(data => {
          that.loading = false;
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
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
