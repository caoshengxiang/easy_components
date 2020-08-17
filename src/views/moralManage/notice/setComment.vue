<template>
  <common-layout>
    <y-detail-page-layout @save="save" :editStatus="editStatus" v-loading="loading">
      <el-tabs value="first">
        <el-tab-pane label="设置评语" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1S-整理：" prop="holidayDate">
                  <el-date-picker v-model="form.holidayDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="请选择评语：" prop="returnDateOneTwo">
                  <!-- todo 对接口 -->
                  <service-radio-group :data-service="$api.baseInfo.getClbumList" name="name" field="id" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="评语内容：" prop="returnDateThree">
                  <el-input type="textarea" :rows="6" maxlength="500" v-model="form.returnDateThree" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </y-detail-page-layout>
  </common-layout>
</template>

<script>
  import CommonLayout from '../common/CommonLayout'
  import YDetailPageLayout from '@/components/YDetailPageLayout'
  import { getState } from './noticeStore'
  import ServiceRadioGroup from '../common/ServiceRadioGroup'

  export default {
    name: 'setNotice',
    components: {
      CommonLayout,
      YDetailPageLayout,
      ServiceRadioGroup
    },
    data() {
      return {
        editStatus: true,
        form: {},
        rules: {
          holidayDate: [{ required: true, message: '请输入放假日期', trigger: 'change' }],
          returnDateOneTwo: [{ required: true, message: '请输入一二年级返校日期', trigger: 'change' }],
          returnDateThree: [{ required: true, message: '请输入三年级返校日期', trigger: 'change' }],
          noticeDate: [{ required: true, message: '请输入通知书发放日期', trigger: 'change' }]
        },
        loading: false
      }
    },
    created() {
      const { id } = this.$route.query;
      if (id) {
        this.editStatus = false;
        this.getData(id);
      }
    },
    methods: {
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // todo 对接口
            const selection = getState('listSelection');
            console.log(selection);
          } else {
            this.$message.warning('请完善表单信息！');
          }
        })
      },
      getData(id) {
        this.loading = true;
        // todo 对接口
      }
    }
  };
</script>

<style scoped>
  .form-container {
    max-width: 600px;
    margin: auto;
  }
</style>
