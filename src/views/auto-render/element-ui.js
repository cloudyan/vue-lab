import { mapping, widgets } from './widgets/element-ui'
import { AutoRender } from './index'

export default {
  props: {
    vname: String,
    schema: Object,
    formData: Object,
    widgets: Array,
    mapping: Object,
  },

  render(h) {
    const {
      mapping: customizedMapping,
      widgets: customizedWidgets,
      ...rest
    } = this.$props

    return (
      <AutoRender
        {...rest}
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
