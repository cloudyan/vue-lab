import router from '@/router'
// import store from '@/store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
  // NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
