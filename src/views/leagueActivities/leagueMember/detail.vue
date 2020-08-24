<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增团员" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部：" prop="branchName">
                  <!-- todo 对接口 -->
                  <service-select
                    v-model="form.branchName"
                    name="name"
                    field="id"
                    :data-service="$api.baseInfo.getGradeList"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="身份证号：" prop="idNo">
                  <el-input v-model="form.idNo" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="职位：" prop="job">
                  <!-- todo 对接口 -->
                  <service-select
                    v-model="form.job"
                    name="name"
                    field="id"
                    :data-service="$api.baseInfo.getGradeList"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任职时间：" prop="jobDate">
                  <el-date-picker v-model="form.jobDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入团时间：" prop="createdDate">
                  <el-date-picker v-model="form.createdDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工作内容：" prop="workContent">
                  <el-input type="textarea" :rows="6" v-model="form.workContent" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                  <el-input type="textarea" :rows="6" v-model="form.remark" />
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
  import ServiceSelect from '@/components/ServiceSelect'

  export default {
    idNo: 'leagueMemberDetail',
    components: {
      YDetailPageLayout,
      ServiceSelect
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
          jobs: ['']
        },
        rules: {
          branchName: [{ required: true, message: '请选择团支部', trigger: 'change' }],
          idNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
          job: [{ required: true, message: '请输入职位', trigger: 'change' }],
          jobDate: [{ required: true, message: '请输入任职时间', trigger: 'change' }],
          createdDate: [{ required: true, message: '请输入入团时间', trigger: 'change' }],
          workContent: [{ required: true, message: '请输入工作内容', trigger: 'blur' }],
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
