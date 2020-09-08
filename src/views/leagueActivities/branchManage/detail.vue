<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增团支部' : '团支部详情'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部名称：" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="负责人：" prop="principal">
                  <el-input v-model="form.principal" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="电话：" prop="phone">
                  <el-input v-model="form.phone" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成立日期：" prop="buildDate">
                  <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="关联班级：" prop="clbum">
                  <service-select
                    v-model="form.clbum"
                    name="name"
                    field="name"
                    :data-service="$api.clbum.listbase"
                    clearable
                    @after-select="afterClbumSelect"
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
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'branchManageDetail',
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
        form: {},
        rules: {
          name: [{ required: true, message: '请输入团支部名称', trigger: 'blur' }],
          principal: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '格式不正确！', trigger: 'blur' }
          ],
          buildDate: [{ required: true, message: '请输入成立日期', trigger: 'change' }],
          clbum: [{ required: true, message: '请输入关联班级', trigger: 'change' }],
        }
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
          this.$api.LABranchManage.detail(this.$route.query.id)
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
            let dataService = this.$api.LABranchManage.add; // 新增
            if (this.detailInfo || this.$route.query.id) { // 编辑
              dataService = this.$api.LABranchManage.update;
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
      addJob() {
        this.form.jobs.push('');
      },
      removeJob(index) {
        this.form.jobs.splice(index, 1);
      },
      afterClbumSelect(row) {
        this.form.clbumId = row.id;
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
