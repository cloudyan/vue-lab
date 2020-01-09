<template>
  <el-input
    v-model="formData[vname]"
    v-bind="schema.options"
    @input="change"
  />
</template>

<script>
import { mixinCommon } from '../../common/utils'

export default {
  mixins: [
    mixinCommon,
  ],
  // props: {
  //   ...renderProps(),
  // },

  created() {
    // console.log('input', this)
  },

  // methods: {
  //   change(val) {
  //     this.$emit('change', this.vname, val)
  //   },
  // },
}

</script>
