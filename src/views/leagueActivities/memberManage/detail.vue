<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增社员' : '社员详情'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="社团：" prop="clubName">
                  <service-select
                    v-model="form.clubName"
                    name="name"
                    field="name"
                    :data-service="$api.LACommunityManage.simpleAll"
                    placeholder="社团"
                    @change="onClubChange"
                    clearable
                    @after-select="afterClubSelect"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="职务：" prop="dutyName">
                  <service-select
                    ref="clubDutySelect"
                    v-model="form.dutyName"
                    name="name"
                    field="name"
                    :data-service="$api.LAMemberManage.dutySimpleAll"
                    :default-query="form.clubId"
                    :disabled="!form.clubId"
                    placeholder="职务"
                    clearable
                    @after-select="afterClubDutySelect"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学生：" prop="studentName">
                  <el-select
                    v-model="form.studentName"
                    filterable
                    remote
                    placeholder="请输入关键词"
                    :remote-method="filterStudent"
                    :loading="studentLoading"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in studentOptions"
                      :key="item.id"
                      :label="`${item.idNo}-${item.clbum || '暂无'}-${item.name}`"
                      :value="item.id"
                      @click.native="afterStudentSelect(item)"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任职日期：" prop="employeeDate">
                  <el-date-picker v-model="form.employeeDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入社日期：" prop="entryDate">
                  <el-date-picker v-model="form.entryDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="状态：" prop="state">
                  <service-select
                    v-model="form.state"
                    :data-service="$api.LACommunityManage.characterList"
                    :default-query="{ key: '社员状态' }"
                    placeholder="状态"
                    clearable
                    pureList
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="社团评价：" prop="evaluation">
                  <el-input type="textarea" :rows="6" v-model="form.evaluation" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工作内容：" prop="content">
                  <el-input type="textarea" :rows="6" v-model="form.content" />
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
  import Breadcrumb from '@/components/Breadcrumb'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'memberManageDetail',
    components: {
      YDetailPageLayout,
      Breadcrumb,
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
        studentLoading: false,
        editStatus: true,
        form: {
          clubId: Number(this.$route.query.clubId),
          clubName: this.$route.query.clubName,
        },
        rules: {
          clubName: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
          // dutyName: [{ required: true, message: '请输入职务', trigger: 'blur' }],
          studentName: [{ required: true, message: '请输入学生', trigger: 'blur' }],
          // employeeDate: [{ required: true, message: '请输入任职日期', trigger: 'change' }],
          entryDate: [{ required: true, message: '请输入入社日期', trigger: 'change' }],
          state: [{ required: true, message: '请输入状态', trigger: 'blur' }],
          // evaluation: [{ required: true, message: '请输入社团评价', trigger: 'blur' }],
          // content: [{ required: true, message: '请输入工作内容', trigger: 'blur' }],
        },
        studentOptions: []
      }
    },
    watch: {
      detailInfo: function (value) {
        this.form = value
      },
    },
    created() {
      let that = this;
      if (this.detailInfo) {
        this.form = this.detailInfo;
        that.editStatus = false
      }
      else{
        this.getData();
      }
    },
    methods: {
      getData() {
        if (this.detailInfo) {
          this.form = this.detailInfo;
          this.editStatus = false;
        } else if (this.$route.query.id) {
          this.loading = true;
          this.$api.LAMemberManage.detail(this.$route.query.id)
            .then(res => {
              this.form = res.data;
              this.$nextTick(function() {
                this.loading = false;
              });
            })
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true;
            let dataService = this.$api.LAMemberManage.add; // 新增
            if (this.detailInfo || this.$route.query.id) { // 编辑
              dataService = this.$api.LAMemberManage.update;
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
              .catch(_ => this.loading = false);
          } else {
            this.$message.warning('请完善表单信息！');
          }
        })
      },
      onClubChange() {
        this.$set(this.form, 'dutyName', '');
      },
      afterClubSelect(row) {
        this.$set(this.form, 'clubId', row.id);
      },
      afterClubDutySelect(row) {
        this.form.clubDutyId = row.id;
      },
      filterStudent(query) {
        if (query) {
          this.studentLoading = true;
          this.$api.LAMemberManage.filterStudent(query)
            .then(res => {
              this.studentOptions = res.data;
              this.studentLoading = false;
            });
        } else {
          this.studentOptions = [];
        }
      },
      afterStudentSelect(row) {
        this.form.studentId = row.id;
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
