<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增团支部" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部名称：" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="负责人：" prop="dutyPerson">
                  <el-input v-model="form.dutyPerson" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="电话：" prop="phone">
                  <el-input v-model="form.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成立日期：" prop="createdDate">
                  <el-date-picker v-model="form.createdDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="关联班级：" prop="type">
                  <!-- todo 对接口 -->
                  <service-select
                    v-model="form.type"
                    name="name"
                    field="id"
                    :data-service="$api.baseInfo.getGradeList"
                    clearable
                  />
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
    name: 'branchManageDetail',
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
          name: [{ required: true, message: '请输入团支部名称', trigger: 'blur' }],
          dutyPerson: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '格式不正确！', trigger: 'blur' }
          ],
          createdDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          type: [{ required: true, message: '请输入关联班级', trigger: 'change' }],
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
      },
      addJob() {
        this.form.jobs.push('');
      },
      removeJob(index) {
        this.form.jobs.splice(index, 1);
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
