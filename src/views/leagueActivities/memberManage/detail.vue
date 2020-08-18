<template>
  <common-layout>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增社团" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="社团：" prop="communityName">
                  <el-input v-model="form.communityName" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="职务：" prop="job">
                  <el-input v-model="form.job" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学生：" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任职日期：" prop="jobDate">
                  <el-date-picker v-model="form.jobDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入社日期：" prop="createdDate">
                  <el-date-picker v-model="form.createdDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="状态：" prop="status">
                  <el-input v-model="form.status" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="社团评价：" prop="comment">
                  <el-input v-model="form.comment" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工作内容：" prop="workContent">
                  <el-input v-model="form.workContent" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                  <el-input v-model="form.remark" />
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
    communityName: 'memberManageDetail',
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
          jobs: ['']
        },
        rules: {
          communityName: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
          job: [{ required: true, message: '请输入社团编码', trigger: 'blur' }],
          name: [{ required: true, message: '请输入创始人', trigger: 'blur' }],
          jobDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          createdDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          status: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
          comment: [{ required: true, message: '请输入电话', trigger: 'blur' }],
          workContent: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
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
