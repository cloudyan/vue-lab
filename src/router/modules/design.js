// 表单生成器

import { lazyLoad } from '../utils'
// import Layout from '@/layout'
import routerNode from '@/layout/router-node'

export default [
  {
    path: '/design',
    component: routerNode,
    redirect: '/design/index',
    name: 'design',
    meta: {
      title: '设计器',
      icon: 'form',
    },
    children: [
      {
        path: 'index',
        component: lazyLoad('design/index'),
        name: 'design',
        meta: { title: '设计器' },
      },
      {
        path: 'form',
        component: lazyLoad('design/form'),
        name: 'form',
        meta: { title: '表单' },
      },
      // {
      //     path: 'generator',
      //     name: '表单生成器',
      //     component: lazyLoad('form/generator'),
      // },
    ],
  },
]
