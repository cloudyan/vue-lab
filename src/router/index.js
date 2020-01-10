import Vue from 'vue'
import Router from 'vue-router'
import env from '@/config/env'
import { isURL } from '@/utils/validate'
import {
  // storage,
  session,
} from '@dwdjs/utils'

Vue.use(Router)

import { lazyLoad } from './utils'
// import Layout from '@/layout'
import routerNode from '@/layout/router-node'

// modules
// import demoRouter from './modules/demo'
import designRouter from './modules/design'
// import errorRouter from './modules/error'
// import toolRouter from './modules/tool'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: lazyLoad('demo/redirect/index'),
  //     },
  //   ],
  // },
  // {
  //   path: '/login',
  //   component: lazyLoad('login/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/auth-redirect',
  //   component: lazyLoad('login/auth-redirect'),
  //   hidden: true,
  // },
  {
    path: '/',
    component: lazyLoad('playground/router'),
    alias: '/router',
    name: 'router',
  },
  {
    path: '/playground',
    component: lazyLoad('playground/index'),
    name: 'playground',
    meta: {
      title: '测试',
    },
  },
  {
    path: '/test2',
    component: lazyLoad('playground/test'),
    name: 'test2',
    meta: {
      title: '测试',
    },
  },
  // ...demoRouter,
  ...designRouter,
  // ...errorRouter,
  // ...toolRouter,
  {
    path: '/404',
    component: lazyLoad('playground/test'),
    name: 'test2',
    meta: {
      title: '测试',
    },
  },
  { path: '*', redirect: '/404', hidden: true },
]

// 通过路径配置过滤来动态加载路由
// 动态路由在 store 中接口控制
export const asyncRoutes = [
  // 404 page must be placed at the end !!!

]

const createRouter = () => new Router({
  mode: env.routerMode,
  base: env.routerBase,
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const router = createRouter()

export default router

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
