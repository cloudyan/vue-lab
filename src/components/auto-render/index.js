import { mapping, widgets } from './widgets/vue'
// import AutoRender from './form-render'
import AutoRender from './auto-render'

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

    return (
      <AutoRender
        {...{props: rest}}
        mapping={{
          ...mapping,
          ...customizedMapping,
        }}
        widgets={{
          ...widgets,
          ...customizedWidgets,
        }}
      />
    )
  },
}
