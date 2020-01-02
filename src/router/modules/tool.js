// 工具助手
// 链接生成

import { lazyLoad } from '../utils'
import Layout from '@/layout'

export default [
  {
    path: '/tools',
    component: Layout,
    redirect: 'noRedirect',
    name: 'tools',
    meta: {
      title: '工具助手',
      icon: 'role3',
    },
    children: [
      {
        path: 'link',
        component: lazyLoad('modules/tools/link'),
        name: 'link',
        meta: {
          title: '链接生成工具',
          icon: 'link',
        },
      },
      {
        path: 'guide',
        component: lazyLoad('modules/tools/guide/index'),
        name: 'Guide',
        meta: { title: '引导页', icon: 'guide' },
      },
      {
        path: 'icon',
        component: lazyLoad('modules/tools/icon/index'),
        name: 'Icon',
        meta: { title: '图标', icon: 'icon' },
      },
      // {
      //   path: 'lock',
      //   component: lazyLoad('modules/tools/lock/index'),
      //   name: 'Lock',
      //   meta: { title: '锁屏', icon: 'client' },
      // },
      // {
      //   path: 'link-old',
      //   component: lazyLoad('modules/tools/link-old'),
      //   name: 'link-old',
      //   meta: {
      //     title: '链接生成 old',
      //     icon: 'gc1',
      //   },
      // },
      // {
      //   path: 'cdn',
      //   component: lazyLoad('modules/tools/cdn'),
      //   name: 'cdn',
      //   meta: {
      //     title: '图片CDN',
      //     icon: 'gc1',
      //   },
      // },
    ],
  },
]
