
export default {
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
  },


  computed: {
    options() {
      return this.schema.options || {}
    },
  },

  render(h) {
    const {
      vname,
      schema: { options },
      formData = {},
    } = this.$props

    return (
      <el-input
        v-model={this.schema.default}
        v-bind={options}
        class="d-input"
      />
    )
  },
}

