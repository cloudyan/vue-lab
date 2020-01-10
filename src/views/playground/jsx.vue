<template>
  <div>
    <d-form :formData="formData">
      <username
        v-model="formData.currentData.value"
        v-bind="formData.input"
        @input="change"
        @change="change"
        @focus.native="onFocus"
        @click.native="clickUsername"
      />
      <checkbox
        v-model="formData.currentData"
        v-bind="formData.checkbox"
      />
      <other :text="formData.currentData.value" />
    </d-form>
  </div>
</template>

<script>
// react 是单向数据流
// vue 双向数据绑定(这只是语法糖 v-model) 本质还是遵循单向数据流的
// 为什么使用单向数据流? 这样更简单
// el-form 和 el-input el-select 的父子/兄弟组件通信? 本质 v-model 也是单向实现的

// 这里测试单向数据传递, 子组件易出现直接修改props 的情况
// import Vue from 'vue'

// Vue.component 这个写组件没生效, 不知道哪里影响了

// 测试 引用变量副作用
// 测试 直接修改 props问题, 这个什么副作用?
// 测试 绑定事件 jsx 怎么写? 以及如何触发$emit
// element-ui 通信机制 provide/inject
let formData = {
  currentData: {
    value: 'boy',
  },
  input: {
    label: 'name: ',
    // value: 'boy',
  },
  checkbox: {
    label: 'sex: ',
    // value: '1',
    items: [
      {
        label: 'boy',
        value: '1',
      },
      {
        label: 'gril',
        value: '2',
      },
    ],
  },
}

// clearInterval(window.test)
// let i = 1
// window.test = setInterval(() => {
//   i++
//   if (i > 3) {
//     // 引用类型操作 副作用 相当于组件内赋值 this.xxx = xxx
//     // 此时即使组件内操作 props, 也会变更父组件
//     // formData.currentData = { value: 4 }
//     // formData.currentData.value = 8

//     // 切断引用关系后, 变更互不影响
//     // formData = { currentData: { value: 12 } }
//   }
//   console.log(JSON.stringify(formData))
// }, 1000)

const Other = {
  props: {
    text: String,
  },
  data() {
  },
  render(h) {
    return <div>{this.text}</div>
  },
}

const Username = {
  props: {
    label: String,
    value: String,
  },
  computed: {
    // https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
    inputListeners() {
      var vm = this

      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        {
          // 绑定多个, 按先后顺序触发
          input: function ($event) {
            const { value } = $event.target

            console.log('input change 222')

            // 传值进入使用 v-model指令, 已经处理了双向绑定, 如果仅使用 value 传入, 则原始值修改不影响父组件
            vm.value = value
            // this.value = {
            //   value,
            // }
            vm.$emit('input', value)
          },
        }
      )
    },
  },
  created() {
    console.log('input created:', this)
  },
  render(h) {
    // const directives = [
    //   { name: 'v-bind', value: 123, modifiers: { abc: true } }
    // ]
    return (
      <div>
        <label>
          <span>{this.label}</span>
          <input
            v-bind={this.$attrs}
            value={this.value}
            on-input={this.change}
            on={this.inputListeners}
          />
        </label>

        <button onClick={this.btnClick}>test</button>
      </div>
    )
  },
  methods: {
    // 绑定两个事件, 就各触发一次
    change($event) {
      console.log('input change 111')
      const { value } = $event.target
      // this.value = value
      this.$emit('change', value)
    },
    btnClick($event) {
      $event.preventDefault()
      $event.stopPropagation()
      console.log('click btn')
    },
  },
}

// 是否可以利用引用类型的引用传递做数据双向绑定?
const Checkbox = {
  props: {
    label: String,
    value: Object,
    items: Array,
  },
  data() {
    return {
      // 如果不想直接改 props 可以定义一个局部变量，并用 props 的值初始化它(原始值并不会影响父组件)
      // currentValue: this.value,
    }
  },
  // https://github.com/vuejs/babel-plugin-transform-vue-jsx
  render(h) {
    // template: <input type="checkbox" @change="change" :checked="currentValue" >
    const { items, value, change } = this
    const nodes = items.map(item => {
      return (
        <label>
          <span>{item.label}</span>
          <input
            type="radio"
            name="sex"
            value={item.value}
            onInput={change}
            checked={item.value === value.value}
          />
        </label>
      )
    })
    return (
      <div>
        <span>{this.label}</span>
        {nodes}
      </div>
    )
  },
  created() {
    console.log(this)
    // 直接操作了 props !!!
    this.items.push({
      label: 'unknow',
      value: '3',
    })
  },
  methods: {
    change($event) {
      const { value } = $event.target
      // this.value = $event.target.checked

      // this.value = value // 直接操作了 props(如果是引用数据类型操作,副作用)
      this.value = {
        value,
      }
      this.$emit('input', {
        value,
      })
    },
  },
}

// 如果不定义局部变量, 那就会更改父级传入的 props 值了
// 如果是传入原始值, 本质也无法更改 props 了

const DForm = {
  props: {
    formData: Object,
  },
  render(h) {
    const { $slots } = this
    return (
      <form>
        {$slots.default}
      </form>
    )
  },
  created() {
    console.log(this.formData)
  },
}

export default {
  components: {
    DForm,
    Username,
    Checkbox,
    Other,
  },
  data() {
    return {
      // formData,
      formData: JSON.parse(JSON.stringify(formData)),
    }
  },
  methods: {
    change(val) {
      console.log('wrapper', val)
    },
    onFocus(val) {
      console.log('wrapper', val)
    },
    clickUsername($event) {
      console.log('click username component')
    },
  },
}


// 下面这个怎么不生效 触发 created 了, 但是页面上不显示
// Vue.component('usename', {
//   template: `
//     <div>
//       <label>
//         <span>{{ label }}</span>
//         <input
//           v-bind="$attrs"
//           v-bind:value="value"
//           v-on="inputListeners"
//         />
//       </label>
//     </div>
//   `,
//   inheritAttrs: false,
//   props: {
//     label: String,
//     value: String,
//   },
//   data() {
//     return {}
//   },
//   computed: {
//     inputListeners: function () {
//       var vm = this
//       // `Object.assign` 将所有的对象合并为一个新对象
//       return Object.assign({},
//         // 我们从父级添加所有的监听器
//         this.$listeners,
//         // 然后我们添加自定义监听器，
//         // 或覆写一些监听器的行为
//         {
//           // 这里确保组件配合 `v-model` 的工作
//           input: function (event) {
//             vm.$emit('input', event.target.value)
//           },
//         }
//       )
//     },
//   },
//   created() {
//     console.log('input')
//   },
// })
</script>

<style>

</style>
