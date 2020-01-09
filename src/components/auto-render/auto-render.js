/*!
 * Created by cloudyan on 2020-01-02 10:00:05
 * Last Modified by cloudyan on 2020-01-09 11:56:05
 * 输入
 */

import './style'
import {
  mixinCommon,
} from './common/utils'
import { asField, DefaultFieldUI } from './common/asField'
import { getBasicProps } from './common/parser'
import { vueProps } from './common/props'

// https://cn.vuejs.org/v2/guide/render-function.html
// https://github.com/vuejs/babel-plugin-transform-vue-jsx
// https://www.npmjs.com/package/babel-plugin-jsx-v-model
// https://github.com/vuejs/jsx

const RenderMap = {
  name: 'RenderMap',
  mixins: [
    mixinCommon,
  ],

  props: {
    mapping: Object,
    widgets: Object,
    layout: Object,
    onChange: Function,
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
      onChange,
      layout,
    } = this


    const { properties = {}, required = [] } = schema
    const nodes = Object.keys(properties).map(key => {
      const subSchema = Object.assign({}, properties[key])
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
          rootValue={subFormData}
          layout={layout}
          mapping={mapping}
          widgets={widgets}
          propsOnChange={onChange}
        />
      )
    })

    const isRoot = vname === '$form'

    return (
      <div
        class={`field-map ${isRoot ? 'auto-render' : ''}`}
        propsOnChange={onChange}
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
    layout: Object,
  },

  methods: {
    // changeMap(val) {

    //   this.$emit('change', this.vname, val)
    // },
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
      mapping,
      widgets,
      onChange,
      layout,
    } = this

    const { layoutProps } = getBasicProps({
      vname,
      schema: { ...layout, ...schema },
      formData,
    })

    if (['object', 'array'].includes(schema.type) && schema.properties) {
      return (
        <RenderMap
          vname={vname}
          schema={schema}
          formData={formData}
          mapping={mapping}
          widgets={widgets}
          layout={layoutProps}
          propsOnChange={onChange}
        />
      )
    }

    const mapWidgetName = mapping[schema.widget] || 'doing'
    const GenField = widgets[mapWidgetName] || widgets.doing
    const FieldItem = GenField({
      vname,
      schema,
      formData,
      rootValue: formData,
      layout: layoutProps,
      mapping,
      widgets,
      onChange,
    })

    return <FieldItem />
  },
}

const AutoRender = {
  functional: true,
  name: 'AutoRender',
  mixins: [
    mixinCommon,
  ],
  props: {
    mapping: Object,
    widgets: Object,
  },
  render(h, ctx) {
    const {
      vname,
      schema,
      formData,
      mapping,
      widgets,
      onChange,
      FieldUI = DefaultFieldUI,
    } = ctx.props

    const generated = {}
    const list = widgets
    const originWidgets = list
    const generatedFields = {}
    Object.keys(list).forEach(key => {
      const oWidget = originWidgets[key]
      const nWidget = list[key]
      let gField = generatedFields[key]
      if (!gField || oWidget !== nWidget) {
        if (oWidget !== nWidget) {
          originWidgets[key] = nWidget
        }
        gField = asField({ FieldUI, Widget: nWidget })
        generatedFields[key] = gField
      }
      generated[key] = gField
    })

    return (
      <RenderField
        vname={vname}
        schema={schema}
        formData={formData}
        widgets={generated}
        mapping={mapping}
        propsOnChange={onChange}
      />
    )
  },
}

export default AutoRender
