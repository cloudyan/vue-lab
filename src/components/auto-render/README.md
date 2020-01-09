# AutoRender

## 功能支持

- [x] 支持输入 json-schema(控制布局) 和 formData(控制数据) 自动渲染界面
  - [ ] 如果不选 widget 只是使用默认原生 html 标签渲染
- [x] 支持输出 schema 和 formData
- [x] 支持生成代码(其实是固定的)
- [x] 支持横向/纵向排列 多列排版
- [x] 支持结构嵌套
- [ ] 支持条件关联判断, 使用表达式
  - [x] auto-render 组件监听任意 Widget 组件的 change 修改, 返回参数 (vname, value)
  - [ ] 支持传入函数或表达式 接收两个参数 (formData, rootValue)
  - [ ] 如何支持实现级联控制 比如 选xx省, 则市选项变为对应省下的所有市
- [ ] 支持约束验证(必填 格式校验等)
- [ ] 支持选择是否填充默认数据格式, (是否保持数据类型不变, 无数据时 formData 内显示空值而不是 不存在 当前 key)

## 用法

```html
<template>
  <AutoRender
    :schema="schema.propsSchema"
    :formData="schema.formData"
    @change="change"
  />
</template>
```
