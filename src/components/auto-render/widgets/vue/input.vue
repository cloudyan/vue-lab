<template>
  <el-input v-model="formData[vname]" v-bind="schema.options" />
</template>

<script>
export default {
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
  },

  // render(h) {
  //   const {
  //     vname,
  //     schema,
  //     formData = {},
  //   } = this.$props

  //   const props = jsxProps(schema)

  //   return (
  //     <el-input
  //       {...props}
  //       v-model={schema.default}
  //       class="d-input"
  //     />
  //   )
  // },
}

</script>
