<template>
  <el-select
    v-model="formData[vname]"
    v-bind="schema.options"
    class="d-select w-100"
  >
    <ElOption
      v-for="item in items"
      :value="item.value"
      :label="item.label"
      :key="item.value"
    >
      {{ item.label }}
    </ElOption>
  </el-select>
</template>

<script>
import { renderProps } from '../utils'

export default {
  props: {
    ...renderProps(),
  },

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
}
</script>
