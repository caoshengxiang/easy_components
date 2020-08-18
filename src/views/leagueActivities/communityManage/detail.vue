<template>
  <common-layout>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增社团" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="社团名称：" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="社团编码：" prop="code">
                  <el-input v-model="form.code" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="创始人：" prop="originCreator">
                  <el-input v-model="form.originCreator" />
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
                <el-form-item label="活动形式：" prop="activityMethod">
                  <el-input v-model="form.activityMethod" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性质：" prop="type">
                  <!-- todo 对接口 -->
                  <service-select
                    v-model="form.type"
                    name="name"
                    field="id"
                    :data-service="$api.baseInfo.getGradeList"
                    placeholder="性质"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="批准部门：" prop="org">
                  <el-input v-model="form.org" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成立日期：" prop="createdDate">
                  <el-date-picker v-model="form.createdDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="社团职务：" prop="jobs">
                  <template v-for="(job, index) in form.jobs">
                    <el-row :key="index" class="job-row">
                      <el-col :span="18">
                        <el-input v-model="form.jobs[index]" />
                      </el-col>
                      <el-col :span="4" :offset="2">
                        <el-popconfirm v-if="form.jobs.length > 1 && editStatus" title="确认删除？" @onConfirm="removeJob(index)">
                          <el-button round type="danger" slot="reference">删除</el-button>
                        </el-popconfirm>
                      </el-col>
                    </el-row>
                  </template>
                  <el-row class="job-row">
                    <el-col :span="24">
                      <el-button v-if="editStatus" type="primary" @click="addJob">新增社团职务</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="宗旨：" prop="theme">
                  <el-input type="textarea" :rows="6" v-model="form.theme" />
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
  import ServiceSelect from '@/components/ServiceSelect'

  export default {
    name: 'setNotice',
    components: {
      CommonLayout,
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
          name: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入社团编码', trigger: 'blur' }],
          originCreator: [{ required: true, message: '请输入创始人', trigger: 'blur' }],
          dutyPerson: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '格式不正确！', trigger: 'blur' }
          ],
          activityMethod: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
          type: [{ required: true, message: '请输入性质', trigger: 'blur' }],
          org: [{ required: true, message: '请输入批准部门', trigger: 'blur' }],
          createdDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          jobs: [{ required: true, message: '请输入社团职务', trigger: 'change' }],
          theme: [{ required: true, message: '请输入宗旨', trigger: 'blur' }]
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
