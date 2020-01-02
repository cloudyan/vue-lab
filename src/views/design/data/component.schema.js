
// 配置选项应该从组件中获取到, 这样不必配置与组件分离
// 这里只维护对应关系 显示名称及描述

// 组件库, 如 auto-render by element-ui
export const widgets = {

}

// 映射关系 可以对应到组件名或自定义组件
export const mapping = {
  default: 'empty-tip', // 匹配不上默认对应一个隐藏的提示组件
  input: 'input',
  number: '',
}

// 通用字段
// widget 对应真实的 组件 区块 或 模板
export const component = {
  input: {
    title: '单行文本',
    description: '',
    type: 'string',
    widget: 'input',
    default: '',
    options: {
      type: 'text',
      placeholder: '',
      clearable: false,
      disabled: false,
      showWordLimit: false,
      style: {
        width: '50%',
      },
    },
  },
  textarea: {
    title: '多行文本',
    type: 'string',
    widget: 'textarea',
    options: {
      type: 'textarea',
      autosize: false,
      showWordLimit: false,
    },
  },
  number: {
    title: '数字',
    type: ['number', 'integer'],
    widget: 'number',
    options: {
      max: undefined,
      min: undefined,
      step: 1,
    },
  },
  inputNumber: {
    title: '计数器',
    type: ['number', 'integer'],
    widget: 'inputNumber',
    options: {
      min: undefined,
      max: undefined,
      step: 1,
      disabled: false,
    },
  },
  uploadImage: {
    title: '上传图片',
    type: 'string',
    widget: 'uploadImage',
    options: {
      action: '',
      headers: {},
      multiple: false,
      withCredentials: false,
      drag: false,
      accept: '',
      disabled: false,
      limit: undefined,
      listType: 'text', // text/picture/picture-card
    },
  },
  uploadFile: {

  },
  radio: {},
  checkbox: {},
  imageRadio: {},
  imageCheckbox: {},
  time: {},
  date: {},
  dateTime: {},
  switch: {},
  select: {},
  cascader: {},
  tree: {},
  color: {},
  richtext: {},
  editor: {},
  rate: {},
  slider: {},

  // 布局组件
  layout: {},
  container: {},
  tabs: {},
  divider: {},
  pageBreak: {},
}

// 联系信息字段
export const contact = {
  username: {
    title: '姓名',
    type: 'string',
    widget: 'input',
    options: {

    },
  },
  password: {
    title: '密码',
    type: 'string',
    widget: 'input',
    options: {
      type: 'password',
      showPassword: false,
    },
  },
  mobile: {

  },
  email: {},
  phone: {},
  address: {},
  link: {},
  desc: {},
}

// 配置数据
export const schema = {

}
