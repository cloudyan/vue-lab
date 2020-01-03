import getField from './get-field'

// 对于数组或对象类型，获取其子集schema
export function getSubSchemas(schema = {}) {
  const {
    // object subset
    properties,
    // array subset
    items,
    column,
    // as subset's parent
    ...$parent
  } = schema
  const { type } = $parent
  // no subset
  if (!properties && !items) {
    return []
  }
  let children = {}
  if (type === 'object') {
    children = properties
  }
  if (type === 'array') {
    children = [].concat(items)
  }
  return Object.keys(children).map(vname => ({
    schema: children[vname],
    vname,
    column,
    // parent propsSchema
    $parent,
  }))
}

function getBasicProps(settings, materials) {
  const {
    schema,
    vname = '',
    $parent = {},
    column,
    displayType,
    showDescIcon,
    showValidate,
    formData,
  } = settings
  // 目前做了处理的`uiSchema`参数
  const {
    'ui:className': className,
    'ui:options': options = {},
    'ui:hidden': hidden,
    'ui:disabled': disabled,
    'ui:width': width,
    'ui:readonly': readonly,
    'ui:extraButtons': extraButtons = [],
    'ui:dependShow': dependShow,
    'ui:action': action,
  } = schema
  const { required = [] } = $parent
  const { generated: widgets, customized: fields } = materials
  // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  let basicProps = {
    vname,
    schema,
    column,
    displayType,
    showDescIcon,
    showValidate,
    options, // 所有特定组件规则，addable等规则TODO
    hidden,
    required: required.indexOf(vname) !== -1,
    disabled: disabled,
    readonly: readonly,
    width,
    widgets,
    fields,
    formData,
  }
  // 假如有表达式来决定显示的场景，才传入dependShow,formData
  // if (dependShow) {
  //   basicProps = { ...basicProps, dependShow }
  // }
  // if (className) {
  //   basicProps = { ...basicProps, className }
  // }
  // if (action) {
  //   basicProps = { ...basicProps, action }
  // }
  // 子集的属性
  const subItems = {}
  const subSchemas = getSubSchemas(schema)

  subSchemas.forEach(subSchema => {
    const { vname: _vname, schema: _schema = {} } = subSchema
    subItems[_vname] = {
      field: getField(_schema, materials),
      props: getBasicProps(
        {
          ...subSchema,
          column,
          showDescIcon,
          displayType,
          formData,
        },
        materials
      ),
    }
  })
  if (['array', 'object'].indexOf(schema.type) >= 0) {
    // 传入name和Field（如果重定义Field的话）及其配置信息（如onChange等）
    // basicProps.getSubField = o => {
    //   // getSchemaData(schema)
    //   const { field, props, column: c } = subItems[o.name] || subItems[0] || {}
    //   return subFieldGenerator({
    //     ...field,
    //     column: c,
    //     props: {
    //       ...props,
    //       name: o.name,
    //       rootValue: o.rootValue,
    //     },
    //   })(o)
    // }
    if (schema.type === 'array' && schema.items) {
      // 将数组uiSchema配置里面的抽离出来使用
      basicProps.extraButtons = extraButtons
      // 数组新增的默认值
      if (subSchemas && subSchemas[0]) {
        basicProps.newItem = resolve(subSchemas[0].schema)
      }
    }
  }
  return basicProps
}

/**
 *  schema + materials --> parse --> Field + props
 *  schema {
 *    propsSchema,
 *    uiSchema,
 *    data,
 *    name,
 *  }
 *  materials {
 *    // 根据 Widget 生成的 Field
 *    generated,
 *    // 自定义的 Field
 *    customized,
 *    // 字段 type 与 widgetName 的映射关系
 *    mapping,
 *  }
 */
export const parse = (settings = {}, materials) => {
  const { schema = {} } = settings
  return {
    Field: getField(schema, materials).Field,
    props: getBasicProps(settings, materials),
  }
}
