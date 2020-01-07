
export function renderProps() {
  return {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  }
}
