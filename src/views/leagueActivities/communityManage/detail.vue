<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus.sync="editStatus" :form.sync="form" v-loading="loading">
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
                <el-form-item label="创始人：" prop="founder">
                  <el-input v-model="form.founder" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="负责人：" prop="principalName">
                  <service-select
                    v-model="form.principalName"
                    name="name"
                    field="name"
                    :data-service="$api.staff.stafflist"
                    placeholder="负责人"
                    clearable
                    @after-select="afterPrincipalSelect"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="电话：" prop="phone">
                  <el-input v-model="form.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动形式：" prop="form">
                  <el-input v-model="form.form" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性质：" prop="character">
                  <service-select
                    v-model="form.character"
                    :data-service="$api.LACommunityManage.characterList"
                    :default-query="{ key: '社团性质' }"
                    placeholder="性质"
                    clearable
                    pureList
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="批准部门：" prop="department">
                  <el-input v-model="form.department" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成立日期：" prop="approvalDate">
                  <el-date-picker v-model="form.approvalDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="社团职务：" prop="clubDutyList">
                  <template v-for="(job, index) in form.clubDutyList">
                    <el-row :key="index" :class="{ 'detail-job-row': !editStatus, 'job-row': true }">
                      <el-col :span="18">
                        <el-input v-model="job.name" />
                      </el-col>
                      <el-col :span="4" :offset="2">
                        <el-popconfirm v-if="form.clubDutyList.length > 1 && editStatus" title="确认删除？" @onConfirm="removeJob(job, index)">
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
                <el-form-item label="宗旨：" prop="purpose">
                  <el-input type="textarea" :rows="6" v-model="form.purpose" />
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
  import YDetailPageLayout from '@/components/YDetailPageLayout/ext'
  import ServiceSelect from '@/components/ServiceSelect'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'communityManageDetail',
    components: {
      YDetailPageLayout,
      ServiceSelect,
      Breadcrumb
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
          clubDutyList: [{ name: '' }],
          removeDutyIds: []
        },
        rules: {
          name: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入社团编码', trigger: 'blur' }],
          founder: [{ required: true, message: '请输入创始人', trigger: 'blur' }],
          principalName: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '格式不正确！', trigger: 'blur' }
          ],
          form: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
          character: [{ required: true, message: '请输入性质', trigger: 'blur' }],
          department: [{ required: true, message: '请输入批准部门', trigger: 'blur' }],
          approvalDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          clubDutyList: [{ required: true, message: '请输入社团职务', trigger: 'change' }],
          purpose: [{ required: true, message: '请输入宗旨', trigger: 'blur' }]
        }
      }
    },
    created() {
     this.getData();
    },
    methods: {
      // 详情
      getData() {
        if (this.detailInfo) {
          this.form = Object.assign({ removeDutyIds: [] }, this.detailInfo);
        } else if (this.$route.query.id) {
          this.loading = true;
          this.$api.LACommunityManage.detail(this.$route.query.id)
            .then(res => {
              this.form = Object.assign({ removeDutyIds: [] }, res.data);
              this.$nextTick(function() {
                this.editStatus = false;
                this.loading = false;
              });
            })
        }
      },
      // 负责人下拉回调
      afterPrincipalSelect(item) {
        this.form.principalId = item.id;
      },
      // 保存
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true;
            let dataService = this.$api.LACommunityManage.add; // 新增
            if (this.detailInfo || this.$route.query.id) { // 编辑
              dataService = this.$api.LACommunityManage.update;
            }
            dataService(this.form)
              .then(() => {
                this.loading = false;
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 2000
                });
                const back = this.$route.query.back;
                if (back) {
                  this.$router.push(back)
                }
              })
          } else {
            this.$message.warning('请完善表单信息！');
          }
        })
      },
      // 添加职位
      addJob() {
        this.form.clubDutyList.push({ name: '' });
      },
      // 删除职位
      removeJob(job, index) {
        if (job.id) {
          this.form.removeDutyIds.push(job.id);
        }
        this.form.clubDutyList.splice(index, 1);
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
    .detail-job-row {
      margin: 0;
    }
  }
</style>
