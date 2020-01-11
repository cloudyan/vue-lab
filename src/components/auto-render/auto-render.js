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
    // change(vname, val) {
    //   this.$emit('change', vname, val)
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

    if (!schema) return

    const change = (key, val) => {
      // console.log('inMap', 333)
      onChange(key, val)
    }

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
          propsOnChange={change}
        />
      )
    })

    const isRoot = vname === '$form'

    return (
      <div
        class={`field-map ${isRoot ? 'auto-render' : ''}`}
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
    onChange: Function,
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

    let change

    if (['object', 'array'].includes(schema.type) && schema.properties) {
      change = (key, val, objValue) => {
        // console.log('map', 222)
        let value = {
          ...formData,
          [key]: val,
        }
        if (objValue) {
          value = objValue
        }
        onChange(vname, value)
      }

      return (
        <RenderMap
          vname={vname}
          schema={schema}
          formData={formData}
          mapping={mapping}
          widgets={widgets}
          layout={layoutProps}
          propsOnChange={change}
        />
      )
    }

    change = (key, val) => {
      // console.log('renderField', vname, 222)
      onChange(key, val)
    }

    const mapWidgetName = mapping[schema.widget] || 'doing'
    const GenField = widgets[mapWidgetName] || widgets.doing
    const FieldItem = GenField({
      vname,
      schema,
      formData,
      value: formData[vname],
      rootValue: formData,
      layout: layoutProps,
      mapping,
      widgets,
      onChange: change,
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

    const change = (key, val) => {
      // console.log('auto-render', 333)
      onChange(val)
    }

    return (
      <RenderField
        vname={vname}
        schema={schema}
        formData={formData}
        widgets={generated}
        mapping={mapping}
        propsOnChange={change}
      />
    )
  },
}

export default AutoRender
