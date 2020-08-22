<template>
  <common-layout>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增学生干部" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="学生身份证号：" prop="studentID">
                  <el-input v-model="form.studentID" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="级别：" prop="level">
                  <el-input v-model="form.level" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任职单位：" prop="unit">
                  <el-input v-model="form.unit" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="干部名称：" prop="cadresName">
                  <el-input v-model="form.cadresName" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学期：" prop="semester">
                  <el-input v-model="form.semester" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学生干部岗位：" prop="jobs">
                  <el-select v-model="form.jobs" multiple style="width: 100%">
                    <el-option
                      v-for="item in jobsOptions"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </common-layout>
</template>

<script>
  import CommonLayout from '../common/CommonLayout'
  import YDetailPageLayout from '@/components/YDetailPageLayout'

  export default {
    communityName: 'studentCadresDetail',
    components: {
      CommonLayout,
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
