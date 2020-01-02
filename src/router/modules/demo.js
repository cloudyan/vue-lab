// 组件 demo

import { lazyLoad } from '../utils'
import Layout from '@/layout'
import routerNode from '@/layout/router-node'

export default [
  {
    path: '/demo',
    component: Layout,
    redirect: 'noRedirect',
    name: 'demo',
    meta: {
      title: '示例',
      icon: 'component',
    },
    children: [
      {
        path: 'test',
        component: lazyLoad('demo/test'), // Parent router-view
        name: 'interactive',
        meta: {
          title: '测试',
          icon: 'example',
        },
      },
      {
        path: 'interactive',
        redirect: '/demo/interactive/back-to-top',
        component: routerNode, // Parent router-view
        name: 'interactive',
        meta: {
          title: '交互操作',
          icon: 'example',
        },
        children: [
          {
            path: 'clipboard',
            component: lazyLoad('demo/interactive/clipboard'),
            name: 'Clipboard',
            meta: { title: 'clipboard' },
          },
          {
            path: 'index',
            component: lazyLoad('demo/tab/index'),
            name: 'Tab',
            meta: { title: 'tab', icon: 'tab' },
          },
          {
            path: 'https://baidu.com?spm=vue-admin-pro',
            meta: { title: 'externalLink', icon: 'link' },
          },
          {
            path: 'back-to-top',
            component: lazyLoad('demo/interactive/back-to-top'),
            name: 'BackToTopDemo',
            meta: { title: 'backToTop' },
          },
          {
            path: 'sticky',
            component: lazyLoad('demo/interactive/sticky'),
            name: 'StickyDemo',
            meta: { title: 'sticky' },
          },
          {
            path: 'count-to',
            component: lazyLoad('demo/interactive/count-to'),
            name: 'CountToDemo',
            meta: { title: 'countTo' },
          },
          {
            path: 'split-pane',
            component: lazyLoad('demo/interactive/split-pane'),
            name: 'SplitPane',
            meta: { title: 'split-pane' },
          },
          {
            path: 'avatar-upload',
            component: lazyLoad('demo/interactive/avatar-upload'),
            name: 'AvatarUploadDemo',
            meta: { title: 'avatarUpload' },
          },
          {
            path: 'i18n',
            component: lazyLoad('demo/interactive/i18n/index'),
            name: 'i18n',
            meta: { title: 'i18n' },
          },
          // 换肤涉及诸多色彩协调的问题
          // {
          //   path: 'theme',
          //   component: lazyLoad('demo/interactive/theme'),
          //   name: 'theme',
          //   meta: { title: 'theme' },
          // },
          {
            path: 'drag',
            redirect: 'noRedirect',
            name: 'drag',
            component: routerNode,
            meta: {
              title: '拖拽',
              icon: 'drag',
            },
            children: [
              {
                path: 'dialog',
                component: lazyLoad('demo/drag/dialog'),
                name: 'DragDialogDemo',
                meta: { title: 'dragDialog' },
              },
              {
                path: 'select',
                component: lazyLoad('demo/drag/select'),
                name: 'DragSelectDemo',
                meta: { title: 'dragSelect' },
              },
              {
                path: 'list',
                component: lazyLoad('demo/drag/list'),
                name: 'DndListDemo',
                meta: { title: 'dndList' },
              },
              {
                path: 'kanban',
                component: lazyLoad('demo/drag/kanban'),
                name: 'DragKanbanDemo',
                meta: { title: 'dragKanban' },
              },
            ],
          },
        ],
      },
      {
        path: 'editor',
        redirect: '/demo/editor/json',
        component: routerNode, // Parent router-view
        name: 'editor',
        meta: {
          title: '编辑器',
          icon: 'edit',
        },
        children: [
          {
            path: 'json',
            component: lazyLoad('demo/editor/json'),
            name: 'JSON',
            meta: { title: 'json' },
          },
          {
            path: 'json2schema',
            component: lazyLoad('demo/editor/json-schema'),
            name: 'json2schema',
            meta: { title: 'json2schema' },
          },
          {
            path: 'json2',
            component: lazyLoad('demo/editor/json2'),
            name: 'JSON2',
            meta: { title: 'json2' },
          },
          {
            path: 'monaco',
            component: lazyLoad('demo/editor/monaco'),
            name: 'Monaco',
            meta: { title: 'monaco' },
          },
          {
            path: 'markdown',
            component: lazyLoad('demo/editor/markdown'),
            name: 'Markdown',
            meta: { title: 'markdown' },
          },
          // {
          //   path: 'tinymce',
          //   component: lazyLoad('demo/editor/tinymce'),
          //   name: 'Tinymce',
          //   meta: { title: '富文本编辑器' },
          // },
        ],
      },
      {
        path: 'excel',
        component: routerNode,
        redirect: '/demo/excel/export-excel',
        name: 'Excel',
        meta: {
          title: 'excel',
          icon: 'excel',
        },
        children: [
          {
            path: 'export-excel',
            component: lazyLoad('demo/excel/export-excel'),
            name: 'ExportExcel',
            meta: { title: 'exportExcel' },
          },
          {
            path: 'export-selected-excel',
            component: lazyLoad('demo/excel/select-excel'),
            name: 'SelectExcel',
            meta: { title: 'selectExcel' },
          },
          {
            path: 'export-merge-header',
            component: lazyLoad('demo/excel/merge-header'),
            name: 'MergeHeader',
            meta: { title: 'mergeHeader' },
          },
          {
            path: 'upload-excel',
            component: lazyLoad('demo/excel/upload-excel'),
            name: 'UploadExcel',
            meta: { title: 'uploadExcel' },
          },
        ],
      },
      {
        path: 'pdf',
        component: routerNode,
        redirect: '/demo/pdf/index',
        children: [
          {
            path: 'index',
            component: lazyLoad('demo/pdf/index'),
            name: 'PDF',
            meta: { title: 'pdf', icon: 'pdf' },
          },
          {
            path: 'download',
            component: lazyLoad('demo/pdf/download'),
            hidden: true,
          },
        ],
      },
      {
        path: 'zip',
        component: routerNode,
        redirect: '/demo/zip/download',
        alwaysShow: true,
        name: 'Zip',
        meta: { title: 'zip', icon: 'zip' },
        children: [
          {
            path: 'download',
            component: lazyLoad('demo/zip/index'),
            name: 'ExportZip',
            meta: { title: 'exportZip' },
          },
        ],
      },
      // {
      //   path: 'dropzone',
      //   component: lazyLoad('demo/dropzone/index'),
      //   name: 'DropzoneDemo',
      //   meta: { title: 'dropzone' },
      // },

      // {
      //   path: 'mixin',
      //   component: lazyLoad('demo/mixin/index'),
      //   name: 'ComponentMixinDemo',
      //   meta: { title: 'componentMixin' },
      // },


    ],
  },
]
