
<script>

// 测试函数式组件
const gField = ({ Wrapper, Widget }) => {
  return ({ name }) => {
    return {
      functional: true,
      render(h) {
        return (
          <Wrapper>
            <Widget name={name} />
          </Wrapper>
        )
      },
    }
  }
}

const FieldWrapper = {
  functional: true,
  render(h, ctx) {
    return (
      <div>wrapper
        {ctx.children}
      </div>
    )
  },
}

const Hello = {
  // functional: true,
  render(h, ctx) {
    // const { name = 'functional' } = ctx.props
    const { name = 'little boy' } = this
    return (
      <div>hello {name}</div>
    )
  },
}

export default {
  render(h) {
    const GenWidget = gField({ Wrapper: FieldWrapper, Widget: Hello })
    const Widget = GenWidget({ name: 'boy' })

    return (
      <Widget />
    )
  },
}
</script>
