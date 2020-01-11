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
import { mixinCommon } from '../../common/utils'
import JsonEditor from '@/components/JsonEditor'
// import objStringify from 'obj-stringify'

export default {
  mixins: [
    mixinCommon,
  ],
  components: {
    JsonEditor,
  },

  data() {
    return {
      // jsonStr: '{}',
    }
  },

  computed: {
    jsonStr: {
      get: function () {
        // 无法转 function 等
        return JSON.stringify(this.value || {}, null, 2)
      },
      set: function (val) {
        try {
          const newJson = JSON.parse(val.trim())
          const oldJson = JSON.parse(this.jsonStr.trim())
          const temp1 = JSON.stringify(newJson)
          const temp2 = JSON.stringify(oldJson)
          if (temp1 !== temp2) {
            this.$emit('change', this.vname, newJson)
          }
        } catch(err) {
          console.log(err)
        }
      },
    },
  },

  // watch: {
  //   'jsonStr': function (val, oldVal) {
  //     if (val !== oldVal) {
  //       try {
  //         const json = JSON.parse(val)
  //         // 直接改 formData 属性, 这是又犯病了
  //         // this.$set(this.formData, this.vname, json)
  //         // console.log(JSON.stringify(this.formData))
  //       } catch(err) {
  //         console.log(err)
  //       }
  //     }
  //   },
  // },

  created() {
    this.jsonStr = JSON.stringify(this.value || {}, null, 2)
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
