import {
  validatePhone,
  validateBeforeTime,
  validateInteger,
  validateChinese,
  validateZm,
  validateEmail,
  validateIdCard,
  validateMoney,
} from './validate'

export function filedRequired (type = 'blur', name = '', preText = '') { // 验证必选项
  // type 目前类型 blur , change
  let msg = type === 'blur' ? '请输入' : '请选择'
  if (preText) { // 有时需要特殊缀，如：上传图片  blur 提示请选择  filedRequired('blur', '', '请选择'),
    msg = preText
  }
  return {required: true, message: `${msg}${name}`, trigger: type}
}

export function filedLength (min = 1, max = 20) { // 验证长度
  return {
    min: min,
    max: max,
    message: `长度在 ${min} 到 ${max} 个字符`,
    trigger: 'blur',
  }
}

export function filedType (type = 'number', name = '') { // 类型
  // type 目前类型 number, date, array
  let str = ''
  if (type === 'number') {
    str = '数字'
  } else if (type === 'date') {
    str = '日期'
  } else if (type === 'array') {
    str = '数组'
  } else {
    str = '有效类型'
  }
  return {type: type, message: `${name}必须为${str}`}
}

export function filedValidator (callback = () => {}, trigger = 'blur') { // 自定义规则
  return {validator: callback, trigger: trigger}
}

export const validate = {
  filedRequired: filedRequired, // 方便一次引入
  filedLength: filedLength,
  filedType: filedType,
  validatePhone: filedValidator(validatePhone), // 自定义规则验证手机号
  validateBeforeTime: filedValidator(validateBeforeTime), // 自定义规则验证以前的时间
  validateInteger: filedValidator(validateInteger), // 验证大于零的整数
  validateChinese: filedValidator(validateChinese), // 验证中文
  validateZm: filedValidator(validateZm), // 验证英文字母
  validateEmail: filedValidator(validateEmail), // 验证邮箱
  validateIdCard: filedValidator(validateIdCard), // 验证省份证
  validateMoney: filedValidator(validateMoney), // 验证金额，精确到2位小数
}

/* 使用
* 参考test.vue
* */
