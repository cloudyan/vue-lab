<template>
  <div class="app-container">
    <h2>tabbar 配置</h2>
    <el-container>
      <el-aside class="" width="50%">
        <div class="schema-editor">{{ json }}</div>
      </el-aside>
      <el-main class="form-preview">
        <auto-render
          :schema="schema"
          :formData="formData"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AutoRender from '@/components/auto-render'
import { tabbar } from './data/form'
import { deepClone } from '@/utils'

// 配置数据 包含 schema 结构数据以及 data 配置数据
// { propsSchema: {}, formData: {}, }
export default {
  name: 'PageForm',
  components: {
    AutoRender,
  },
  computed: {
    json() {
      return JSON.stringify(this.schema, null, 2)
    },
  },
  data() {
    return {
      schema: tabbar.propsSchema,
      formData: tabbar.formData,
    }
  },
}
</script>

<style lang="stylus" scoped>
.schema-editor {
  white-space: pre;
  word-break: break-all;
}
</style>

