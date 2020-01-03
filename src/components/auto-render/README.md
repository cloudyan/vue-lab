# AutoRender

## 用法

```jsx
// schema + materials --> parse --> Field + props
// 接收 数据配置和素材控制
// 输出 组件 和 props
<auto-render
  settings={
    vname,
    schema,
    formData,
  }
  materials={
    generated,
    customized,
    mappding,
  }
/>


<Field
  {...jsxProps(fieldProps)}
>
  <Widget
    {...jsxProps(schema)}
  ></Widget>
</Field>

```
