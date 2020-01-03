// import { widgets, mapping } from './widgets/vue'
import './style'

// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx
// https://www.npmjs.com/package/babel-plugin-jsx-v-model
// https://github.com/vuejs/jsx

// 如果是容器, 则遍历属性
const RenderField = {
  name: 'RenderField',
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
    mapping: Object,
    widgets: Object,
  },

  methods: {
    getWidget() {
      const { widget } = this.schema
      const mapWidgetName = this.mapping[widget] || 'doing'
      return this.widgets[mapWidgetName] || this.widgets.doing
    },
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this

    console.log(formData)

    if (['object', 'array'].includes(schema.type)) {
      const { properties = {} } = schema
      const nodes = Object.keys(properties).map(key => {
        const subSchema = properties[key]
        const subFormData = ['object', 'array'].includes(subSchema.type) ? formData[key] : formData

        return (
          <RenderField
            vname={key}
            schema={subSchema}
            formData={subFormData}
            mapping={this.mapping}
            widgets={this.widgets}
          />
        )
      })

      return (
        <div class="field-map">
          {nodes}
        </div>
      )
    }

    const Widget = this.getWidget(schema)

    return (
      <div class="field-item">
        <div class="field-title">{schema.title}</div>
        <div class="field-content">
          <Widget
            vname={vname}
            schema={schema}
            formData={formData}
            mapping={this.mapping}
            widgets={this.widgets}
          />
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
