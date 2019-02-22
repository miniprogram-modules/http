/**
 * 网络请求模块
 *
 * @author 郑贤森 <zhengxs2018@foxmail.com>
*/
import { interceptorManager } from './helpers'
import { resolveUrl, buildURL, mergeConfig } from './utils'

/** @class */
class Request {
  /**
   * 请求抽象类
   *
   * @param {HTTP_CONFIG} config HTTP配置
   */
  constructor (config) {
    const { baseURL, httpAdapter, cookieJar } = config

    /**
     * 默认请求配置
     *
     * @protected
     * @var {Object}
     */
    this.$config = config

    /**
     * 基础地址
     *
     * @protected
     * @readonly
     *
     * @var {String}
     */
    this.$baseURL = baseURL

    /**
     * 基础地址
     *
     * @protected
     *
     * @var {String}
     */
    this.$httpAdapter = httpAdapter

    /**
     * 拦截器
     *
     * @protected
     *
     * @var {{request: { use: Function }, response: { use: Function }}}
     */
    this.interceptors = {
      request: interceptorManager(),
      response: interceptorManager()
    }

    this.interceptors.request.use(config => {
      let { url, params, paramsSerializer } = config

      // 处理请求参数
      config.url = buildURL(url, paramsSerializer(params))

      // 处理 cookie
      if (config.withCredentials) {
        let cookies = cookieJar.serialize()

        if (cookies.length) {
          config.header = config.header || {}
          config.header.Cookie = cookies
        }
      }

      return config
    })

    this.interceptors.response.use(res => {
      let cookieRaw = res.header['Set-Cookie']

      if (cookieRaw && cookieRaw.length) {
        cookieJar.restore(res.header['Set-Cookie'])
      }

      return res
    })
  }

  /**
   * REQUEST 请求
   *
   * @param {String} method 请求方法
   * @param {String} url 相对地址
   * @param {Object} [options={}] 可选项
   * @param {string|object} options.params 请求参数
   * @param {string|object|ArrayBuffer} options.data 表单数据
   * @param {Object} options.header 请求头配置
   * @param {String} [options.dataType=json] 返回的数据格式
   * @param {String} [options.responseType=text] 响应的数据类型
   * @param {Promise} [options.cancelToken=null] 用于主动取消请求
   *
   * @return {Promise}
   */
  request (method, url, options) {
    let chain = [this.$httpAdapter, undefined]
    let defaults = { method, url: resolveUrl(this.$baseURL, url) }
    let promise = Promise.resolve(mergeConfig(defaults, this.$config, options))

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
  }

  /**
   * GET 请求
   *
   * @param {String} url  请求目标地址
   * @param {Object} [options={}] 可选项
   * @param {string|object} options.params 请求参数
   * @param {Object} options.header 请求头配置
   * @param {String} [options.dataType=json] 返回的数据格式
   * @param {String} [options.responseType=text] 响应的数据类型
   * @param {Promise} [options.cancelToken=null] 用于主动取消请求
   *
   * @return {Promise}
   */
  get (url, options) {
    return this.request('GET', url, options)
  }

  /**
   * POST 请求
   *
   * @param {String} url  请求目标地址
   * @param {string|object|ArrayBuffer} data 表单数据
   * @param {Object} [options={}] 可选项
   * @param {string|object} options.params 请求参数
   * @param {Object} options.header 请求头配置
   * @param {String} [options.dataType=json] 返回的数据格式
   * @param {String} [options.responseType=text] 响应的数据类型
   * @param {Promise} [options.cancelToken=null] 用于主动取消请求
   *
   * @return {Promise}
   */
  post (url, data, options) {
    return this.request('POST', url, Object.assign({ data }, options))
  }
}

export default Request
