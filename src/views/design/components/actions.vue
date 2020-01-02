<template>
  <div class="actions">
    <el-tooltip effect="dark" content="复制" placement="bottom">
      <a @click.stop="handleWidgetClone" class="d-action-copy"><icon-svg icon-class="copy" /></a>
    </el-tooltip>
    <el-tooltip effect="dark" content="删除" placement="bottom">
      <a @click.stop="handleWidgetDelete" class="d-action-trash"><icon-svg icon-class="trash" /></a>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },

  methods: {
    handleWidgetClone() {
      console.log('clone')
      this.$store.dispatch('design/cloneSelectWidget', this.item)
      this.$store.dispatch('design/setConfigTab', 'property')
    },
    handleWidgetDelete() {
      this.$store.dispatch('design/deleteSelectWidget', this.item)
    },
  },
}
</script>

<style lang="stylus" scoped>
.actions {
  display: none;
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 0;
  transform: translateY(50%);
}

.d-action-copy,
.d-action-trash {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.d-action-copy {
  color: #71b300;

  &:hover {
    color: #fff;
    background-color: #71b300;
  }
}

.d-action-trash {
  color: #ff3824;

  &:hover {
    color: #fff;
    background-color: #ff3824;
  }
}
</style>
