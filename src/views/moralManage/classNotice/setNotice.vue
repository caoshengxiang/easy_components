<template>
  <div class="notification-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="通知书时间设置" name="first">
          <el-form ref="postForm" :model="postForm" :rules="rules" style="padding-right: 15% ">
            <div class="createPost-main-container">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="放假日期：" class="postInfo-container-item" label-width="200px" prop="holidayDate">
                      <el-date-picker style="width: 100%" v-model="postForm.holidayDate" class="filter-item" value-format="yyyy-MM-dd" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="一二年级返校日期：" class="postInfo-container-item" label-width="200px" prop="underGradeRegisterDate">
                      <el-date-picker style="width: 100%" v-model="postForm.underGradeRegisterDate" class="filter-item" value-format="yyyy-MM-dd" />
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="三年级返校日期：" class="postInfo-container-item" label-width="200px" prop="seniorGradeRegisterDate">
                      <el-date-picker style="width: 100%" v-model="postForm.seniorGradeRegisterDate" class="filter-item" value-format="yyyy-MM-dd" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="通知书发放日期：" class="postInfo-container-item" label-width="200px" prop="sendDate">
                      <el-date-picker style="width: 100%" v-model="postForm.sendDate" class="filter-item" value-format="yyyy-MM-dd" />
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
import YDetailPageLayout from '@/components/YDetailPageLayout'
import Breadcrumb from '@/components/Breadcrumb'
import {getState} from "@/views/moralManage/notice/noticeStore";
export default {
  name: 'setNotice',
  components: {
    YDetailPageLayout,
    Breadcrumb
  },
  data() {
    return {
      editStatus:true,
      postForm:{},
      rules: {
        holidayDate: [{ required: true, message: '请输入放假日期', trigger: 'change' }],
        underGradeRegisterDate: [{ required: true, message: '请输入一二年级返校日期', trigger: 'change' }],
        seniorGradeRegisterDate: [{ required: true, message: '请输入三年级返校日期', trigger: 'change' }],
        sendDate: [{ required: true, message: '请输入通知书发放日期', trigger: 'change' }]
      }
    }
  },
  created() {
  },
  methods: {
    save() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const { clbumId,termId } = this.$route.query
          this.$api.classNotice.timeSet({...this.postForm,termId,clbumId}).then(res => {
            this.$notify({
              title: '成功',
              message: '设置通知时间成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: '/views/moralManage/classNotice/list',
              query: {
                menuLevel1: this.$route.query.menuLevel1
              }
            })
          })
        } else {
          this.$message.warning('请完善表单信息！');
        }
      })
    }
  }
};
</script>

<style scoped>
.form-container {
  width: 380px;
  margin: auto;
}
</style>
