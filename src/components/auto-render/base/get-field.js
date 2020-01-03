function getWidgetName(schema, map) {
  const { type, format, enum: enums, readonly } = schema
  const list = []
  if (readonly) {
    list.push(`${type}?readonly`)
    list.push('*?readonly')
  }
  if (enums) {
    list.push(`${type}?enum`)
    // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select
    list.push('*?enum')
  }
  if (format) {
    list.push(`${type}:${format}`)
  }
  list.push(type) // 放在最后兜底，其他都不match时使用type默认的组件
  let found = ''
  list.some(item => {
    found = map[item]
    return !!found
  })
  return found
}

export default function getField(
  schema = {},
  { generated, mapping }
) {

  const { widget } = schema
  let Field
  if (widget) {
    Field = typeof widget === 'string' ? generated[widget] : widget
  }
  return {
    Field: Field || null,
  }
}
