<template>
  <el-container class="design-layout h-100">
    <el-header class="design-header flex-middle" hidden height="60px">设计器</el-header>
    <el-main class="design-main">
      <el-container class="design-container h-100">
        <el-aside class="design-activity flex-items-v" width="64px" direction="vertical">
          <div @click="$router.back()" class="activity-item back"><em class="el-icon-back" /></div>
          <div @click="activityTab='widget'" :class="{active: activityTab=='widget'}" class="activity-item widget">组件</div>
          <div @click="activityTab='block'" :class="{active: activityTab=='block'}" class="activity-item block">区块</div>
          <div @click="activityTab='template'" :class="{active: activityTab=='template'}" class="activity-item template">模板</div>
          <div @click="activityTab='schema'" :class="{active: activityTab=='schema'}" class="activity-item schema">Schema</div>
          <div class="bottom">
            <div class="activity-item setting" style="font-size: 32px;"><icon-svg icon-class="setting" /></div>
          </div>
        </el-aside>
        <el-aside class="design-left" width="250px">
          <component :is="`d-${activityTab}`" :schema="asideSchema" />
        </el-aside>
        <el-container class="design-center">
          <el-header class="center-bar" height="40px" direction="vertical">
            <el-select
              v-model="pageData.template"
              @change="handleChangeTemplate"
              clearable
              size="mini"
              placeholder="使用模板, 快速开始"
              class="btn"
            >
              <el-option disabled style="color: red; font-size: 12px;">变更模板会重置已选数据</el-option>
              <el-option
                v-for="item in pageData.templates"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span class="fl">{{ item.label }}</span>
                <small class="fr">{{ item.description }}</small>
              </el-option>
            </el-select>
            <el-button @click="handleReset" type="text" class="btn">重置</el-button>
            <el-button @click="handlePreview" type="text" class="btn">预览</el-button>
            <el-button @click="handleSave" type="text" class="btn">保存</el-button>
          </el-header>
          <el-main class="canvas-container">
            <d-canvas />
          </el-main>
        </el-container>
        <el-aside class="design-right" width="290px">
          <el-container class="h-100">
            <el-header class="p-tabs" height="40px">
              <div :class="{active: configTab=='property'}" @click="handleConfigTab('property')" class="p-tab">编辑字段</div>
              <div :class="{active: configTab=='layout'}" @click="handleConfigTab('layout')" class="p-tab">布局</div>
              <div :class="{active: configTab=='script'}" @click="handleConfigTab('script')" class="p-tab">脚本</div>
              <div :class="{active: configTab=='data'}" @click="handleConfigTab('data')" class="p-tab">数据</div>
            </el-header>
            <el-main class="p-tabs-main">
              <component :is="`d-${configTab}`" :schema="configSchema" />
            </el-main>
          </el-container>
        </el-aside>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
// 活动栏
// 侧边栏
// 编辑栏
// 面板栏
// 状态栏
import { mapState } from 'vuex'
import { widgetSchema } from './data'
import DWidget from './components/widget'
import DBlock from './components/block'
import DTemplate from './components/template'
import DProperty from './components/property'
import DScript from './components/script'
import DLayout from './components/layout'
import DData from './components/data'
import DPage from './components/page'
import DCanvas from './components/canvas'
import DSchema from './components/schema'
import { deepClone } from '@/utils'

// function humanSchema(schema) {
//   return Object.entries(schema).map((a, b) => {
//     return
//   })
// }

/* eslint vue/no-unused-components: 0 */
export default {
  components: {
    DWidget,
    DBlock,
    DTemplate,
    DPage,
    DProperty,
    DLayout,
    DScript,
    DData,
    DCanvas,
    DSchema,
  },
  data() {
    return {
      widgetSchema,
      page: [],
      activityTab: 'widget',
      property: {},
      script: {},
      layout: {},
      data: {},
      // aside: 'widget',
      // configTab: 'property',
    }
  },

  computed: {
    ...mapState({
      pageData: state => state.design.pageData,
      selectWidget: state => state.design.selectWidget,
      configTab: state => state.design.configTab,
    }),
    asideSchema() {
      return this[`${this.activityTab}Schema`]
    },
    configSchema() {
      return this[`${this.configTab}Schema`]
    },
  },

  created() {},

  methods: {
    handleReset() {
      // 重置默认
      // this.$store.dispatch('design/setSelectWidget', {})
      // const { theme, themes } = this.pageData
      this.$store.dispatch('design/resetPageData', null)
    },
    handlePreview() {
      this.$alert('预览', { showClose: false })
    },
    handleSave() {
      // api.save
      console.log('data', this.pageData)
      this.$alert('保存成功', { showClose: false })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleConfigTab(type) {
      this.$store.dispatch('design/setConfigTab', type)
    },
    handleChangeTemplate(template) {
      console.log('当前主题', template)
      if (!template) {
        this.handleReset()
      }
    },
  },
}
</script>

<style lang="stylus">
.p-tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  height: 40px;
  cursor: pointer;
}

.p-tab {
  height: 100%;
  border-bottom: 2px solid #E4E7ED;
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &.active {
    border-color: #5584ff;
    color: #5584ff;
  }
}

.p-tabs-main {
  padding: 8px 0 12px 12px;
  overflow-y: scroll;
}
</style>

<style lang="stylus" scoped>

// $designAsideWidth = 250px;

.design-header {
  background-color: #5584ff;
  color: #fff;
}

.design-main {
  padding: 0;
  height: calc(100% - 60px);
}

.design-activity {
  position: relative;
  margin: 0;
  padding: 0;
  border-radius: 0;
  overflow: hidden;
  background: #5584ff;
  border-right: 1px solid #999;
  flex-wrap: nowrap;
  user-select: none;

  .bottom {
    position: absolute;
    bottom: 0;
  }
}

.activity-item {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // margin: 8px 0;
  width: 64px;
  height: 64px;
  color: #fff;
  // background: ;
  // border-bottom: 1px solid #e4e7ed;
  opacity: 0.5;

  &.back {
    font-size: 24px;
    opacity: 1;
  }
  &.active {
    opacity: 1;

    &::after {
      content: '';
      position: absolute;
      height: 90%;
      width: 2px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
    }
  }
}

.design-left,
.design-right {
  position: relative;
  margin: 0;
  padding: 0;
  background: none;
}

.design-left {
  // box-shadow: 2px 2px 4px 0 #e4e7ed;
  box-shadow: 2px 2px 4px 0 rgba(34,34,34,0.1);
}

.design-right {
  // box-shadow: -2px 2px 4px 0 #e4e7ed;
  box-shadow: -2px 2px 4px 0 rgba(34,34,34,0.1);
  font-size: 14px;
}

.canvas-container {
  // background: #85c8c5;
  background: #f2f3f7;
}

.center-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;

  .btn {
    color: #5584ff;
    padding: 0 8px;
    margin-left: 10px;
  }
}

// .p-tabs[fixed] {
//   background: #fff;
//   >>> .el-tabs__nav-wrap {
//     width: 250px;
//   }
// }

// .p-item {
//   padding: 0 8px;
// }
</style>
