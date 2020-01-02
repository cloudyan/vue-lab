
// https://www.cnblogs.com/terencezhou/p/10474617.html
// https://www.jianshu.com/p/a41b540113f9
// 关于 json schema 可以搞个字描述的 schema 来熟悉
// type: 'null', 'boolean', 'object', 'array', 'number', 'string', 'integer'
// Json Schema支持的format包括
//     'date', 'time', 'date-time', 'email', 'hostname', 'uri'
// 数值满足倍数 multipleOf: 3
// 数值范围 最大值、最小值、开区间最大值、开区间最小值
//         minimum, maximum, exclusiveMinimum, exclusiveMaximum
// 数组元素个数 minItems, maxItems
// 数组内元素是否必须唯一 uniqueItems

// https://jsonschema.net/previous
// https://www.jsonschemavalidator.net/
// "$schema": "https://json-schema.org/draft/2019-09/schema",
// "$id": "https://json-schema.org/draft/2019-09/output/schema",
export const widgetSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/widget.schema.json',  // 第一个$id 可以写此文件存放路径
  title: 'widgetSchema',
  description: 'A widget schema for tianma design platform',
  type: 'object',
  properties: {
    base: {
      type: 'object',
      title: '通用字段',
      properties: {
        input: {
          title: '单行文本',
          type: 'string',
          widget: 'input',
          icon: '',
          options: {
            readonly: false,
            default: '',
            placeholder: 'xxx',
          },
          property: {
            title: '属性字段',
            type: 'object',
            properties: {
              title: {
                title: '标题',
                type: 'string',
                widget: 'input',
                default: '单行文本',
              },
              placeholder: {
                title: '占位符',
                type: 'string',
                widget: 'input',
                default: '',
              },
              required: {
                title: '是否必选',
                type: 'boolean',
                widget: 'checkbox',
                default: false,
              },
              readonly: {
                title: '只读',
                type: 'boolean',
                widget: 'checkbox',
                default: false,
              },
            },
          },
        },
        textarea: {
          title: '多行文本',
          type: 'string',
          format: 'textarea',
          widget: 'textarea',
          icon: '',
          options: {
            placeholder: 'xxx',
          },
        },
        number: {
          title: '数字',
          type: ['number', 'integer'],
          format: 'slider',
          widget: 'number',
          icon: '',
        },
        inputNumber: {
          title: '计数器',
          type: 'number',
          format: 'integer',
          widget: 'inputNumber',
          icon: '',
        },
        uploadImage: {
          title: '上传图片',
          type: 'string',
          format: '',
          widget: 'uploadImage',
          icon: '',
          options: {
            drag: false,
            withCredentials: false,
            multiple: undefined,
            listType: 'text',
            limit: 1,
          },
        },
        uploadFile: {
          title: '上传文件',
          description: '上传文件的大小限制在20MB以内',
          type: 'string',
          format: '',
          widget: 'uploadFile',
          icon: '',
        },
        radio: {
          title: '单项选择',
          type: 'string',
          format: '',
          widget: 'radio',
          icon: '',
        },
        checkbox: {
          title: '多项选择',
          type: 'string',
          format: '',
          widget: 'checkbox',
          icon: '',
        },
        // imageRadio: {
        //   title: '图片单选',
        //   icon: '',
        // },
        // imageCheckbox: {
        //   title: '图片多选',
        //   icon: '',
        // },
        time: {
          title: '时间',
          type: 'string',
          format: '',
          widget: 'time',
          icon: '',
        },
        date: {
          title: '日期',
          type: ['string', 'array'],
          format: 'date',
          widget: 'date', // 'range'
          icon: '',
          options: {
            range: true, // 日期范围
            format: 'YYYY/MM/DD',
          },
        },
        dateTime: {
          title: '日期&时间',
          type: 'string',
          format: 'date',
          widget: 'dateTime',
          icon: '',
        },
        switch: {
          title: '开关',
          type: 'boolean',
          format: '',
          widget: 'switch',
          icon: '',
        },
        select: {
          title: '下拉选择器',
          type: ['string', 'array'],
          format: '',
          widget: 'select',
          icon: '',
          options: {
            // 是否多选
            mode: 'tags',
            filterOption: true,
            showSearch: true,
            optionFilterProp: 'children',
          },
          items: [
            {
              label: '选项 1',
              value: 1,
            },
            {
              label: '选项 2',
              value: 2,
            },
          ],
        },
        cascader: {
          title: '级联选择器',
          type: '',
          format: '',
          widget: 'cascader',
          icon: '',
        },
        tree: {
          title: '树形选择器',
          type: '',
          format: '',
          widget: 'tree',
          icon: '',
        },
        color: {
          title: '颜色选择器',
          type: 'string',
          format: 'color',
          widget: 'color',
          icon: '',
          options: {
            disabled: false,
            size: undefined,
            showAlpha: false,
            colorFormat: 'hex',
            popperClass: '',
            predefine: '',
          },
        },
        richtext: {
          title: '富文本',
          type: '',
          format: '',
          widget: 'richtext',
          icon: '',
        },
        editor: {
          title: '编辑器',
          type: '',
          format: '',
          widget: 'editor',
          icon: '',
        },
        rate: {
          title: '评分',
          type: 'number',
          format: '',
          widget: 'rate',
          icon: '',
        },
        slider: {
          title: '滑块',
          type: 'number',
          format: 'slider',
          widget: 'slider',
          icon: '',
        },
        // get: {
        //   title: '地理位置',
        //   icon: '',
        // },
      },
    },
    contact: {
      title: '联系信息字段',
      type: 'object',
      properties: {
        username: {
          title: '姓名',
          type: 'string',
          format: '',
          widget: 'username',
          icon: '',
        },
        password: {
          title: '密码',
          type: 'string',
          widget: 'password',
          icon: '',
        },
        mobile: {
          title: '手机',
          type: 'string',
          format: '',
          widget: 'phone',
          icon: '',
        },
        email: {
          title: '邮箱',
          type: 'string',
          format: '',
          widget: 'email',
          icon: '',
        },
        phone: {
          title: '电话',
          type: 'string',
          format: '',
          widget: 'phone',
          icon: '',
        },
        address: {
          title: '地址',
          type: 'string',
          format: '',
          widget: 'address',
          icon: '',
        },
        link: {
          title: '网址',
          type: 'string',
          format: '',
          widget: 'link',
          icon: '',
        },
        desc: {
          title: '描述',
          type: 'string',
          format: '',
          widget: 'desc',
          icon: '',
        },
      },
    },
    layout: {
      title: '布局字段',
      type: 'object',
      properties: {
        layout: {
          title: '栅格布局',
          type: 'string',
          format: '',
          widget: 'layout',
          icon: '',
        },
        container: {
          title: '容器',
          type: 'string',
          format: '',
          widget: 'container',
          icon: '',
        },
        tabs: {
          title: 'Tabs 标签',
          type: 'string',
          format: '',
          widget: 'tabs',
          icon: '',
        },
        divider: {
          title: '分割线',
          type: 'string',
          format: '',
          widget: 'divider',
          icon: '',
        },
        pageBreak: {
          title: '分页',
          type: '',
          format: '',
          widget: 'pageBreak',
          icon: '',
        },
        // timeline: {
        //   title: '时间线',
        //   icon: '',
        // },
        // steps: {
        //   title: '步骤条',
        //   icon: '',
        // },
      },
    },
  },
}
