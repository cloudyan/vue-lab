# AutoRender

输入 json-schema 自动渲染布局

## 功能支持

- [x] 支持输入 json-schema(控制布局) 和 formData(控制数据) 自动渲染界面
  - [ ] 如果不选 widget 只是使用默认原生 html 标签渲染
- [x] 支持输出 schema 和 formData
- [x] 支持生成代码(其实是固定的)
- [x] 支持横向/纵向排列 多列排版
- [x] 支持简单嵌套
- [ ] 支持条件关联判断, 使用表达式
  - [x] auto-render 子组件 Widget 的 change 修改, 返回修改后的 formData
  - [x] 函数或表达式支持 接收两个参数 (formData, rootValue)
- [ ] 支持约束验证(必填 格式校验等)
- [ ] 支持填充默认数据格式, (保持数据类型不变, 无数据时 formData 内显示空值而不是 不存在 当前 key)
- [ ] 丰富组件数
- [ ] 复杂嵌套结构
- [ ] 级联控制, 如省市联动 或依赖显示
- [ ] 支持关联远程数据
- [ ] 性能优化

## 用法

```jsx
import AutoRender from '@tobeai/auto-render'

<template>
  <AutoRender
    :schema="schema.propsSchema"
    :formData="schema.formData"
    @change="change"
  />
</template>
```
