import { jsxProps } from '../../utils'

export default {
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this.$props

    const props = jsxProps(schema)

    return (
      <el-input
        {...props}
        v-model={schema.default}
        class="d-input"
      />
    )
  },
}

