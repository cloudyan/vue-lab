<template>
  <el-date-picker
    v-model="value"
    v-bind="schema.options"
    @change="change"
    type="datetime"
    class="d-date w-100"
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

<style scoped>
.d-date {
  width: 100%;
}
</style>
