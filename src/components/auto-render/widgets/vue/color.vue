<template>
  <el-color-picker
    v-model="formData[vname]"
    v-bind="schema.options"
    class="d-color"
  />
</template>

<script>
import { renderProps } from '../utils'

export default {
  props: {
    ...renderProps(),
  },
}
</script>
