import { cloneDeep } from 'lodash'

import { isRenderableAttr } from 'vue/dist/vue.runtime'

// 处理 vue jsx 中 props 自动分割
function filterProps(obj, cb) {
  const newObj = {}
  for (let key in obj) {
    // 满足规则或不存在规则时
    if(!cb || cb(key)) {
      newObj[key] = obj[key]
      delete obj[key]
    }
  }
  return newObj
}

export function jsxProps(schema = {}) {
  const temp = cloneDeep(schema)
  const { options = {} } = temp

  const rest = {}
  rest.attrs = filterProps(options, isRenderableAttr)
  rest.props = filterProps(options)
  rest.style = schema.style

  return rest
}
