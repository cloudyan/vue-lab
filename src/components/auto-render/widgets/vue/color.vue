<template>
  <el-color-picker
    v-model="schema.default"
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
    formData: Object,
  },
}
</script>
