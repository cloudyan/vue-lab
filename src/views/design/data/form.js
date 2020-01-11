
export const tabs = {
  formData: {
    schema: 'func',
  },
  propsSchema: {
    title: '切换 schema 数据',
    type: 'object',
    displayType: 'row',
    required: ['schema'],
    properties: {
      schema: {
        title: '切换 schema',
        type: 'string',
        widget: 'select',
        width: '320px',
        enum: [
          'tabbar',
          'jsonConfig',
          'func',
          'nest',
        ],
      },
    },
  },
}

export const func = {
  formData: {
    name: 'aaaax',
  },
  propsSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '函数表达式支持',
        widget: 'input',
        hidden: '{{rootValue.name.length > 5}}',
        options: {
        },
      },
    },
  },
}

// change bug
export const nest = {
  formData: {
    a: {
      b: {
        c: 'd',
      },
    },
  },
  propsSchema: {
    type: 'object',
    properties: {
      a: {
        type: 'object',
        title: 'A',
        properties: {
          b: {
            type: 'object',
            title: 'B',
            properties: {
              c: {
                type: 'object',
                title: 'C',
                widget: 'input',
              },
            },
          },
        },
      },
    },
  },
}

export const editor = {
  formData: {
    json: {},
  },
  propsSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: '编辑器',
    type: 'object',
    properties: {
      json: {
        title: 'JSON 数据',
        type: 'object',
        widget: 'jsonEditor',
        options: {

        },
      },
    },
  },
}

export const tabbar = {
  formData: {
    text: '首页',
    action: 'scheme/web',
    url: 'https://m.haoshiqi.net/index',
    icon_normal: 'https://files.haoshiqi.net/unknown/1uUnEMkJ5O_home_normal.png',
    icon_selected: 'https://files.haoshiqi.net/unknown/ZKeFIAP3nl_home_selected.png',
    // text_color_normal: '#333333',
    // text_color_selected: '#FF0000',
  },
  propsSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/widget.schema.json',  // 第一个$id 可以写此文件存放路径
    title: 'tabbar 项',
    description: 'A widget schema for tianma design platform',
    type: 'object',
    column: 2,
    displayType: 'column', // column row
    showValidate: true,
    showDescIcon: false,
    required: ['action', 'url', 'icon_normal'],
    properties: {
      text: {
        title: 'Icon 文字',
        description: '描述',
        type: 'string',
        widget: 'input',
        maxLength: 8,
        minLength: 2,
        options: {
          label: 'Icon 文字',
          placeholder: 'Icon 文字, 最短 2, 最长 8',
          // disabled: true,
        },
      },
      action: {
        title: '跳转链接类型',
        type: 'string',
        widget: 'select',
        default: 'schema',
        options: {
          placeholder: '',
          showLabel: true,
        },
        enum: [
          'schema',
          'schema/web',
        ],
        enumNames: [
          'schema 链接',
          'H5 链接',
        ],
      },
      url: {
        title: '跳转链接',
        description: '根据连接类型附加格式校验',
        type: 'string',
        widget: 'input',
        options: {
          placeholder: '请配置 schema url 或 https url',
        },
      },
      icon_normal: {
        title: 'Icon图片路径',
        type: 'string',
        widget: 'upload',
        options: {
          placeholder: '支持远程 URL',
          limit: 1,
          // drag: true,
          listType: 'picture-card',
          action: '#',
          autoUpload: false,
        },
      },
      icon_selected: {
        title: 'Icon选中时的图片路径',
        type: 'string',
        widget: 'upload',
        options: {
          placeholder: '支持远程 URL',
          limit: 1,
          // drag: true,
          listType: 'picture-card',
          action: '#',
          autoUpload: false,
        },
      },
      text_color_normal: {
        title: '文字默认颜色',
        type: 'string',
        widget: 'color',
        default: '',
        options: {
          showAlpha: false,
        },
      },
      text_color_selected: {
        title: '文字选中时的颜色',
        type: 'string',
        widget: 'color',
        default: '',
        options: {
          colorFormat: '', // hsl hsv hex rgb
          showAlpha: true,
        },
      },
    },
  },
}


export const jsonConfig = {
  formData: {
    productId: '1',
    platformId: '1',
    name: 'xx',
    startTime: '',
    endTime: '',
    minVersion: '',
    maxVersion: '',
    metadata: { a: 1 },
  },
  propsSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/widget.schema.json',
    title: 'jsonConfig 配置项',
    type: 'object',
    column: 1,
    displayType: 'column', // column row
    required: ['productId', 'platformId', 'minVersion', 'maxVersion', 'metadata'],
    properties: {
      productId: {
        title: '业务线',
        type: 'string',
        widget: 'select',
        default: '',
        width: '50%',
        options: {
          placeholder: '请选择',
        },
        enum: [
          '1',
          '2',
          '3',
        ],
        enumNames: [
          'hsq',
          'iqg',
          'msf',
        ],
      },
      platformId: {
        title: '平台',
        type: 'string',
        widget: 'select',
        default: '',
        options: {
          placeholder: '请选择',
        },
        enum: [
          '1',
          '2',
          '3',
          '4',
          '5',
        ],
        enumNames: [
          'iOS',
          'Android',
          'aliapp',
          'wxapp',
          'h5',
        ],
        width: '50%',
      },
      name: {
        title: '名称',
        description: '自己起',
        type: 'string',
        widget: 'input',
        minLength: 2,
        maxLength: 50,
        disabled: (formData, rootValue) => { return rootValue.productId === '2' },
        options: {
          placeholder: '自定义名称',
        },
      },
      startTime: {
        title: '开始时间',
        description: '',
        type: 'number',
        widget: 'dateTime',
        options: {
          placeholder: '请选择日期时间',
          valueFormat: 'timestamp',
        },
        width: '50%',
      },
      endTime: {
        title: '结束时间',
        description: '',
        type: 'number',
        widget: 'dateTime',
        width: '50%',
        options: {
          placeholder: '请选择日期时间',
          valueFormat: 'timestamp',
          // format: 'range',
        },
      },
      minVersion: {
        title: '最小版本',
        description: '',
        type: 'string',
        widget: 'input',
        width: '50%',
        options: {
          placeholder: '1.0.0',
        },
      },
      maxVersion: {
        title: '最大版本',
        description: '',
        type: 'string',
        widget: 'input',
        width: '50%',
        options: {
          placeholder: '2.0.0',
        },
      },
      metadata: {
        title: 'JSON 数据',
        type: 'object',
        widget: 'jsonEditor',
        options: {

        },
      },
    },
  },
}
