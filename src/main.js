import Vue from 'vue'
import { cookie } from '@dwdjs/utils'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index' // global css

import '@/registerServiceWorker'

import mini from '@/utils/mini'

// import '@/errorLog' // error log
import '@/permission' // permission control

import * as filters from '@/utils/filters' // global filters

Vue.use(Element, {
  size: cookie.get('size') || 'medium', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value),
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// import Page from '@/layout/Page';
import api from '@/api'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
// import '@/config/js-report';

Object.keys(mini).forEach(key => {
  Vue.prototype[`$${key}`] = mini[key]
})

Vue.prototype[`$api`] = api

Vue.config.productionTip = false

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
