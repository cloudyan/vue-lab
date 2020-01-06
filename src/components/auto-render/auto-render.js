// import { widgets, mapping } from './widgets/vue'
import './style'

// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx
// https://www.npmjs.com/package/babel-plugin-jsx-v-model
// https://github.com/vuejs/jsx

const FieldLayout = {
  functional: true,
  name: 'FieldLayout',
  props: {
    schema: Object,
    column: {
      type: Number,
      default: 1,
    },
    displayType: {
      type: String,
      default: 'column', // row
    },
    showDescIcon: false,
    showValidate: true,
    width: String,
    validateText: String,
    // onChange: () => {},
    // onValidate: () => {},
  },

  render(h, ctx) {
    const {
      schema,
      column,
      displayType,
      showDescIcon,
      showValidate,
      validateText,
    } = ctx.props

    const { options = {}, style = {} } = schema
    const isComplex = ['object', 'array'].includes(schema.type)
    let columnStyle = {}

    if (!isComplex) {
      columnStyle = Object.assign({
        width: `calc(100% / ${column})`,
        paddingRight: '24px',
      }, schema.style)
    }

    const showLabel = schema.title || options.required ||
      (displayType !== 'row' && showValidate && validateText)

    return (
      <div
        class={`field-item w-100 field-flex-${displayType}`}
        style={columnStyle}
      >
        {showLabel &&(
          <label class="field-label">
            {options.required && (<span class="field-required">*</span>)}
            <span class={`fiele-title ${isComplex ? 'B' : ''}`}>{schema.title}</span>
            {showDescIcon && schema.description && (<span class="fiele-desc" title={schema.description}>Icon</span>)}
            {showValidate && (<span class="fiele-validate">{validateText}</span>)}
        </label>
        )}

        <div class="field-content">
          {ctx.children}
        </div>
      </div>
    )
  },
}

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

  render(h) {
    const {
      vname,
      schema,
      formData = {},
      mapping,
      widgets,
    } = this

    if (!schema.options) schema.options = {}

    const layout = {
      width: schema.width,
      column: schema.column,
      displayType: schema.displayType,
      showDescIcon: schema.showDescIcon,
      showValidate: schema.showValidate,
    }

    if (['object', 'array'].includes(schema.type) && schema.properties) {
      const { properties = {} } = schema
      const { required = [] } = schema
      const nodes = Object.keys(properties).map(key => {
        const subSchema = Object.assign(properties[key], layout)
        if (!subSchema.options) subSchema.options = {}
        if (!subSchema.options.required) {
          subSchema.options.required = required.includes(key)
        }

        const isSubForm = ['object', 'array'].includes(subSchema.type) && subSchema.properties
        const subFormData = isSubForm ? formData[key] : formData

        return (
          <RenderField
            vname={key}
            schema={subSchema}
            formData={subFormData}
            mapping={mapping}
            widgets={widgets}
          />
        )
      })

      const isRoot = vname === '$form'

      return (
        <div class={`field-map ${isRoot ? 'auto-render' : ''}`}>
          {nodes}
        </div>
      )
    }

    const mapWidgetName = mapping[schema.widget] || 'doing'
    const Widget = widgets[mapWidgetName] || widgets.doing

    // console.log(vname, formData)

    return (
      <FieldLayout
        schema={schema}
        {...{props: layout }}
      >
        <Widget
          vname={vname}
          schema={schema}
          formData={formData}
          mapping={mapping}
          widgets={widgets}
        />
      </FieldLayout>
    )
  },
}

export default RenderField
