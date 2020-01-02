import { deepClone } from '@/utils'

function cloneData(obj) {
  const newObj = deepClone(obj)
  newObj.key = newObj.typeKey + '_' + Math.ceil(Math.random() * 1000000)
  return newObj
}

// 海量模板 多了要支持搜索
const templates = [
  {
    label: '默认',
    description: '经典专题排版',
    value: 'default',
  },
  {
    label: '推荐',
    description: '优秀专题',
    value: 'recommend',
  },
  {
    label: '主会场',
    description: '支持 xxx',
    value: 't1',
  },
  {
    label: '分会场',
    description: '支持 xxx',
    value: 't2',
  },
]

const state = {
  pageData: {
    title: '标题',
    description: '内容描述',
    template: '', // default
    templates, // 经典模板
    options: {}, // 全局配置
    style: {
      backgroundColor: '#fff',
    },
    list: [],
  },
  canvasSchema: [],
  selectWidget: {},
  configTab: 'property',
}

const mutations = {
  // ADD_CANVAS_SCHEMA: (state, payload) => {
  //   state.setSelectWidget.push(payload)
  // },
  SET_PAGE_DATA: (state, payload) => {

  },
  RESET_PAGE_DATA: (state) => {
    state.pageData.list.splice(0)
    state.selectWidget = {}
  },
  SET_SELECT_WIDGET: (state, payload) => {
    state.selectWidget = payload
  },
  CLONE_SELECT_WIDGET: (state, payload) => {
    const currentIndex = state.pageData.list.indexOf(state.selectWidget) + 1
    const newObj = cloneData(payload)
    state.pageData.list.splice(currentIndex, 0, newObj)
    state.selectWidget = newObj
  },
  DELETE_SELECT_WIDGET: (state, payload) => {
    const currentIndex = state.pageData.list.indexOf(state.selectWidget)
    state.pageData.list.splice(currentIndex, 1)
    state.selectWidget = state.pageData.list[currentIndex] || state.pageData.list[currentIndex-1] || {}
  },
  SET_CONFIG_TAB: (state, payload) => {
    state.configTab = payload
  },
}

const actions = {
  // addCanvasSchema({ commit }, payload) {
  //   commit('ADD_CANVAS_SCHEMA', payload)
  // },
  setPageData({ commit }, payload) {
    commit('SET_PAGE_DATA', null)
  },
  resetPageData({ commit }) {
    commit('RESET_PAGE_DATA')
  },
  setSelectWidget({ commit }, payload) {
    commit('SET_SELECT_WIDGET', payload)
  },
  cloneSelectWidget({ commit }, payload) {
    commit('CLONE_SELECT_WIDGET', payload)
  },
  deleteSelectWidget({ commit }, payload) {
    commit('DELETE_SELECT_WIDGET', payload)
  },
  setConfigTab({ commit }, payload) {
    commit('SET_CONFIG_TAB', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
