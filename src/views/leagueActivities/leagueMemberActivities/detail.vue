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
  import ServiceSelect from "../../../components/ServiceSelect"
  import Breadcrumb from '@/components/Breadcrumb'
  import VueUeditorWrap from '@/components/VueUeditorWrap';

  export default {
    communityName: 'leagueMemberActivitiesDetail',
    components: {
      ServiceSelect,
      YDetailPageLayout,
      Breadcrumb,
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
        form: {},
        rules: {
          leagueName: [{ required: true, message: '请选择团支部', trigger: 'change' }],
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
    width: 820px;
    margin: auto;
    .job-row {
      margin: 12px 0;
    }
  }
</style>
