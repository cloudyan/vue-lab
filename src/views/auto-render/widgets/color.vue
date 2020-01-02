<template>
  <el-color-picker v-model="schema.default" class="d-color" />
</template>

<script>
export default {
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },

  computed: {
    options() {
      return this.schema.options || {}
    },
  },
}

</script>
