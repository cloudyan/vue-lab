

// 标题 默认值 占位符 描述提示
// 单行文字和多行文字可以切换, 而不清空当前编辑的值
// type: 'null', 'boolean', 'object', 'array', 'number', 'string', 'integer'

export default {
  title: '编辑字段',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      widget: 'input',
      title: '标题',
      description: '关于字段标题:此属性用于告诉填写者应该在该字段中输入什么样的内容。通常是一两个简短的词语，也可以是一个问题。',
      value: '未命名',
      options: {
        placeholder: '未命名',
        required: true,
      },
    },
    default: {
      type: 'string',
      widget: 'input',
      title: '默认值',
      description: '关于默认值:设置后，此值将作为默认值显示在该字段的输入框中。如果不需要设置默认值，请将此处留空。',
    },
    placeholder: {
      type: 'string',
      widget: 'input',
      title: '占位符',
    },
    description: {
      type: 'string',
      widget: 'editor',
      title: '提示',
      description: '关于字段提示:此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。',
      options: {

      },
    },
    valid: {
      // 必须填
      // 将所有字段设为 必须填 或 非必须填
      // 不能和已有数据重复
      // 最少天 N 个字
      // 最多填 N 个字
      // 自定义出错提示
      title: '校验',
      type: 'object',
      properties: {
        required: {},
        requiredAll: {},
      },
    },
    layout: {
      // 展示样式 列表 或 下拉框
      // 如果是列表时(复选组件实现), 还可选排列方式 纵向 或 横向
      // 如果是下拉框 可 自定义选择默认文案
      // 宽度占用整行的 1/4 2/4 3/4
      properties: {
        layout: {},
        requiredAll: {},
      },
    },
    other: {
      // 字段隐藏
      // 自动填写上次提交内容
      // 选项展示顺序随机
      // 实时显示投票人数
    },

  },
}
