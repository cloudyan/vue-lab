import { mapping, widgets } from './widgets/vue'
// import AutoRender from './form-render'
import AutoRender from './auto-render'

const doing = {
  name: 'Doing',
  functional: true,
  props: {
    schema: {
      type: Object,
    },
  },
  render(h, ctx) {
    const { schema } = ctx.props
    return (
      <div class="doing">🆘『{schema.widget}』组件开发中...</div>
    )
  },
}

Object.assign(widgets, { doing })
Object.assign(mapping, { doing: 'doing' })

export default {
  functional: true,
  props: {
    vname: {
      type: String,
      default: '$form',
    },
    schema: Object,
    formData: Object,
    widgets: Array,
    mapping: Object,
  },

  render(h, ctx) {
    const {
      mapping: customizedMapping,
      widgets: customizedWidgets,
      ...rest
    } = ctx.props

    Object.assign(rest, {
      mapping: {
        ...mapping,
        ...customizedMapping,
      },
      widgets: {
        ...widgets,
        ...customizedWidgets,
      },
    })

    // console.log(rest)
    // function onChange(schema, formData, propsSchema) {
    //   listeners.change && listeners.change(schema, formData, propsSchema)
    // }

    // Object.assign(rest, listeners.change)

    return (
      <AutoRender
        {...{props: rest}}
        propsOnChange={ctx.listeners.change}
        // mapping={{
        //   ...mapping,
        //   ...customizedMapping,
        // }}
        // widgets={{
        //   ...widgets,
        //   ...customizedWidgets,
        // }}
      />
    )
  },
}
