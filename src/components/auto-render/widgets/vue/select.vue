<template>
  <el-select
    v-model="schema.default"
    v-bind="schema.options"
  >
    <ElOption
      v-for="item in items"
      :value="item.value"
      :key="item.value"
    >
      {{ item.label }}
    </ElOption>
  </el-select>
</template>

<script>
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
