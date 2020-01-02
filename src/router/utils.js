

// in development-env not use lazy-loading,
// because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
export const lazyLoad =
  process.env.NODE_ENV === 'production'
    ? file => () =>
        import(/* webpackChunkName: "[request]" */ '@/views/' + file + '.vue')
    : file => require('@/views/' + file + '.vue').default

