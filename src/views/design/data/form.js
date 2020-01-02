export const tabbar = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/widget.schema.json',  // 第一个$id 可以写此文件存放路径
  title: 'tabbar 项',
  description: 'A widget schema for tianma design platform',
  type: 'object',
  options: {
    text: '首页',
    action: 'scheme/web',
    url: 'https://m.haoshiqi.net/index',
    icon_normal: 'https://files.haoshiqi.net/unknown/1uUnEMkJ5O_home_normal.png',
    icon_selected: 'https://files.haoshiqi.net/unknown/ZKeFIAP3nl_home_selected.png',
    text_color_normal: '#333333',
    text_color_selected: '#FF0000',
  },
  // required: [],
  properties: {
    text: {
      title: 'Icon 文字',
      type: 'string',
      widget: 'input',
    },
    action: {
      title: '跳转链接类型',
      type: 'string',
      widget: 'select',
      default: '',
      options: {
        placeholder: '',
      },
    },
    url: {
      title: '跳转链接',
      type: 'string',
      widget: 'input',
      options: {
        placeholder: 'https://m.haoshiqi.net/v2/xxx?xx=xxx',
      },
    },
    icon_normal: {
      title: 'Icon图片路径',
      type: 'string',
      widget: 'input',
    },
    icon_selected: {
      title: 'Icon选中时的图片路径',
      type: 'string',
      widget: 'input',
    },
    text_color_normal: {
      title: '文字默认颜色',
      type: 'string',
      widget: 'color',
      default: '',
      options: {},
    },
    text_color_selected: {
      title: '文字选中时的颜色',
      type: 'string',
      widget: 'color',
      default: '',
      options: {},
    },
  },
}
