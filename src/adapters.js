/**
 * 内置 http 适配器
 *
 * @module adapters
 *
 * @author 郑贤森 <zhengxs2018@foxmail.com>
*/
import { createError } from './utils'

/**
 * 微信小程序适配器
 *
 * @param {HTTP_REQUEST_CONFIG} config 请求配置
 *
 * @returns {Promise}
 */
export function weChatAdapter (config) {
  return new Promise(function dispatchRequest (resolve, reject) {
    config.success = function (res) {
      const { validateStatus } = config

      if (validateStatus(res.statusCode)) {
        res.config = config
        return resolve(res)
      }

      reject(createError(res.data, res.statusCode, { config }))
    }

    config.fail = function (res) {
      reject(createError(res.errMsg, -1, { config }))
    }

    config.complete = function () {
      req.requested = true
    }

    let req = wx.request(config) || {}

    if (config.cancelToken) {
      config.cancelToken.then(function onCanceled (reason) {
        if (req.requested) return

        req.abort()

        reject(createError(reason, -1, { config, __CANCEL__: true }))
      })
    }
  })
}

export default {
  weChatAdapter
}
