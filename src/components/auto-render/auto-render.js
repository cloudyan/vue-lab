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

    const { options = {} } = schema

    let columnStyle = {}
    if (column > 1) {
      columnStyle = {
        width: `calc(100% / ${column})`,
        paddingRight: '24px',
      }
    }

    const isComplex = ['object', 'array'].includes(schema.type)

    const showLabel = schema.title || options.required ||
      (displayType !== 'row' && showValidate && validateText)

    return (
      <div class={`field-item field-flex-${displayType}`} style={columnStyle}>
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

    const layout = {
      column: schema.column,
      displayType: schema.displayType,
      showDescIcon: schema.showDescIcon,
      showValidate: schema.showValidate,
    }

    if (['object', 'array'].includes(schema.type)) {
      const { properties = {} } = schema
      const nodes = Object.keys(properties).map(key => {
        const subSchema = Object.assign(properties[key], layout)
        const subFormData = ['object', 'array'].includes(subSchema.type) ? formData[key] : formData

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

      return (
        <div class="field-map">
          {nodes}
        </div>
      )
    }

    const mapWidgetName = mapping[schema.widget] || 'doing'
    const Widget = widgets[mapWidgetName] || widgets.doing

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
