

export const asField = ({ FieldUI, Widget }) => {
  return ({
    layout,
    vname,
    schema,
    formData,
    mapping,
    widgets,
    onChange,
  }) => {
    return {
      functional: true,
      render(h) {
        return (
          <FieldUI
            schema={schema}
            {...{props: {...layout} }}
          >
            <Widget
              vname={vname}
              schema={schema}
              formData={formData}
              mapping={mapping}
              widgets={widgets}
              propsOnChange={onChange}
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
    column: {
      type: Number,
      default: 1,
    },
    displayType: {
      type: String,
      default: 'column', // row
    },
    showDescIcon: false,
    showValidate: true,
    width: String,
    validateText: String,
    onChange: {
      type: Function,
      default: () => {},
    },
    // onValidate: () => {},
  },

  render(h, ctx) {
    const {
      schema,
      column,
      displayType,
      showDescIcon,
      showValidate,
      validateText,
    } = ctx.props

    const { options = {}, style = {} } = schema
    const isComplex = ['object', 'array'].includes(schema.type)
    let columnStyle = {}

    if (!isComplex) {
      columnStyle = Object.assign({
        width: `calc(100% / ${column})`,
        paddingRight: '24px',
      }, schema.style)
    }

    const showLabel = schema.title || options.required ||
      (displayType !== 'row' && showValidate && validateText)

    return (
      <div
        class={`field-item w-100 field-flex-${displayType}`}
        style={columnStyle}
      >
        {showLabel &&(
          <label class="field-label">
            {options.required && (<span class="field-required">*</span>)}
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
