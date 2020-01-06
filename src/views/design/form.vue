<template>
  <el-container class="app-container">
    <el-header>
      <auto-render
        :schema="tabs.propsSchema"
        :formData="tabs.formData"
        @change="change"
      />
    </el-header>
    <el-container>
      <el-aside class="" width="40%">
        <auto-render
          :schema="editor.propsSchema"
          :formData="editor.formData"
          class="schema-editor"
        />
      </el-aside>
      <el-main class="form-preview">
        <auto-render
          :schema="schema.propsSchema"
          :formData="schema.formData"
        />
        <el-footer class="footer-fixed">
          <el-button @click="handleSave" type="primary">保存</el-button>
        </el-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AutoRender from '@/components/auto-render'
import * as schemaObj from './data/form'
// import { cloneDeep } from 'lodash'

// 配置数据 包含 schema 结构数据以及 data 配置数据
// { propsSchema: {}, formData: {}, }
export default {
  name: 'PageForm',
  components: {
    AutoRender,
  },
  data() {
    return {
      editor: schemaObj.editor,
      tabs: schemaObj.tabs,
      schema: schemaObj.tabbar,
    }
  },

  computed: {
    json() {
      return JSON.stringify(this.schema, null, 2)
    },
  },
  watch: {
    ['tabs.formData.schema']: {
      handler: function (val, oldVal) {
        this.schema = schemaObj[val]
        this.editor.formData.json = this.schema
      },
      immediate: true,
    },
    ['editor.formData.json']: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.schema = val
        }
      },
      immediate: true,
    },
  },
  created() {
    this.tabs.formData.schema = 'jsonConfig'
  },
  methods: {
    handleSave() {
      // 有校验未通过时不能保存
      console.log('保存', this.schema.formData)
    },
    change(val, oldVal) {
      console.log('change', val, oldVal)
    },
  },
}
</script>

<style lang="stylus" scoped>
.schema-editor {
  white-space: pre;
  word-break: break-all;
}

.form-preview {
  padding: 0;

  .auto-render {
    padding: 20px;
  }
}

.footer-fixed {
  position: fixed;
  z-index: 1;
  width: 60%;
  bottom: 0;
  background: #fff;
  box-shadow: 2px 0 2px 2px rgba(0, 0, 0, 0.05);
  padding: 10px 30px;
}
</style>

