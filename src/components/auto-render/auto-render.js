

// import { widgets, mapping } from './widgets/vue'
import './style'
import {
  mixinCommon,
} from './common/utils'

// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx
// https://www.npmjs.com/package/babel-plugin-jsx-v-model
// https://github.com/vuejs/jsx

// 传入数据先做格式处理
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
    onChange: {
      type: Function,
      default: () => {},
    },
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

const RenderMap = {
  name: 'RenderMap',
  mixins: [
    mixinCommon,
  ],

  props: {
    mapping: Object,
    widgets: Object,
    layout: Object,
  },

  methods: {
    change(vname, val) {
      this.$emit('change', vname, val)
    },
  },

  render(h) {
    const {
      vname,
      schema,
      formData,
      mapping,
      widgets,
      layout,
    } = this

    const { properties = {}, required = [] } = schema
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
          propsOnChange={this.onChange}
        />
      )
    })

    const isRoot = vname === '$form'

    return (
      <div
        class={`field-map ${isRoot ? 'auto-render' : ''}`}
        propsOnChange={this.onChange}
      >
        {nodes}
      </div>
    )
  },
}

// 如果是容器, 则遍历属性
const RenderField = {
  name: 'RenderField',
  mixins: [
    mixinCommon,
  ],

  props: {
    mapping: Object,
    widgets: Object,
  },

  methods: {
    // changeMap(val) {

    //   this.$emit('change', this.vname, val)
    // },
  },

  render(h) {
    let {
      vname,
      schema,
      formData = {},
      rootValue = {},
      mapping,
      widgets,
    } = this

    const layout = {
      width: schema.width,
      column: schema.column,
      displayType: schema.displayType,
      showDescIcon: schema.showDescIcon,
      showValidate: schema.showValidate,
    }

    if (['object', 'array'].includes(schema.type) && schema.properties) {
      return (
        <RenderMap
          vname={vname}
          schema={schema}
          formData={formData}
          mapping={mapping}
          widgets={widgets}
          layout={layout}
          propsOnChange={this.onChange}
        />
      )
    }

    const mapWidgetName = mapping[schema.widget] || 'doing'
    const Widget = widgets[mapWidgetName] || widgets.doing

    // console.log(vname, formData)
    // if (schema.widget === 'jsonEditor') debugger

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
          propsOnChange={this.onChange}
        />
      </FieldLayout>
    )
  },
}

export default RenderField
