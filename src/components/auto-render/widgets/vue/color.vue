<template>
  <el-color-picker
    v-model="value"
    v-bind="schema.options"
    class="d-color"
  />
</template>

<script>
import { mixinCommon } from '../../common/utils'

export default {
  mixins: [
    mixinCommon,
  ],
}
</script>
