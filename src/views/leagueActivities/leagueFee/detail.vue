<template>
  <div class="app-container">
    <div class="title-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>
    </div>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="新增团费" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="团支部：" prop="branchName">
                  <!-- todo 对接口 -->
                  <service-select
                    v-model="form.branchName"
                    amount="amount"
                    field="id"
                    :data-service="$api.baseInfo.getGradeList"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收支：" prop="fee">
                  <el-select v-model="form.fee">
                    <el-option label="收入" value="收入" />
                    <el-option label="支出" value="支出" />
                    <el-option label="上缴" value="上缴" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="金额：" prop="amount">
                  <el-input v-model="form.amount" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="时间：" prop="createdDate">
                  <el-date-picker v-model="form.createdDate" value-format="yyyy-MM-dd" />
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

  export default {
    communityName: 'memberManageDetail',
    components: {
      YDetailPageLayout,
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
        editStatus: true,
        form: {
          jobs: ['']
        },
        rules: {
          branchName: [{ required: true, message: '请选择团支部', trigger: 'change' }],
          fee: [{ required: true, message: '请输入收支', trigger: 'blur' }],
          amount: [
            { required: true, message: '请输入金额', trigger: 'blur' },
            { pattern: /^(([1-9]\d*(\.\d+)?)|(0\.\d+))$/, message: '请输入大于0的数字！', trigger: 'blur' }
          ],
          createdDate: [{ required: true, message: '请输入时间', trigger: 'change' }],
        }
      }
    },
    created() {
     this.getData();
    },
    methods: {
      getData() {
        if (this.detailInfo) {
          this.form = this.detailInfo
        } else if (this.$route.query.id) {
          this.loading = true;
          this.editStatus = false;
          // todo 对接口
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // todo 对接口
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
    width: 460px;
    margin: auto;
    .fee-row {
      margin: 12px 0;
    }
  }
</style>
