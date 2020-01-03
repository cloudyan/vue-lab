<template>
  <el-color-picker
    v-model="formData[vname]"
    v-bind="schema.options"
    class="d-color"
  />
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
}
</script>
