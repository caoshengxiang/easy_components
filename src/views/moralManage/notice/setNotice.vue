<template>
  <common-layout>
    <y-detail-page-layout @save="save" :editStatus="editStatus">
      <el-tabs value="first">
        <el-tab-pane label="生产规则" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="160px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="放假日期：" prop="holidayDate">
                  <el-date-picker v-model="form.holidayDate" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="一二年级返校日期：" prop="returnDateOneTwo">
                  <el-date-picker v-model="form.returnDateOneTwo" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="三年级返校日期：" prop="returnDateThree">
                  <el-date-picker v-model="form.returnDateThree" value-format="yyyy-MM-dd" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="通知书发放日期：" prop="noticeDate">
                  <el-date-picker v-model="form.noticeDate" value-format="yyyy-MM-dd" />
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

export default {
  name: 'setNotice',
  components: {
    CommonLayout,
    YDetailPageLayout
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
      }
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // todo 对接口
          const query = getState('query');
          console.log(query);
        } else {
          this.$message.warning('请完善表单信息！');
        }
      })
    }
  }
};
</script>

<style scoped>
.form-container {
  width: 380px;
  margin: auto;
}
</style>
