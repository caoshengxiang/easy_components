<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane :label="!detailInfo && !$route.query.id ? '新增团费' : '团费详情'" name="first">
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
                <el-form-item label="收支类型：" prop="cate">
                  <service-select
                    v-model="form.cate"
                    :data-service="$api.LACommunityManage.characterList"
                    :default-query="{ key: '收支类型' }"
                    clearable
                    pureList
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="金额：" prop="amount">
                  <el-input v-model="form.amount" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="时间：" prop="occurTime">
                  <el-date-picker type="datetime" v-model="form.occurTime" value-format="yyyy-MM-dd HH:mm:ss" />
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
    communityName: 'memberManageDetail',
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
          youthLeagueBranchId: Number(this.$route.query.youthLeagueBranchId),
          leagueName: this.$route.query.leagueName,
        },
        rules: {
          leagueName: [{ required: true, message: '请选择团支部', trigger: 'change' }],
          cate: [{ required: true, message: '请输入收支', trigger: 'change' }],
          amount: [
            { required: true, message: '请输入金额', trigger: 'blur' },
            { pattern: /^(([1-9]\d*(\.\d+)?)|(0\.\d+))$/, message: '请输入大于0的数字！', trigger: 'blur' }
          ],
          occurTime: [{ required: true, message: '请输入时间', trigger: 'change' }],
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
          this.editStatus = false;
        } else if (this.$route.query.id) {
          this.loading = true;
          this.$api.LALeagueFee.detail(this.$route.query.id)
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
            let dataService = this.$api.LALeagueFee.add; // 新增
            if (this.detailInfo || this.$route.query.id) { // 编辑
              dataService = this.$api.LALeagueFee.update;
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
    }
  };
</script>

<style lang="scss" scoped>
  .form-container {
    width: 460px;
    margin: auto;
    .fee-row {
      margin: 12px 0;
    }
  }
</style>
