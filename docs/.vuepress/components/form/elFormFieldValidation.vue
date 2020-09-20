<template>
  <div class="com-pages">
    <div class="com-page-con">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <!--type="age"  不能输入小数点-->
          <el-input type="age" v-model.number="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="test" prop="test">
          <el-input v-model="ruleForm.test"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  /* 表单验证 */
  import { filedRequired, filedType, filedLength, filedValidator, validate } from '../../../../src/utils/fieldValidation'

  export default {
    name: 'elFormFieldValidation',
    data () {
      let validateNumOneToNine = (rule, value, callback) => { // 1-9 整数
        if (Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) < 10) {
          callback()
        } else {
          callback(new Error('请输入1-10的整数'))
        }
      }
      return {
        /* 表单验证 */
        ruleForm: {
          name: '',
          region: '',
          type: [], // 注意：数组类型得时候数据也必须为数组
          resource: '',
          date1: '',
          date2: '',
          age: '',
          phone: '',
          test: '',
        },
        rules: { // 规则验证是有先后顺序
          name: [filedRequired(), filedLength(3, 20)],
          region: [filedRequired('change')],
          type: [validate.filedType('array'), validate.filedRequired('change', '活动性质', '请至少选择一个')],
          resource: [validate.filedRequired('change', '活动资源')],
          date1: [filedType('date'), validate.filedRequired('change', '日期')],
          date2: [filedType('date'), validate.filedRequired('change', '时间')],
          age: [filedValidator(validateNumOneToNine), validate.filedRequired()],
          phone: [validate.validatePhone],
          test: [validate.validateIdCard],
        },
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
    }
  }
</script>

<style scoped lang="scss">
</style>
