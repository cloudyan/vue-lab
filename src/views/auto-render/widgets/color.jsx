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
      schema: { options },
      formData = {},
    } = this.$props

    return (
      <el-color-picker
        v-model={this.schema.default}
        v-bind={options}
        class='d-color'
      />
    )
  },
}
