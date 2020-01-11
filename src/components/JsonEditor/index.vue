<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'JsonEditor',
  data() {
    return {
      jsonEditor: false,
    }
  },
  props: {
    value: {
      type: String,
      default: '{}',
    },
  },
  watch: {
    value(value) {
      const editor_value = this.jsonEditor.getValue()
      if (value !== editor_value) {
        this.jsonEditor.setValue(value)
      }
    },
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true,
    })

    this.jsonEditor.setValue(this.value)
    this.jsonEditor.on('change', cm => {
      const jsonStr2 = cm.getValue()
      this.$emit('changed', jsonStr2)
      this.$emit('input', jsonStr2)
    })

    // console.log('jsonEditor', this.jsonEditor)

    // this.jsonEditor.on('lint', cm => {
    //   console.log(111)
    // })
  },
  methods: {
    getValue() {
      const jsonStr = this.jsonEditor.getValue()
      return jsonStr
    },
  },
}
</script>

<style>
.json-editor,
.CodeMirror {
  height: 100%;
}

.json-editor .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
