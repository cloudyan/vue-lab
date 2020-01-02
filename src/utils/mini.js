import qs from 'qs'
import router from '@/router'
// import { Toast, Indicator, MessageBox } from 'mint-ui';
// import env from '@/config/env';
// import device from '@/utils/device';

import { compactObject, stringify, storage } from '@dwdjs/utils'
import eventSub from '@/utils/eventSub'

// 透传参数白名单
const passRoutes = ['d_debug', 'd_host', 'd_console', 'spm', 'channel']
const mini = {
  storage,
  // log: tongji.event,
  // showToast Message
  // showAlert MessageBox
  // showConfirm MessageBox
  // showLoading Loading
  // forward仅用于站内跳转
  forward(url, query = {}) {
    if (!url) return
    // url 可以传path，也可以传name，建议path
    const params = qs.parse(window.location.href.split('?')[1])
    // 需要透传的参数
    const passParams = {}
    for (let key in params) {
      if (passRoutes.includes(key)) {
        passParams[key] = params[key]
      }
    }
    const urlType = 'currentH5Site'
    if (urlType === 'currentH5Site' || urlType === 'other') {
      mini.goRouter(info.path, info.query)
    } else {
      location.href = info.link
    }
  },
  goRouter(path, query) {
    const { replace, back } = query
    delete query.replace
    delete query.back
    if (back) return mini.back()
    const type = !replace ? 'push' : 'replace'
    router[type](
      {
        path: path,
        query: query,
      },
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  },
  back(n = -1) {
    router.go(n)
  },
  // onUrlPage用于各种链接跳转
  onUrlPage(e) {
    if (!e) {
      console.log('此方法限用于 data-link 链接跳转')
      return
    }
    e.preventDefault()
    const dom = e.currentTarget
    let link = dom.getAttribute('data-link')

    mini.forward(link)
  },
  eventSub, // 事件订阅，后期优化
}

/**
 * 解决循环导入
 * https://www.cnblogs.com/mengfangui/p/9640993.html
 */
export default mini
