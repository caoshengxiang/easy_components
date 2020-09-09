<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增学生干部' : '编辑学生干部'" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-form-item label="学生：" prop="name">
                <el-select
                  v-model="form.name"
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
<!--              <el-col :span="24">-->
<!--                <el-form-item label="学生身份证号：" prop="studentID">-->
<!--                  <el-input v-model="form.studentID" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="24">-->
<!--                <el-form-item label="级别：" prop="level">-->
<!--                  <el-input v-model="form.level" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="24">-->
<!--                <el-form-item label="任职单位：" prop="unit">-->
<!--                  <el-input v-model="form.unit" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="24">-->
<!--                <el-form-item label="干部名称：" prop="cadresName">-->
<!--                  <el-input v-model="form.cadresName" />-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="24">
                <el-form-item label="学期：" prop="termId">
                  <service-select
                    v-model="form.termId"
                    name="name"
                    field="id"
                    :data-service="$api.studentCadres.term"
                    clearable
                    :immediate="false"
                    @after-select="afterTermSelect"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="学生干部岗位：" prop="postIds">
                  <service-select
                    v-model="form.postIds"
                    :multiple="true"
                    :pureList="false"
                    name="name"
                    field="id"
                    :data-service="$api.post.simpleAll"
                    clearable
                    :immediate="false"
                    @after-select="afterPostSelect"
                    style="width: 100%"
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
  import ServiceSelect from "@/components/ServiceSelect";

  export default {
    communityName: 'studentCadresDetail',
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
        studentLoading:false,
        studentOptions:[],
        termOptions:[],
        form: {},
        rules: {
          name: [{ required: true, message: '请选择学生', trigger: 'change' }],
          termId: [{ required: true, message: '请选择学期', trigger: 'change' }],
          postIds: [{ required: true, message: '请选择学生干部岗位', trigger: 'change' }],
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
          this.$api.studentCadres.getDetail(this.$route.query.id).then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.postList && res.data.postList.length > 0) {
                res.data.postIds = res.data.postList.map( item => {
                  return item.id
                })
              }
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
            let { postIds = [], ...formData } = this.form;
            formData.removeIds = [];
            if (this.$route.query.id) {
              formData.postList.forEach(item => {
                if (!postIds.includes(item.id)) {
                  formData.removeIds.push(item.id)
                }
              })
            }
            if (Array.isArray(postIds) && postIds.length > 0) {
              formData.postList = postIds.map( id => {
                return { id }
              })
            }
            if (this.$route.query.id) {

              this.$api.studentCadres.edit(formData).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '编辑学生干部成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/studentCadres',
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                }
              }).catch(_ => this.loading = false);
            } else {
              this.$api.studentCadres.add(formData).then(res => {
                this.loading = false;
                if (res.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新增学生干部成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.$router.push({
                    path: '/views/leagueActivities/studentCadres',
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
      },
      afterPostSelect(row) {
      },
      afterTermSelect(row) {
        this.$set(this.form,'termName',row.name)
      },
    },
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
