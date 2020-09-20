export const originalFormData = {
  list: [ // 原始表单配置
    {
      tag: 'radio', // 组件类型
      name: '单选框', // label名称
      idName: '单选框', // 组件名称
      data: [ // 选项数据
        {label: '备选项1', value: 1},
        {label: '备选项2', value: 2},
        {label: '备选项3', value: 3},
      ],
      placeholder: '',
      bindValue: '', // 绑定值
      disabled: false, // 是否禁用
      inline: false, // 是否行内元素
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'blur',
        }],
      tempFieldName: '', // 前端生成随机字段名称，用于表单验证传递prop
    }, {
      tag: 'checkbox',
      name: '多选框',
      idName: '多选框',
      data: [
        {label: '复选框A', value: 1},
        {label: '复选框B', value: 2},
        {label: '复选框C', value: 3},
      ],
      placeholder: '',
      bindValue: [],
      disabled: false,
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'blur',
        }],
      tempFieldName: '',
    }, {
      tag: 'input',
      name: '输入框',
      idName: '输入框',
      data: [],
      placeholder: '请输入内容',
      bindValue: '',
      disabled: false,
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请输入内容',
          trigger: 'blur',
        }],
      tempFieldName: '',
    }, {
      tag: 'textarea',
      name: '文本域',
      idName: '文本域',
      data: [],
      placeholder: '请输入内容',
      bindValue: '',
      disabled: false,
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请输入内容',
          trigger: 'blur',
        }],
      tempFieldName: '',
    }, {
      tag: 'inputNumber',
      name: '计数器',
      idName: '计数器',
      min: 1,
      max: 10,
      placeholder: '描述文字',
      bindValue: '',
      disabled: false,
      step: 1, // 步数
      precision: 0, // 精度
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请输入内容',
          trigger: 'blur',
        }],
      tempFieldName: '',
    }, {
      tag: 'select',
      name: '选择器',
      idName: '选择器',
      data: [
        {
          label: '选项A',
          value: 1,
        }, {
          label: '选项B',
          value: 2,
        }],
      placeholder: '请选择',
      bindValue: '',
      disabled: false,
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'change',
        }],
      tempFieldName: '',
    }, {
      tag: 'cascader',
      name: '级联选择器',
      idName: '级联选择器',
      data: [
        {
          value: '设计原则',
          label: '设计原则',
          children: [
            {
              value: '一致',
              label: '一致',
            }, {
              value: '反馈',
              label: '反馈',
            }, {
              value: '效率',
              label: '效率',
            }, {
              value: '可控',
              label: '可控',
            }],
        }, {
          value: '导航',
          label: '导航',
          children: [
            {
              value: '侧向导航',
              label: '侧向导航',
            }, {
              value: '顶部导航',
              label: '顶部导航',
            }],
        },
      ],
      placeholder: '请选择',
      bindValue: [],
      disabled: false,
      inline: false,
      library: 'none', // 是否引入字典库，none 无，area地区
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'change',
        }],
      tempFieldName: '',
    }, {
      tag: 'datePicker',
      name: '日期选择器',
      idName: '日期选择器',
      data: [],
      placeholder: '请选择日期',
      bindValue: '',
      disabled: false,
      valueFormat: 'yyyy-MM-dd',
      type: 'date', // datetime
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'change',
        }],
      tempFieldName: '',
    }, {
      tag: 'upload',
      name: '文件上传',
      idName: '文件上传',
      data: [],
      placeholder: '',
      bindValue: '',
      disabled: false,
      action: '',
      headers: {},
      inline: false,
      checkArr: [
        { // 检验对象
          required: false,
          message: '请选择',
          trigger: 'change',
        }],
      tempFieldName: '',
    },
  ],
  rules: null,
  formFields: null,
  formField: null,
}
