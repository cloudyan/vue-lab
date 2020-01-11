export cloneDeep from 'lodash.clonedeep'

export function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch(err) {
    return data
  }
}

// 实现 props 自动分拆等同于模板之上的 v-bind 合并写法
export function jsxProps(schema = {}) {
  const temp = cloneDeep(schema)
  const { options = {} } = temp

  const rest = {}
  rest.attrs = filterProps(options, isRenderableAttr)
  rest.props = filterProps(options)
  rest.style = schema.style

  return rest
}

export function renderProps() {
  return {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    onChange: {
      type: Function,
      default: () => ({}),
    },
  }
}

// renderProps 改为 mixin
export const mixinCommon = {
  props: {
    vname: String,
    value: [String, Number, Object, Boolean, Array],
    schema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    change(val) {
      // console.log('change')
      // 使用 $emit, 则 jsx 用 onChange 传入
      this.value = val
      this.$emit('change', this.vname, val)
    },
  },
}

// 获得propsSchema的children
export function getChildren(schema) {
  const {
    // object
    properties,
    // array
    items,
    type,
  } = schema
  if (!properties && !items) {
    return []
  }
  let schemaSubs = {}
  if (type === 'object') {
    schemaSubs = properties
  }
  if (type === 'array') {
    schemaSubs = items
  }
  return Object.keys(schemaSubs).map(name => ({
    schema: schemaSubs[name],
    name,
  }))
}

// 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数
export function isExpression(func) {
  if (typeof func === 'function') return true
  if (
    typeof func === 'string' &&
    func.substring(0, 2) === '{{' &&
    func.substring(func.length - 2, func.length) === '}}'
  ) {
    return func.substring(2, func.length - 2)
  }
  return false
}

// 代替eval的函数
export function parseString(string) {
  return new Function('"use strict";return (' + string + ')')()
}

// 解析函数字符串值
export function evaluateString(string, formData, rootValue) {
  return new Function(`"use strict";
    const rootValue = ${JSON.stringify(rootValue)};
    const formData = ${JSON.stringify(formData)};
    return (${string})`)()
}

// data = {a: b: {c: 1}}  getExpressionValue(data, 'a.b.c')
export function getExpressionValue(objData, expression) {
  if (typeof expression !== 'string') return ''
  const keyList = expression.split('.') || []
  if (keyList.length === 0) return ''
  if (keyList.length === 1) {
    return objData[keyList[0]]
  }
  return keyList.reduce((x, y) => {
    if (x && typeof x === 'object') return x[y]
    return ''
  }, objData)
}

// 计算单个表达式的hidden值
const calcHidden = (hiddenString, rootValue, formData) => {
  if (!rootValue || typeof rootValue !== 'object') {
    return false
  }
  // 支持四种基本运算符
  const operators = ['==', '!=', '>', '<']
  try {
    const op = operators.find(sop => hiddenString.indexOf(sop) > -1)
    const [key, value] = hiddenString.split(op).map(item => item.trim())
    let left = rootValue[key]
    // feature: 允许从 formData 取值
    if (key.substring(0, 9) === 'formData.' && formData) {
      const subKey = key.substring(9)
      left = getExpressionValue(formData, subKey)
    }
    const right = parseString(value)
    return parseString(`"${String(left)}"${op}"${String(right)}"`)
  } catch (e) {
    console.error(e)
  }
  return false
}

export function isHidden({ hidden, rootValue, formData } = {}) {
  // hidden 为表达式：
  if (typeof hidden === 'string') {
    // 支持 && 和 ||
    const hasAnd = string => string.indexOf('&&') > -1
    const hasOr = string => string.indexOf('||') > -1
    let hiddenList = []
    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData)
      } else {
        hiddenList = hidden.split('&&').map(item => item.trim())
        return hiddenList.every(item => calcHidden(item, rootValue, formData))
      }
    } else {
      hiddenList = hidden.split('||').map(item => item.trim())
      if (!hasAnd(hidden)) {
        return hiddenList.some(item => calcHidden(item, rootValue, formData))
      } else {
        return hiddenList.some(item => {
          if (hasAnd(item)) {
            const list = item.split('&&').map(it => it.trim())
            return list.every(x => calcHidden(x, rootValue, formData))
          } else {
            return calcHidden(item, rootValue, formData)
          }
        })
      }
    }
  }
  return hidden
}
