<template>
  <el-input v-model="schema.default" :placeholder="options.placeholder" class="d-input" />
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

  // render(h) {
  //   const {
  //     schema,
  //   } = this.$props

  //   const { options = {} } = schema

  //   return (
  //     <div class="fr-field">
  //       <el-input v-model={schema.value} placeholder={options.placeholder} class="d-input" />
  //     </div>
  //   )
  // },
}

</script>
