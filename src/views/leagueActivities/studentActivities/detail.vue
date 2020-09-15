<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增学生活动' : '编辑学生活动'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="社团名称：" prop="clubName">
                  <service-select
                    v-model="form.clubName"
                    name="name"
                    field="name"
                    :data-service="$api.LACommunityManage.simpleAll"
                    clearable
                    @after-select="afterClubSelect"
                    style="width: 100%"
                  />
                </el-form-item>

              </el-col>
              <el-col :span="24">
                <el-form-item label="活动主题：" prop="theme">
                  <el-input v-model="form.theme" />
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
                <el-form-item label="活动地点：" prop="addr">
                  <el-input v-model="form.addr" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="活动内容：" prop="content">
                  <vue-ueditor-wrap
                    ref="contentUEditor1"
                    v-model="form.content"
                    :config="{
                      initialFrameWidth: null,
                      initialFrameHeight: 250
                    }"
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
  import Breadcrumb from '@/components/Breadcrumb'
  import ServiceSelect from '@/components/ServiceSelect'
  import VueUeditorWrap from '@/components/VueUeditorWrap';

  export default {
    communityName: 'studentActivitiesDetail',
    components: {
      YDetailPageLayout,
      Breadcrumb,
      ServiceSelect,
      VueUeditorWrap
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
        rules: {
          clubName: [{ required: true, message: '请选择社团名称', trigger: 'change' }],
          theme: [{ required: true, message: '请输入活动主题', trigger: 'blur' }],
          principal: [{ required: true, message: '请选择负责人', trigger: 'change' }],
          activityTime: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
          content: [{ required: true, message: '请输入活动内容', trigger: 'change' }],
        }
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
          this.editStatus = false
        } else if (this.$route.query.id) {
          this.loading = true;
          this.$api.studentActivities.getDetail(this.$route.query.id).then(res => {
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
      afterClubSelect(row) {
        this.$set(this.form, 'clubId', row.id);
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.$route.query.id) {
              this.$api.studentActivities.editStudentActivity({...this.form}).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑学生活动成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/studentActivities',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              }).catch(_ => this.loading = false);
            } else {
              this.$api.studentActivities.addStudentActivity({...this.form}).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增学生活动成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/studentActivities',
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  .form-container {
    width: 820px;
    margin: auto;
    .job-row {
      margin: 12px 0;
    }
  }
</style>
