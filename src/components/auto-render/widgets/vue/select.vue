<template>
  <el-select
    v-model="value"
    v-bind="schema.options"
    @change="change"
    class="d-select w-100"
  >
    <el-option
      v-for="item in items"
      :value="item.value"
      :label="item.label"
      :key="item.value"
    >
      {{ item.label }}
    </el-option>
  </el-select>
</template>

<script>
import { mixinCommon } from '../../common/utils'

export default {
  mixins: [
    mixinCommon,
  ],

  computed: {
    items() {
      const { schema } = this
      return (schema.enum || []).map((val, index) => {
        let item = schema.enumNames ? schema.enumNames[index] : val
        // const isHtml = typeof item === 'string' && item[0] === '<'
        // if (isHtml) {
        //   item = <span domPropsInnerHTML={ item } />
        // }
        return {
          label: item,
          value: val,
        }
      })
    },
  },

  methods: {
    // 如要覆写 mixin 内的 change, 需要调用 $emit('change')
    // change(val) {
    //   this.$emit('change', this.vname, val)
    // },
  },
}
</script>
