<template>

  <div class="classNotice-detail app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="操行类型详情" name="first">
          <el-form ref="postForm" class="form-container" :model="postForm" inline>
            <el-row>
              <el-col :span="24">
                <template v-for="(job, index) in postForm.list">
                  <el-form-item label="项目名称："
                                :rules="{
                                  required: true, message: '项目名称不能为空', trigger: 'blur'
                                }"
                                :prop="'list.' + index + '.name'"
                  >
                      <el-input v-model="job.name"/>
                    </el-form-item>
                  <el-form-item label="分值："
                                :rules="{
                                  required: true, message: '分值不能为空', trigger: 'blur'
                                }"
                                :prop="'list.' + index + '.score'"
                  >
                      <el-input v-model="job.score"/>
                  </el-form-item>
                  <el-popconfirm v-if="postForm.list.length > 1 && editStatus" title="确认删除？"
                                 @onConfirm="removeJob(job, index)">
                    <el-button round type="danger" slot="reference">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-col>
              <el-col>
                <div style="display: flex;justify-content: center">
                  <el-button v-if="editStatus" type="primary" @click="addJob">新增</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </div>

</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import ServiceSelect from '@/components/ServiceSelect';

  export default {
    name: 'ComplexTable',
    components: {
      ServiceSelect,
      Breadcrumb,
      YDetailPageLayout
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
        postForm: {
          list: [{name: '', score: ''}],
          removeIds: []
        },
        rules: {
          list: [{
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }],
        },
      }
    },
    watch: {
      detailInfo: function (value) {
        this.postForm = value
      },
    },
    created() {
      const that = this;
      that.type = that.$route.query.type;
      if (that.detailInfo) {
        that.postForm = that.detailInfo;
        that.editStatus = false
      } else if (that.$route.query.id) {
        that.id = that.$route.query.id;
        that.getDetail();
        that.editStatus = true
      }

    },
    methods: {
      getDetail() {
        const that = this;
        that.$api.conductScore.getConductTypeItem({id:that.id}).then(res => {
          that.loading = false;
          if (res.code === 200) {
            that.postForm.list = res.data
            // console.log(res.data,that.id)
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      },
      save() {
        const that = this;
        that.loading = true;
        that.$refs.postForm.validate(valid => {
          if (valid) {
            console.log(that.postForm.list);
            this.$api.conductScore.conductTypeItemAdd({
              id: that.id,
              ...that.postForm
            }).then(res => {
              that.loading = false;
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                });
                that.$router.push({
                  path: '/views/moralManage/conductScore/setting',
                  query: {
                    menuLevel1: this.$route.query.menuLevel1
                  }
                })
              }
            }).catch(_ => that.loading = false)
          }
        })
      },
      // 添加职位
      addJob() {
        this.postForm.list.push({name: '',condutctTypeId:this.id, score:''});
      },
      // 删除
      removeJob(job, index) {
        if (job.id) {
          this.postForm.removeIds.push(job.id);
        }
        this.postForm.list.splice(index, 1);
      }
    }
  }
</script>
<style lang="scss" scoped>

  .form-container {
    width: 640px;
    margin: auto;
    .job-row {
      margin: 12px 0;
    }
  }
</style>
