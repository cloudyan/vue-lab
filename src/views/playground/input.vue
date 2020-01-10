<template>
  <el-input
    v-model="formData.name"
    @input="change"
  />
</template>

<script>
export default {
  props: {
    formData: Object,
  },

  methods: {
    change(val) {
      console.log('change', val)
    },
  },
}
</script>
