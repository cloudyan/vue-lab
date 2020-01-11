<template>
  <div>
    <d-text :obj="obj" :number="number" />
  </div>
</template>

<script>

// vue不推荐直接在子组件中修改父组件传来的props的值, 会警告, 但是我没看到
// [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "result" (found in component )

// 没看到警告 副作用如下
// 如果是对象, 因为引用数据类型的关系, 如果子组件修改, 父组件也会被修改(但如果对对象重新赋值, 则切断了引用关系, 父组件不会变更)
// 如果是原始值, 则子组件发生修改, 父组件不会改变
// 综上 遵守单向数据流操作(切除引用关系, 能传递原始值就传递原始值, 同时规避操作引用值)

const DText = {
  props: {
    number: Number,
    obj: Object,
  },
  render(h) {
    return (
      <div>
        <div>
          <span>{this.number}</span>
          <button onClick={this.plusNumber}>plus</button>
        </div>
        <div>
          <span>{this.obj.number}</span>
          <button onClick={this.plusObj}>plus 1</button>
          <button onClick={this.rewriteObj}>plus 2</button>
        </div>
      </div>
    )
  },
  created() {
    // 如果不写 props, 属性都在 $attrs 下
    console.log(this)
  },
  methods: {
    plusNumber() {
      this.number += 1
    },
    plusObj() {
      this.obj.number += 1
    },
    rewriteObj() {
      // 对象重新赋值, 切断了和父组件的对象引用数据类型之间的关联
      // 子组件值变更, 与父组件无关 所以要谨慎对待引用类型
      this.obj = {
        number: this.number++,
      }
    },
  },
}

export default {
  name: 'Props',
  components: {
    DText,
  },

  data() {
    return {
      number: 1,
      obj: {
        number: 2,
      },
    }
  },
}
</script>

<style>

</style>
