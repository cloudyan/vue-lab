import { widgets, mapping } from './widgets/vue'
import './style'

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
const RenderField = {
  name: 'RenderField',
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
          <RenderField schema={temp[key]} />
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

export default RenderField

// function asField({ Widget }) {
//   return {
//     functional: true,
//     render(c, ctx) {
//       const {
//         schema,
//       } = ctx.props

//       return (
//         <div class="field-item">
//           <div class="field-title">{schema.title}</div>
//           <div class="field-content">
//             <Widget
//               {...ctx.props}
//             />
//           </div>
//         </div>
//       )
//     },
//   }
// }

// // 输入 propsSchema formData
// // 输出 formData propsSchema code
// const AutoRender = {
//   name: 'AutoRender',
//   props: {
//     vname: String,
//     schema: {
//       type: Object,
//       required: true,
//     },
//     formData: Object,
//     widgets: Array,
//     mapping: Object,
//   },

//   render(h) {
//     const {
//       vname,
//       schema,
//       formData = {},
//       widgets,
//       mapping,
//     } = this

//     const generated = {}
//     const list = widgets
//     if (!this.originWidgets) {
//       this.originWidgets = list
//     }
//     Object.keys(list).forEach(key => {
//       const oWidget = this.originWidgets[key]
//       const nWidget = list[key]
//       let gField = this.generatedFields[key]
//       if (!gField || oWidget !== nWidget) {
//         if (oWidget !== nWidget) {
//           this.originWidgets[key] = nWidget
//         }
//         gField = asField({ Widget: nWidget })
//         this.generatedFields[key] = gField
//       }
//       generated[key] = gField
//     })
//     // const { Field, props } = parse(settings, materials)

//     return (
//       <RenderField
//         setting={{
//           vname,
//           schema,
//           formData,
//           column: 1,
//           displayType: 'row',
//         }}
//         materials={{
//           generated,
//           mapping,
//         }}
//         // onChange={}
//       />
//     )
//   },
// }
