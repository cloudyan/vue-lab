<template>
  <div class="design-canvas preview-container">
    <draggable
      v-model="pageData.list"
      v-bind="dragOptions"
      :componentData="componentData"
      @add="handleWidgetAdd"
      class="drag-container drag-list preview"
      tag="transition-group"
    >
      <template v-for="(item, index) in pageData.list">
        <d-field
          :widgets="widgets"
          :index="index"
          :item="item"
          :schema="pageData.list"
          :key="index"
          class="drag-widget"
        />
      </template>
      <div key="empty" slot="footer" class="empty-field">
        <div class="empty-field-hint">请从左侧拖拽或点击添加字段</div>
        <div class="add-new-field-ontheleft" />
      </div>
    </draggable>
    <!-- <div class="submit-field">提交</div> -->
    <div class="ask-to-pay">
      <div class="power-logo">@dwdjs 提供技术支持</div>
      <div class="remove-ad">去logo</div>
    </div>
    <div class="ask-to-pay">
      <div class="power-logo">@dwdjs 表单底部广告</div>
      <div class="remove-ad">去广告</div>
    </div>
  </div>
</template>

<script>
// 默认填充主题数据 如果无数据显示提示拖拽
import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import DField from './field'

export default {
  components: {
    Draggable,
    DField,
  },
  props: {
    // schema: {
    //   type: Object,
    //   default: () => {},
    // },
  },

  data() {
    return {
      drag: false,
      componentData: {
        props: {
          type: 'transition',
          name: 'fade', // fade flip-list
        },
      },
    }
  },

  computed: {
    ...mapState({
      pageData: state => state.design.pageData,
    }),
    dragOptions() {
      return {
        animation: 200,
        group: {
          name: 'widget',
          put: true,
        },
        ghostClass: 'ghost',
        handle: '.drag-widget',
        // disabled: !this.editable,
      }
    },
  },

  mounted () {
    // 防止火狐浏览器拖拽的时候以新标签打开
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    if (isFirefox) {
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },

  methods: {
    handleWidgetAdd(e) {
      console.log('add', e)
      this.$store.dispatch('design/setSelectWidget', this.pageData.list[e.newIndex])
      this.$store.dispatch('design/setConfigTab', 'property')
    },
  },
}
</script>

<style lang="stylus" scoped>
// preview
.design-canvas {
  min-height: 100%;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
}

.canvas-panel {
  min-height: 100%;
  height: 100px;
}

.empty-field {
  border: 1px dashed #d0d0d0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.ask-to-pay {
  display: none;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>
