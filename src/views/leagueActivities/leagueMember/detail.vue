<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增团员' : '团员详情'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部：" prop="leagueName">
                  <service-select
                    v-model="form.leagueName"
                    name="name"
                    field="name"
                    :data-service="$api.LABranchManage.simpleAll"
                    clearable
                    @after-select="afterLeagueSelect"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学生：" prop="memberName">
                  <el-select
                    v-model="form.memberName"
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
                <el-form-item label="职位：" prop="duty">
                  <service-select
                    v-model="form.duty"
                    name="name"
                    field="name"
                    :data-service="$api.dictData.getByCode"
                    :default-query="{ code: 'leagueBranch' }"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任职时间：" prop="employeeDate">
                  <el-date-picker v-model="form.employeeDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="入团时间：" prop="entryDate">
                  <el-date-picker v-model="form.entryDate" value-format="yyyy-MM-dd" />
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
  import ServiceSelect from '@/components/ServiceSelect'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    idNo: 'leagueMemberDetail',
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
        studentLoading: false,
        editStatus: true,
        form: {
          jobs: ['']
        },
        rules: {
          leagueName: [{ required: true, message: '请选择团支部', trigger: 'change' }],
          memberName: [{ required: true, message: '请输入学生', trigger: 'blur' }],
          duty: [{ required: true, message: '请输入职位', trigger: 'change' }],
          employeeDate: [{ required: true, message: '请输入任职时间', trigger: 'change' }],
          entryDate: [{ required: true, message: '请输入入团时间', trigger: 'change' }],
          content: [{ required: true, message: '请输入工作内容', trigger: 'blur' }],
        },
        studentOptions: []
      }
    },
    created() {
     this.getData();
    },
    methods: {
      getData() {
        if (this.detailInfo) {
          this.form = this.detailInfo;
          this.editStatus = false;
        } else if (this.$route.query.id) {
          this.loading = true;
          this.$api.LALeagueMember.detail(this.$route.query.id)
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
            let dataService = this.$api.LALeagueMember.add; // 新增
            if (this.detailInfo || this.$route.query.id) { // 编辑
              dataService = this.$api.LALeagueMember.update;
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
      afterLeagueSelect(row) {
        this.$set(this.form, 'youthLeagueBranchId', row.id)
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
  }
</style>
