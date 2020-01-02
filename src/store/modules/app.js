import { cookie } from '@dwdjs/utils'
import env from '@/config/env'
// import { getLanguage } from '@/lang/index'

const app = {
  namespaced: true,
  state: {
    site: {
      ...env.site,
    },
    sidebar: {
      opened: cookie.get('sidebarStatus') ? !!+cookie.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    // language: getLanguage,
    size: cookie.get('size') || 'medium',
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        cookie.set('sidebarStatus', 1)
      } else {
        cookie.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      cookie.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      cookie.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      cookie.set('size', size)
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
  },
}

export default app
