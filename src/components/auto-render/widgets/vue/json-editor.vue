<template>
  <div class="d-editor">
    <div class="header-container">
      <el-button @click="handleJsToJson" type="primary">格式化 JSON</el-button>
    </div>
    <div class="editor-container">
      <json-editor
        ref="jsonEditor"
        v-model="json"
        v-bind="schema.options"
      />
    </div>
  </div>
</template>

<script>
import { renderProps } from '../utils'
import JsonEditor from '@/components/JsonEditor'

export default {
  components: {
    JsonEditor,
  },
  props: {
    ...renderProps(),
  },

  computed: {
    json: {
      get: function () {
        return this.formData[this.vname] || {}
      },
      set: function (newVal) {
        console.log('newVal', newVal)
        this.$set(this.formData, this.vname, newVal)
        console.log(this.formData)
      },
    },
  },

  created() {
    console.log(this)
  },

  methods: {
    handleJsToJson() {
      const that = this
      try {
        const tempFn = new Function('return ' + that.json)
        that.json = JSON.parse(JSON.stringify(tempFn()))
        console.log(that.json)
        that.$message('格式化成功')
        return that.json
      } catch(err) {
        console.error(err)
        this.$message.error(err.message)
      }
    },
  },
}
</script>

<style scoped>
.header-container {
  margin-bottom: 20px;
}

.editor-container {
  position: relative;
  z-index: 0;
  min-height: 100px;
  height: 500px;
}
</style>
