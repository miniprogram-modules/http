/**
 * 助手函数
 *
 * @module helpers
 *
 * @author 郑贤森 <zhengxs2018@foxmail.com>
*/

/**
 * 拦截器管理
 *
 * @private
 *
 * @returns {{ use: Function }}
 */
export function interceptorManager () {
  const handlers = []

  handlers.use = function use (fulfilled, rejected) {
    this.push({ fulfilled, rejected })
    return this.length - 1
  }

  return handlers
}

/**
 * 用于取消 HTTP 请求
 *
 * @returns {{ token: Promise, cancel: Function }}}
 */
export function cancelToken () {
  let cancel
  let token = new Promise(resolve => {
    cancel = resolve
  })

  return { token, cancel }
}

/**
 * 判断是否是主动取消的错误
 *
 * @param {Error} error 错误对象
 *
 * @returns {Boolean}
 */
export function isCancel (error) {
  return error && error.__CANCEL__
}
