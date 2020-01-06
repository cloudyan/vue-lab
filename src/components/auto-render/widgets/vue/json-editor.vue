<template>
  <div class="d-editor">
    <div class="header-container">
      <el-button @click="handleJsToJson" type="primary">格式化 JSON</el-button>
    </div>
    <div class="editor-container">
      <json-editor
        ref="jsonEditor"
        v-model="jsonStr"
        v-bind="schema.options"
      />
    </div>
  </div>
</template>

<script>
// jsonEditor 编辑器交互跟踪数据, 使用 string 还是 object
import { renderProps } from '../utils'
import JsonEditor from '@/components/JsonEditor'

export default {
  components: {
    JsonEditor,
  },
  props: {
    ...renderProps(),
  },

  data() {
    return {
      jsonStr: '',
    }
  },

  watch: {
    'jsonStr': function (val, oldVal) {
      try {
        const json = JSON.parse(val)
        // 直接改 formData 属性, 这是不对的 应使用 onChange
        this.$set(this.formData, this.vname, json)
        // console.log(JSON.stringify(this.formData))
      } catch(err) {
        console.log(err)
      }
    },
  },

  created() {
    this.jsonStr = JSON.stringify(this.formData[this.vname] || {}, null, 2)
    // console.log('created', JSON.stringify(this.formData))
  },

  methods: {
    handleJsToJson() {
      try {
        const tempFn = new Function('return ' + this.jsonStr)
        const json = tempFn()
        const jsonStr = JSON.stringify(json, null, 2)
        this.$refs.jsonEditor.jsonEditor.setValue(jsonStr)
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
