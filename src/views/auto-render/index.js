import { widgets, mapping } from './widgets/element-ui'


// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx
// https://www.npmjs.com/package/babel-plugin-jsx-v-model
// https://github.com/vuejs/jsx
const Doing = {
  props: {
    schema: {
      type: Object,
    },
  },
  render(h) {
    return (
      <div class="doing">🆘『{this.schema.title}』组件开发中...</div>
    )
  },
}

// 如果是容器, 则遍历属性
const RenderItem = {
  components: {
    ...widgets,
    Doing,
  },
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
  },

  methods: {
    getWidget(schema) {
      const { widget } = schema
      if (mapping[widget]) {
        return `d-${widget}`
      } else {
        return 'doing'
      }
    },
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this.$props

    let node = null

    if (['object', 'array'].includes(schema.type)) {
      const temp = schema.properties
      const nodes = Object.keys(temp).map(key => {
        return (
          <RenderItem schema={temp[key]} />
        )
      })

      return (
        <div class="field-map">
          {nodes}
        </div>
      )
    } else {
      // node = <RenderItem></RenderItem>
      node = h(this.getWidget(schema), {
        props: { schema },
      })
    }

    return (
      <div class="field-item">
        <div class="field-title">{schema.title}</div>
        <div class="field-content">
          { node }
        </div>
      </div>
    )
  },
}

export default RenderItem

// 输入 propsSchema formData
// 输出 formData propsSchema code
// export default {
//   name: 'AutoRender',
//   props: {
//     vname: String,
//     schema: Object,
//     formData: Object,
//     widgets: Array,
//     mapping: Object,
//   },

//   render(h) {
//     const {
//       vname,
//       schema,
//       formData = {},
//     } = this.$props

//     // const { Field, props } = parse(settings, materials)

//     return (
//       <div class="field-item">
//         <div class="field-title">{schema.schema.title}</div>
//         <div class="field-content">
//           <Field
//             vname={props.vname}
//             schema={props.schema}
//             formData={props.formData}
//           />
//         </div>
//       </div>
//     )
//   },
// }
