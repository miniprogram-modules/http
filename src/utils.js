/**
 * url 处理
 *
 * @private
 *
 * @param {String} baseURL baseURL 基础 URL
 * @param {String} relativeURL relativeURL 相对 URL
 *
 * @returns {String}
 */
export function resolveUrl (baseURL, relativeURL) {
  if (relativeURL.indexOf('http') === 0) {
    return relativeURL
  }
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
}

/**
 * 构建完整的 URL
 *
 * @private
 *
 * @param {Object} url url 地址
 * @param {Object} params 请求参数
 *
 * @returns {String|Null}
 */
export function buildURL (url, params) {
  if (params) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + params
  }

  return url
}

/**
 * 合并请求参数
 *
 * @private
 *
 * @param {Object} target 目标对象
 * @param {Object[]} settings 可选的配置列表
 *
 * @returns {Object} 最终配置
 */
export function mergeConfig (target, ...settings) {
  return settings.reduce((config, options) => {
    if (options === null || typeof options !== 'object') return config

    if (options.hasOwnProperty('header')) {
      config.header = Object.assign(config.header || {}, options.header)
      delete options.header
    }

    if (options.hasOwnProperty('params')) {
      config.params = Object.assign(config.params || {}, options.params)
      delete options.params
    }

    Object.keys(options).forEach(key => {
      config[key] = options[key]
    })

    return config
  }, target || {})
}

/**
 * 创建 Error
 *
 * @private
 *
 * @param {String} message 错误消息
 * @param {Number} statusCode http 状态码
 * @param {Object} extras    额外的可选项
 *
 * @returns {Error}
 */
export function createError (message, statusCode, extras) {
  let error = new Error(message)

  error.statusCode = statusCode

  if (extras) {
    Object.assign(error, extras)
  }

  return error
}
