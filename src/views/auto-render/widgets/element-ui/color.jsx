import { jsxProps } from '../../utils'

export default {
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
  },

  computed: {},

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this.$props

    const props = jsxProps(schema)

    return (
      <el-color-picker
        {...props}
        v-model={schema.default}
        class='d-color'
      />
    )
  },
}
