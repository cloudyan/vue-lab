<template>
  <el-input
    v-model="formData[vname]"
    v-bind="schema.options"
    @input="change"
  />
</template>

<script>
import { renderProps } from '../utils'

export default {
  props: {
    ...renderProps(),
  },

  methods: {
    change(val) {
      this.onChange(this.vname, val)
    },
  },
}

</script>
