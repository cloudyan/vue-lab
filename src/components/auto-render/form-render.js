import parse from './base/parser'
import RenderField from './base/render-field'

const noop = () => {}

export default {
  name: 'form-render',
  functional: true,
  props: {
    vname: {
      type: String,
      default: '$form',
    },
    column: {
      type: Number,
      default: 1,
    },
    schema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: {},
    },
    mapping: {
      type: Object,
      default: {},
    },
    widgets: {
      type: Object,
      default: {},
    },
    // piping: {
    //   type: Object,
    //   default: {},
    // },
    fields: {
      type: Object,
      default: {},
    },
    showDescIcon: Boolean,
    showValidate: {
      type: Boolean,
      default: true,
    },
    displayType: {
      type: String,
      default: 'column',
    },
    onChange: {
      type: Function,
      default: noop,
    },
  },
  render(h, ctx) {
    const {
      vname,
      schema,
      formData,
      fields: customized,
      mapping,
      widgets,
    } = ctx.props
    // 处理组件
    const generated = widgets

    return (
      <div class="auto-render">
        <RenderField
          settings={{
            vname,
            data: schema,
            schema,
            formData,
          }}
          materials={{
            // 根据 Widget 生成的 Field
            generated,
            // 自定义的 Field
            customized,
            // 字段 type 与 widgetName 的映射关系
            mapping,
          }}
          // on={ctx.listeners}
        />
      </div>
    )
  },
}
