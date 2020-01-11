<template>
  <el-container class="app-container" style="padding: 0;">
    <el-header class="schema-select flex-middle">
      <auto-render
        :schema="tabs.propsSchema"
        :formData="tabs.formData"
        @change="changeSchema"
      />
    </el-header>
    <el-container style="height: calc(100vh - 60px); padding: 0;">
      <el-aside class="h-100" width="40%">
        <pre class="schema-preview">{{ schemaStr }}</pre>
        <!-- <auto-render
          :schema="editor.propsSchema"
          :formData="editor.formData"
          @change="changeEditor"
          class="schema-editor"
        /> -->
      </el-aside>
      <el-main class="form-preview h-100" style="padding-bottom: 100px;">
        <auto-render
          :schema="schema.propsSchema"
          :formData="schema.formData"
          @change="changePreview"
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
// import objStringify from 'obj-stringify'
import { cloneDeep } from '@/utils'

// 配置数据 包含 schema 结构数据以及 data 配置数据
// { propsSchema: {}, formData: {}, }
export default {
  name: 'PageForm',
  components: {
    AutoRender,
  },
  data() {
    return {
      schemaName: 'func',
      // editor: schemaObj.editor,
      tabs: schemaObj.tabs,
      schema: {},
    }
  },

  computed: {
    schemaStr() {
      return JSON.stringify(this.schema, null, 2)
      // return objStringify(schemaObj[this.schemaName])
    },
    // editor: {
    //   get() {
    //     return {
    //       formData: {
    //         json: this.schemaStr,
    //       },
    //       propsSchema: schemaObj.editor.propsSchema,
    //     }
    //   },
    //   set() {

    //   },
    // },
  },
  watch: {
    'schemaName': {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.schema = cloneDeep(schemaObj[val])
        }
      },
      immediate: true,
    },
  },
  created() {
    this.schemaName = 'func'
    // 编辑器, 初始化 和编辑更新操作上要分离
    // 初始化 直接使用默认值覆盖赋值 编辑时监听 change 更新操作界面(但不用再更新编辑器数据了)

    // this.editor.formData.json = this.
  },
  methods: {
    handleSave() {
      // 有校验未通过时不能保存
      console.log('保存', this.schema.formData)
    },
    changeEditor(key, val, data) {
      console.log('editor changed')

      Object.assign(this.schema, val)
      // this.schema = val
    },
    changeSchema(formData) {
      this.schemaName = formData.schema

      // 这个还需要外部配, 感觉不好 另外可能渲染不够细(整体渲染)
      this.tabs.formData = formData
    },
    changePreview(formData) {
      console.log('preview changed', formData)
      this.schema.formData = formData
    },
  },
}
</script>

<style lang="stylus" scoped>
.schema-select {
  >>> .field-item {
    margin: 0;
  }
}

.schema-preview {
  word-break: break-all;
  white-space: pre;
  font-size: 14px;
  line-height: 1.5;
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

