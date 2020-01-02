<template>
  <div @click.stop="handleWidgetSelect" :class="isActive" class="widget-field">
    <auto-render :vname="item.widget" :schema="item" />
    <d-actions :item="item" />
    <div class="position-actions">
      <el-tooltip effect="dark" content="向上移动" placement="right">
        <a class="d-position"><icon-svg icon-class="up-bold" /></a>
      </el-tooltip>
      <el-tooltip effect="dark" content="向下移动" placement="right">
        <a class="d-position"><icon-svg icon-class="down-bold" /></a>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DActions from './actions'
import AutoRender from '../../auto-render'
// <component :is="getWidget" :item="item" />
// <auto-render :vname="item.widget" :schema="item" />

export default {
  components: {
    AutoRender,
    DActions,
  },
  props: {
    widgets: {
      type: Object,
      required: true,
    },
    schema: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      selectWidget: state => state.design.selectWidget,
    }),
    isActive() {
      return {active: this.item.key === this.selectWidget.key}
    },
  },

  methods: {
    handleWidgetSelect(e) {
      console.log('select')
      this.$store.dispatch('design/setSelectWidget', this.item)
      this.$store.dispatch('design/setConfigTab', 'property')
    },
  },
}
</script>

<style lang="stylus">
// 不使用 scoped, 因为拖拽时, clone 的元素因为 data-v-xxx 限制, 导致样式不生效

.widget-field {
  position: relative;
  margin-bottom: -1px;
  padding: 4px 30px;
  min-height: 80px;
  cursor: pointer;
  border: 1px dashed transparent;
  // border-color:

  &:hover {
    background: #e0f2ff;
  }

  &::after {
    fullAbsolute()
  }

  &.ghost,
  &.active {
    z-index: 1;
    border-color: #4db8ff;
  }

  &.active {
    background: #e0f2ff;

    .actions,
    .position-actions {
      display: flex;
    }

    &::after {
      cursor: move;
    }
  }

  // 如果区块比较大, 拖拽不方便, 所以设置 ghost 时很小高度, 方便拖拽
  &.ghost {
    // overflow: hidden;
    margin: 1px;
    padding: 0;
    min-height: auto;
    height: 3px;
    overflow: hidden;
    border: none;
    border-radius: 3px;
    background: #5584ff;
    // opacity: 0.5;

    // &::after {
    //   z-index: 2;
    //   background: #fff;
    // }
  }
}
</style>
<style lang="stylus" scoped>


.position-actions {
  display: none;
  position: absolute;
  z-index: 2;
  right: 8px;
  top: 50%;
  // display: flex;
  flex-direction: column;
  transform: translateY(-50%);
}

.d-position {
  width: 16px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
  color: #c3c9d0;
  background-color: #fff;
  font-size: 14px;
  text-align: center;

  &+& {
    margin-top: 8px;
  }

  &:hover {
    color: #5584ff;
  }
}
</style>
