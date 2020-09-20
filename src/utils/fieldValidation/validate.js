// 表单验证
export const validatePhone = (rule, value, callback) => { // 自定义规则验证手机号
                                                          // let regPhone = /^1[3,4,5,7,8][0-9]{9}$/
  let regPhone = /^1[0-9]{10}$/ // 只验证十一位
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!regPhone.test(value)) {
    callback(new Error('请输入有效手机号!'))
  } else {
    callback()
  }
}
// 不能选以前的时间验证
export const validateBeforeTime = (rule, value, callback) => {
  let currentDate = new Date()
  if (Date.parse(value) < Date.parse(currentDate)) {
    callback(new Error('请正确选择时间'))
  } else {
    callback()
  }
}

// 验证大于零的整数
export const validateInteger = (rule, value, callback) => { // 注意绑定数字类型 v-model.number=""
  if (Number.isInteger(Number(value)) && Number(value) > 0) {
    callback()
  } else {
    callback(new Error('请输入有效的数字'))
  }
}

// 验证中文
export const validateChinese = (rule, value, callback) => {
  if (/^[\u0391-\uFFE5]+$/.test(value)) {
    callback()
  } else {
    callback(new Error('请输入中文'))
  }
}
// 验证英文字母
export const validateZm = (rule, value, callback) => {
  if (/^[a-zA-Z]*$/.test(value)) {
    callback()
  } else {
    callback(new Error('请输入英文字母'))
  }
}

// 验证邮箱
export const validateEmail = (rule, value, callback) => {
  // const reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/
  const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱'))
  }
}
// 验证省份证
export const validateIdCard = (rule, value, callback) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效身份证'))
  }
}
// 验证金额，精确到2位小数
export const validateMoney = (rule, value, callback) => {
  const reg = /^[0-9]+(.[0-9]{2})?$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效金额'))
  }
}
