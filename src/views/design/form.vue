<template>
  <el-container class="app-container">
    <el-header>
      <auto-render
        :schema="tabs.propsSchema"
        :formData="tabs.formData"
      />
    </el-header>
    <el-container>
      <el-aside class="" width="40%">
        <auto-render
          :schema="editor.propsSchema"
          :formData="editor.formData"
          @change="changeEditor"
          class="schema-editor"
        />
      </el-aside>
      <el-main class="form-preview">
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
        // TODO: 切换后跟踪丢了
        // TODO: 另 auto-render 内部修正的数据 被显透出来了 不好
        // this.schema = schemaObj[val]
        // this.$set(this.editor.formData, 'json', schemaObj[val])
        // 初始化赋值
        this.editor.formData.json = schemaObj[val]

        this.schema = schemaObj[val]
      },
      // immediate: true,
    },
  },
  created() {
    this.tabs.formData.schema = 'jsonConfig'
    this.schema = schemaObj['jsonConfig']

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
    changePreview(key, val, data) {
      console.log('preview changed', key, val)
      // this.editor.formData.json.formData = data
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

