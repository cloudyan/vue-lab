
export function schemaToList(schema, deep = 1) {
  const list = schema.properties
  return Object.keys(list).map(key => {
    const temp = list[key] || {}
    temp.typeKey = key
    if (deep > 1 && temp.properties) {
      temp.children = schemaToList(temp, deep-1)
    }
    return temp
  })
}

