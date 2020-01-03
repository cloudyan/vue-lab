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
  render(h) {
    return (
      <div class="doing">🆘『{this.schema.title}』组件开发中...</div>
    )
  },
}

Object.assign(widgets, { doing })
Object.assign(mapping, { doing: 'doing' })

export default {
  functional: true,
  props: {
    vname: String,
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

    console.log(rest)

    return (
      <AutoRender
        {...{props: rest}}
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
