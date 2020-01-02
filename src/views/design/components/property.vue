<template>
  <el-container class="design-property">
    <auto-render :schema="schema" />
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import AutoRender from '../../auto-render'
import Convert from '@mind029/json2schema'

// 生成规则自定义
// 如 default 默认值
// readonly 只读
// placeholder 占位符
// disabled 禁用
// title 标题
const json2Schema = new Convert()
// 字段编辑
// 校验规则
// 排版
export default {
  components: {
    AutoRender,
  },
  props: {
    // schema: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      selectWidget: state => state.design.selectWidget,
    }),
    schema() {
      const { selectWidget = {} } = this
      const { options = {} } = selectWidget
      const schema = selectWidget.property || json2Schema.format({
        title: selectWidget.title,
        description: selectWidget.description,
        ...options,
      })
      console.log(schema)

      schema.properties = schema.properties || {}

      if (schema.properties) {
        schema.properties = {
          title: {
            title: '标题',
            type: 'string',
            widget: 'input',
            default: selectWidget.title,
            placeholder: '',
          },
          ...schema.properties,
        }
      }
      return schema
    },
  },

  methods: {
  },
}
</script>

<style lang="stylus" scoped>
.p-tabs {
  width: 100%;
}
</style>
