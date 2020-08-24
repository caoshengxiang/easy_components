<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增学生活动" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="社团名称：" prop="community">
                  <el-input v-model="form.community" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动主题：" prop="activitySubject">
                  <el-input v-model="form.activitySubject" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="负责人：" prop="chargePerson">
                  <el-input v-model="form.chargePerson" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动时间：" prop="activityDate">
                  <el-input v-model="form.activityDate" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动地点：" prop="activityLoction">
                  <el-input v-model="form.activityLoction" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动内容：" prop="activityContent">
                  <el-input v-model="form.activityContent" type="textarea"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>
</template>

<script>
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    communityName: 'studentActivitiesDetail',
    components: {
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
        loading: false,
        editStatus: true,
        form: {
          jobs: []
        },
        jobsOptions: [{
          value: '教务处',
          label: '教务处'
        }, {
          value: '团委',
          label: '团委'
        }, {
          value: '党委',
          label: '党委'
        }, {
          value: '学生会',
          label: '学生会'
        }],
        rules: {
          studentID: [{ required: true, message: '请输入学生身份证号', trigger: 'blur' }],
          level: [{ required: true, message: '请输入级别', trigger: 'blur' }],
          unit: [{ required: true, message: '请输入任职单位', trigger: 'blur' }],
          cadresName: [{ required: true, message: '请输入干部名称', trigger: 'blur' }],
          semester: [{ required: true, message: '请输入学期', trigger: 'blur' }],
          jobs: [{ required: true, message: '请输入学生干部岗位', trigger: 'blur' }],
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        if (this.detailInfo) {
          this.form = this.detailInfo
        } else if (this.$route.query.id) {
          this.loading = true;
          this.editStatus = false;
          // todo 对接口
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // todo 对接口
          } else {
            this.$message.warning('请完善表单信息！');
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .form-container {
    width: 460px;
    margin: auto;
    .job-row {
      margin: 12px 0;
    }
  }
</style>
