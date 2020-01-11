import {
  evaluateString,
  isLooselyNumber,
  isExpression,
} from './utils'
import { vueProps } from './props'

export const asField = ({ FieldUI, Widget }) => {
  return ({
    vname,
    value,
    schema,
    formData,
    mapping,
    widgets,
    onChange,
    layout = {},
    ...rest
  }) => {
    return {
      functional: true,
      render(h) {

        let { options = {} } = schema
        let { rootValue = {} } = rest
        let { readonly, disabled } = options
        let {
          hidden,
          className,
          column,
          displayType,
          width,
          labelWidth,
          showDescIcon,
          showValidate,
        } = layout

        const convertValue = item => {
          if (typeof item === 'function') {
            return item(formData, rootValue)
          } else if (typeof item === 'string' && isExpression(item) !== false) {
            const _item = isExpression(item)
            try {
              return evaluateString(_item, formData, rootValue)
            } catch (error) {
              console.error(error.message)
              console.error(`happen at ${item}`)
              return item
            }
          }
          return item
        }

        hidden = convertValue(hidden)
        disabled = convertValue(disabled)
        readonly = convertValue(readonly)
        // options = convertValue(options)

        // iterate over schema, and convert every key
        let _schema = { ...schema }

        if (hidden) return null

        const isComplex = ['object', 'array'].includes(_schema.type)

        const validateText = ''

        const showLabel = !!(_schema.title ||
            options.required ||
            (displayType !== 'row' && showValidate && validateText))

        let columnStyle = {}
        if (!isComplex && (width || column > 1)) {
          columnStyle = Object.assign({
            width: width || `calc(100% / ${column})`,
            paddingRight: '24px',
          })
        }

        const layoutProps = vueProps({
          className,
          columnStyle,
          displayType,
          isComplex,
          showDescIcon,
          showLabel,
          showValidate,
          validateText,
          labelWidth,
        })

        const change = function (key, val) {
          // console.log('asField', 111)
          onChange(key, val)
        }

        // 内部使用 $emit('change') 触发, 则外部使用 onChange 传入
        return (
          <FieldUI
            schema={_schema}
            {...{...layoutProps}}
          >
            <Widget
              vname={vname}
              value={value}
              schema={schema}
              formData={formData}
              mapping={mapping}
              widgets={widgets}
              onChange={change}
            />
          </FieldUI>
        )
      },
    }
  }
}

export const DefaultFieldUI = {
  functional: true,
  name: 'FieldLayout',
  props: {
    schema: Object,
    className: String,
    columnStyle: Object,
    displayType: {
      type: String,
      default: 'column', // row
    },
    showLabel: Boolean,
    isComplex: Boolean,
    isRequired: Boolean,
    showDescIcon: Boolean,
    showValidate: Boolean,
    validateText: String,
  },

  render(h, ctx) {
    const {
      schema,
      columnStyle,
      displayType,
      showLabel,
      labelWidth,
      showDescIcon,
      showValidate,
      validateText,
      isRequired,
      isComplex,
    } = ctx.props

    return (
      <div
        class={`field-item w-100 field-flex-${displayType}`}
        style={columnStyle}
      >
        {showLabel &&(
          <label class="field-label">
            {isRequired && (<span class="field-required">*</span>)}
            <span class={`fiele-title ${isComplex ? 'B' : ''}`}>{schema.title}</span>
            {showDescIcon && schema.description && (<span class="fiele-desc" title={schema.description}>Icon</span>)}
            {showValidate && (<span class="fiele-validate">{validateText}</span>)}
        </label>
        )}

        <div class="field-content">
          {ctx.children}
        </div>
      </div>
    )
  },
}
