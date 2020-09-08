<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增团员活动' : '编辑团员活动'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部：" prop="leagueName">
                  <service-select
                    v-model="form.leagueName"
                    name="name"
                    field="name"
                    :data-service="$api.LABranchManage.simpleAll"
                    clearable
                    @after-select="afterYouthLeagueBranchSelect"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="负责人：" prop="principal">
                  <el-input v-model="form.principal" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动时间：" prop="activityTime">
                  <el-date-picker
                    v-model="form.activityTime"
                    type="datetime"
                    style="width:100%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动类型：" prop="cate">
                  <el-input v-model="form.cate" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动内容：" prop="content">
                  <el-input v-model="form.content" type="textarea"/>
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
  import ServiceSelect from "../../../components/ServiceSelect"
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    communityName: 'leagueMemberActivitiesDetail',
    components: {
      ServiceSelect,
      YDetailPageLayout,
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
          // studentID: [{ required: true, message: '请输入学生身份证号', trigger: 'blur' }],
          // level: [{ required: true, message: '请输入级别', trigger: 'blur' }],
          // unit: [{ required: true, message: '请输入任职单位', trigger: 'blur' }],
          // cadresName: [{ required: true, message: '请输入干部名称', trigger: 'blur' }],
          // semester: [{ required: true, message: '请输入学期', trigger: 'blur' }],
          // jobs: [{ required: true, message: '请输入学生干部岗位', trigger: 'blur' }],
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
          this.editStatus = false
        } else if (this.$route.query.id) {
          this.loading = true;
          // todo 对接口
          this.$api.leagueMemberActivities.getDetail(this.$route.query.id).then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.form = res.data
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // todo 对接口
            if (this.$route.query.id) {
              this.$api.leagueMemberActivities.edit({...this.form}).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑团员活动成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/leagueMemberActivities',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              }).catch(_ => this.loading = false);
            } else {
              this.$api.leagueMemberActivities.add({...this.form}).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增团员活动成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/leagueMemberActivities',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              }).catch(_ => this.loading = false);
            }
          } else {
            this.$message.warning('请完善表单信息！');
          }
        })
      },
      afterYouthLeagueBranchSelect(row) {
        this.$set(this.form,'youthLeagueBranchId', row.id)
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
