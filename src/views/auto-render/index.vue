<script>

import { widgets, mapping } from './widgets'

const Doing = {
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

// 如果是容器, 则变量属性
export default {
  name: 'AutoRender',
  components: {
    Doing,
    ...widgets,
  },
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
  },

  computed: {

  },

  methods: {
    getWidget(schema) {
      const { widget } = schema
      if (mapping[widget]) {
        return `d-${widget}`
      } else {
        return 'doing'
      }
      // const widget = widgets[type]
      // if (widget && ['input', 'select'].includes(type)) {
      //   return widget
      // } else {
      //   return widgets['input']
      // }
    },
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this.$props

    let node = null

    console.log('auto-render', schema)

    if (['object', 'array'].includes(schema.type)) {
      const temp = schema.properties
      const nodes = Object.keys(temp).map(key => {
        return (
          <auto-render schema={temp[key]} />
        )
      })

      return (
        <div class="container field-map">
          {nodes}
        </div>
      )
    } else {
      node = h(this.getWidget(schema), { props: { schema } })
    }

    return (
      <div class="field-item">
        <div class="field-title">{schema.title}</div>
        <div class="field-content">{node}</div>
      </div>
    )
  },
}
</script>

<style lang="stylus" scoped>
.field-item {
  margin-bottom: 20px;
  line-height: 1.5;
}

.field-title {
  margin: 0 0 8px;
}

.doing {
  color: gray;
}
</style>
