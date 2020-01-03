<template>
  <el-date-picker
    v-model="formData[vname]"
    v-bind="schema.options"
    type="datetime"
    class="d-date w-100"
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

<style scoped>
.d-date {
  width: 100%;
}
</style>
