/*!
 * Created by cloudyan on 2020-01-09 19:27:24
 * Last Modified by cloudyan on 2020-01-09 19:27:24
 * 解析 props
 */

export const getBasicProps = settings => {
  const {
    vname,
    schema,
    formData,
    $parent = {},
    readOnly,
  } = settings

  // 将 hidden width displayType className dependShow required 等是布局元素, 提高一级
  // 因为 width hidden 是控制整个 FieldItem, 而不仅是内部的 Field
  // minLength maxLength 是 json schema 语法就在options同级的
  const {
    options = {},

    column,
    displayType,
    width,
    labelWidth, // support auto
    showDescIcon,
    showValidate,

    className,
    hidden,
    dependShow,
    action,
    maxLength,
    minLength,
  } = schema

  const {
    disabled,
    readonly,
  } = options

  if (options.minLength) options.minLength = minLength
  if (options.maxLength) options.maxLength = maxLength

  // const { required = [] } = $parent;

  // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  let layoutProps = {
    // vname,
    // schema,
    // formData,

    hidden,
    column,
    displayType,
    width,
    labelWidth,
    showDescIcon,
    showValidate,
    // required: required.indexOf(name) !== -1,
  }

  const optionsProps = {
    ...options,
    disabled: disabled,
    readonly: readOnly || readonly,
  }

  // 假如有表达式来决定显示的场景，才传入dependShow, formData
  if (dependShow) {
    layoutProps = { ...layoutProps, dependShow }
  }
  if (className) {
    layoutProps = { ...layoutProps, className }
  }
  if (action) {
    layoutProps = { ...layoutProps, action }
  }

  return {
    layoutProps,
    optionsProps,
  }
}
