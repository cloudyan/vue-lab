# AutoRender

## 功能支持

- [x] 支持输入 json-schema(控制布局) 和 formData(控制数据) 自动渲染界面
- [x] 支持输出 schema 和 formData
- [x] 支持生成代码(其实是固定的)
- [ ] 支持约束验证(必填 格式校验等)
- [ ] 支持条件关联判断
- [ ] 支持结构嵌套

## 用法

```html
<template>
  <AutoRender
    :schema="schema.propsSchema"
    :formData="schema.formData"
  />
</template>
```
