export cloneDeep from 'lodash.clonedeep'

export function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch(err) {
    return data
  }
}

// 实现 props 自动分拆等同于模板之上的 v-bind 合并写法
export function jsxProps(schema = {}) {
  const temp = cloneDeep(schema)
  const { options = {} } = temp

  const rest = {}
  rest.attrs = filterProps(options, isRenderableAttr)
  rest.props = filterProps(options)
  rest.style = schema.style

  return rest
}

export function renderProps() {
  return {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    onChange: {
      type: Function,
      default: () => ({}),
    },
  }
}

// renderProps 改为 mixin
export const mixinCommon = {
  props: {
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
  },

  methods: {
    change(val) {
      this.$emit('change', this.vname, val)
    },
  },
}
