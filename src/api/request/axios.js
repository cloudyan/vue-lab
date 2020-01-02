import axios from 'axios'
// import { stringify } from '@dwdjs/utils';
import { clone } from '@/utils'
import mini from '@/utils/mini'
import store from '@/store'
import { Message } from 'element-ui'
// import router from '@/router';

// 创建axios实例
function noop() {
  console.error('异常流程，不应该进入这里')
}

function checkStatus(res = {}) {
  console.log('check')
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  }
}

const defaultOptions = {
  url: '',
  method: 'get',
  baseURL: '',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  params: {},
  data: {},
  responseType: 'json',
  withCredentials: true,
  timeout: 30000, // 请求超时时间
}

export default function request({
  url,
  method,
  options = {},
  success = noop,
  fail = noop,
  header,
}) {
  const opts = clone(defaultOptions)
  opts.url = url
  opts.headers = {
    ...opts.headers,
    ...header,
  }
  // let hasLoading = false;
  // if (options.showLoading) {
  //   hasLoading = true;
  //   Loading.service
  // }
  // delete options.showLoading; // 删除loading
  if (method === 'GET') {
    opts.method = 'get'
    opts.params = options
  } else {
    opts.method = 'post'
    // let query = new URLSearchParams();
    // for (let key in options) {
    //   query.append(key, options[key]);
    // }
    // opts.data = query;

    // Form Data(application/x-www-form-urlencoded)
    // opts.data = stringify(options);

    // json(application/json)
    opts.data = `${JSON.stringify(options)}`
  }

  const successCallBack = data => {
    if (typeof success === 'function') {
      success(data)
    }
  }
  const errorCallBack = (err = {}) => {
    if (typeof fail === 'function' && fail(err)) {
      return
    }
    const { errmsg = '网络异常，请稍后重试', errno = 'err' } = err
    console.warn(JSON.stringify(err))
    // 9610010 未登录
    if (errno === 9610010) {
      store.dispatch('user/FedLogout')
      mini.forward('/login')
    } else {
      const message = `${errno}: ${errmsg}`
      Message.error(message)
    }
  }

  function log(res) {
    console.log(`api: ${method} ${res.status} ${url}`)
    const { data } = res
    if (data) {
      if (!data.errno) data.errno = data.statusCode || 0
      if (!data.errmsg) data.errmsg = data.message
    }
    return res
  }

  return axios(opts)
    .then(log)
    .then(checkStatus)
    .then((res = {}) => {
      console.log(opts)
      // console.log(JSON.stringify(res));
      const data = res.data
      const errno = data.errno
      const errmsg = data.errmsg
      if (errno === 0) {
        successCallBack({
          errno,
          errmsg,
          ...res.data,
        })
      } else {
        errorCallBack({
          errno,
          errmsg,
        })
      }
    })
    // .catch(err => {
    //   // alert(JSON.stringify(err));
    //   // console.log(err.response);
    //   errorCallBack({
    //     errno: 400,
    //     errmsg: err.message,
    //   })
    // })
}

// 以formData形式上传七牛
export function ajaxFormData({ url = 'https://up.qbox.me', data, method = 'post' }) {
  return new Promise(function (resolve, reject) {
    axios
      .post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
