<template>
  <el-input
    v-model="value"
    v-bind="schema.options"
    @input="change"
  />
</template>

<script>
import { mixinCommon } from '../../common/utils'

export default {
  mixins: [
    mixinCommon,
  ],
  // props: {
  //   ...renderProps(),
  // },

  created() {
    // console.log('input', this)
  },

  methods: {
    // 值变更, 触发 AutoRender的 onChange, 然后设置 schema 更新, 单向流动
    // vue 是双向数据绑定?
    change(val) {
      console.log('onChange 111')
      this.$emit('change', this.vname, val)
      // this.onChange(this.vname, val)
    },
  },
}

</script>
