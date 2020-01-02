<template>
  <el-select
    v-model="schema.value"
    :placeholder="options.placeholder"
    @change="handleChange"
    class="d-select"
  >
    <el-option
      v-for="(item, key) in schema.items"
      :key="key"
      :value="item"
      :label="options.showLabel ? item.label : item"
    />
  </el-select>
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

  methods: {
    handleChange() {},
  },
}
</script>
