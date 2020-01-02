<template>
  <div class="app-container">
    <h2>表单</h2>
    <el-container>
      <el-aside class="schema-editor" width="50%">schema editor</el-aside>
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
import AutoRender from '../auto-render'
import { tabbar } from './data/form'
import { deepClone } from '@/utils'

export default {
  name: 'PageForm',
  components: {
    AutoRender,
  },
  data() {
    return {
      schema: tabbar,
      formData: deepClone(tabbar.options),
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>

