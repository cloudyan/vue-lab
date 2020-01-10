
<script>

// 测试对象引用赋值 双向绑定副作用
// auto-render 嵌套传递 formData, 如果内部直接操作 formData, 就存在此问题
// 所以要拷贝值, 发生值变更, 通过触发 onChange 从外部更新最新的 schema 进去(单向数据流原则)
// 这里我们再了解下 element-ui 的 form 表单如何实现内外层的数据操作同步的 参见 ./jsx.vue
const formData = {
  name: 'boy',
}

setInterval(() => {
  console.log(JSON.stringify(formData))
}, 1000)

const Other = {
  data() {
    return {
      formData,
    }
  },
  render(h) {
    return <div>{formData.name}</div>
  },
}

const DInput = {
  props: {
    formData: Object,
  },
  render(h) {
    return (
      <el-input v-model={formData.name} />
    )
  },
}

export default {
  name: 'FormData',
  data() {
    return {
      formData,
    }
  },
  render(h) {
    return (
      <div>
        <DInput formData={formData} />
        <Other />
      </div>
    )
  },
}
</script>
