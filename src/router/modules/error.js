// 错误页面

import { lazyLoad } from '../utils'
import Layout from '@/layout'

export default [
  {
    path: '/401',
    component: lazyLoad('error/401'),
    hidden: true,
  },
  {
    path: '/404',
    component: lazyLoad('error/404'),
    hidden: true,
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'error',
    // hidden: true,
    meta: {
      title: '错误页',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: lazyLoad('error/401'),
        name: '401',
        meta: { title: '401', noCache: true },
      },
      {
        path: '404',
        component: lazyLoad('error/404'),
        name: '404',
        meta: { title: '404', noCache: true },
      },
      {
        path: 'log',
        component: lazyLoad('error/log'),
        name: 'log',
        meta: { title: 'log', noCache: true },
      },
    ],
  },
]
