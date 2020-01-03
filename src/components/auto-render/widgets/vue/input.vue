<template>
  <el-input v-model="formData[vname]" v-bind="schema.options" />
</template>

<script>
import { renderProps } from '../utils'

export default {
  props: {
    ...renderProps(),
  },
}

</script>
