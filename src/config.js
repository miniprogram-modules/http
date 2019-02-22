/**
 * 默认 HTTP 全局配置
 *
 * @module config
 *
 * @author 郑贤森 <zhengxs2018@foxmail.com>
*/
import { weChatAdapter } from './adapters'
import CookieJar from './cookiejar'

export default {
  /**
   * 基础路径
   *
   * @type {String}
   */
  baseURL: '',

  /**
   * 自定义 Cookie 管理器
   *
   * @type {CookieJar}
   */
  cookieJar: new CookieJar(),

  /**
   * 请求参数
   *
   * @type {Object}
   */
  params: {},

  /**
   * 自定义请求头
   *
   * @type {Object}
   */
  header: {},

  /**
 * http 请求适配器 - 默认使用微信小程序适配器
 *
 * @type {HttpAdapter}
 */
  httpAdapter: weChatAdapter,

  /**
 * 请求时携带 cookies
 *
 * @type {Boolean}
 */
  withCredentials: false,

  /**
   * 序列化 URL 参数
   *
   * @param {String|Object} params url 参数
   *
   * @returns {String|Null}
   */
  paramsSerializer (params) {
    if (typeof params === 'string') {
      return params.replace(/^\?/, '')
    }

    if (params !== null && typeof params === 'object') {
      return Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&')
    }

    return null
  },

  /**
   * 验证 HTTP Status Code
   *
   * @param {Number} status
   *
   * @returns {Boolean}
   */
  validateStatus (status) {
    return status >= 200 && status < 300
  }
}
