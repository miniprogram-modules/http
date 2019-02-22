import adapters from './adapters'
import config from './config'
import CookieJar from './cookiejar'
import Request from './request'
import { mergeConfig } from './utils'
import { cancelToken, isCancel } from './helpers'

const http = new Request(config)

/**
 * 版本号
 *
 * @type {String}
 */
http.version = __VERSION__

/**
 * cookie 管理器
 *
 * @type {CookieJar}
 */
http.CookieJar = CookieJar

/**
 * 默认全局配置
 *
 * @type {HTTP_REQUEST_CONFIG}
 */
http.config = config

/**
 * 适配器列表
 *
 * @type {Object}
 */
http.adapters = adapters

/**
 * 创建 Request 实例
 *
 * @param {Object} options 请求配置
 *
 * @returns {Request}
 */
http.create = function create (options) {
  return new Request(mergeConfig({}, config, options))
}

/**
 * 创建用于取消的函数
 *
 * @type {Function}
 */
http.cancelToken = cancelToken

/**
 * 用于判断是否取消的请求
 *
 * @type {Function}
 */
http.isCancel = isCancel

export default http
