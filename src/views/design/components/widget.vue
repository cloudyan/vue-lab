<template>
  <div class="design-widget h-100">
    <el-container class="h-100">
      <el-header class="p-tabs" height="40px">
        <div :class="{active: widgetTab=='component'}" @click="widgetTab = 'component'" class="p-tab">组件</div>
        <div :class="{active: widgetTab=='tree'}" @click="widgetTab = 'tree'" class="p-tab">组件树</div>
      </el-header>
      <el-main class="p-tabs-main">
        <template v-if="widgetTab=='component'">
          <div v-for="item in dragWidget" :key="item.typeKey" class="widget-group">
            <div class="widget-group-title">{{ item.title }}</div>
            <draggable
              v-bind="dragOptions"
              :list="item.children"
              :move="handleMove"
              :clone="cloneData"
              tag="div"
              class="widget-list flex-items"
            >
              <template v-for="it in item.children">
                <div @click="handleWidgetAdd(it)" :key="it.typeKey" class="widget-item widget-field">{{ it.title }}</div>
              </template>
            </draggable>
          </div>
        </template>
        <template v-else>
          <draggable
            v-if="pageData.list.length"
            v-bind="dragTreeOptions"
            :list="pageData.list"
            tag="div"
            class="widget-tree"
          >
            <template v-for="item in pageData.list">
              <div @click="handleWidgetSelect(item)" :key="item.typeKey" class="widget-item flex-items">
                <icon-svg icon-class="drag2" class="drag-widget" />
                <div class="widget-title">{{ item.title }}</div>
                <d-actions :item="item" />
              </div>
            </template>
          </draggable>
          <div v-else>
            请从左侧拖拽或点击添加字段
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import { deepClone } from '@/utils'
import { schemaToList } from '../utils'
import DActions from './actions'
// import { widgets } from '../widgets'

// 调整数据结构 此处不必使用 schema 格式
// json schema 格式是作为组件自动生成的描述

export default {
  components: {
    Draggable,
    DActions,
  },
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      widgetTab: 'component',
      isDragging: false,
    }
  },

  computed: {
    ...mapState({
      pageData: state => state.design.pageData,
      selectWidget: state => state.design.selectWidget,
    }),
    dragWidget() {
      console.log(schemaToList(this.schema, 2))
      return schemaToList(this.schema, 2)
    },
    dragOptions() {
      return {
        // animation: 0,
        // disabled: !this.editable,
        group: {
          name: 'widget',
          pull: 'clone',
          put: false,
        },
        sort: false,
        ghostClass: 'ghost',
      }
    },
    dragTreeOptions() {
      return {
        animation: 200,
        // disabled: !this.editable,
        group: {
          name: 'tree',
          // pull: 'clone',
          // put: false,
        },
        // sort: false,
        ghostClass: 'ghost',
        handle: '.drag-widget',
      }
    },
  },

  // render(h) {
  //   const { widget } = this.$props

  //   const nodes = Object.entries(widget.properties).map(([k, v]) => {
  //     const subNodes = Object.entries(v.properties).map(([a, b]) => {
  //       return (
  //         <div class="widget-item" key={a}>{b.title}</div>
  //       )
  //     })
  //     return (
  //       <div class="widget-group" key={k}>
  //         <div class="widget-group-title">{v.title}</div>
  //         <div class="widget-list flex-items">
  //           {subNodes}
  //         </div>
  //       </div>
  //     )
  //   })

  //   return (
  //     <div class="fr-widget">
  //       {nodes}
  //     </div>
  //   )
  // },

  methods: {
    cloneData(obj) {
      const newObj = deepClone(obj)
      newObj.key = newObj.typeKey + '_' + Math.ceil(Math.random() * 1000000)
      return newObj
    },
    handleWidgetAdd(item) {
      this.$store.dispatch('design/cloneSelectWidget', item)
      this.$store.dispatch('design/setConfigTab', 'property')
    },
    handleWidgetSelect(item) {
      this.$store.dispatch('design/setSelectWidget', item)
      this.$store.dispatch('design/setConfigTab', 'property')
    },
    // handleMove({relatedContext, draggedContext}) {
    //   const relatedElement = relatedContext.element
    //   const draggedElement = draggedContext.element
    //   return (
    //     (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    //   )
    // },
    handlePreview() {},
    handleSave() {},
    handleLoadData() {},
  },
}
</script>

<style lang="stylus" scoped>
.design-widget {
  user-select: none;
}

.widget-list {
  font-size: 12px;

  .widget-group {
    font-size: 14px;
  }

  .widget-item {
    min-height: auto;
    width: 46%;
    margin: 0 8px 8px 0;
    padding: 0 8px;
    display: flex;
    border: 1px dashed #e4e7ed;
    cursor: move;
    user-select: none;

    &:hover {
      color: #5584ff;
      background: rgba(255, 255, 255, 1);
      border: 1px dashed #5584ff;
    }
  }
}

.widget-tree {
  .widget-title {
    cursor: pointer;
  }

  .ghost {
    background: #e0f2ff;
  }

  .drag-widget {
    cursor: move;
    padding-right: 6px;
    width: 22px;
    color: #ccc;

    &:hover {
      color: #333;
    }
  }
}
</style>
