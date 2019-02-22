// 虚拟存储器
const vStore = {
  get () {},
  set () {},
  remove () {}
}

/** @class */
class CookieJar {
  /**
   * HTTP Cookie Manager
   *
   * @param {String} externalKey 存储的键
   * @param {Object} options 可选项
   * @param {Object} options.store 数据存储器
   */
  constructor (externalKey, options) {
    this.externalKey = externalKey || '__CLIENT_HTTP_COOKIE__'

    this.options = options || {}
    this.store = this.options.store || vStore

    this.cookies = {}

    // 同步数据
    this.reset()
  }

  /**
   * 获取 cookies 的所有 keys
   *
   * @readonly
   *
   * @type {String[]}
   */
  get keys () {
    return Object.keys(this.cookies)
  }

  /**
   * 重置 cookie 的值
   *
   * @returns {void}
   */
  reset () {
    this.cookies = this.store.get(this.externalKey) || {}
  }

  /**
   * 重新存储值
   *
   * @param {String} raw 原始的 Set-Cookie 值
   *
   * @returns {Object}
   */
  restore (raw) {
    let { cookies } = this

    if (typeof raw === 'string') {
      raw.split(',').forEach(str => {
        let cookie = str.split(';')[0]
        let index = cookie.indexOf('=')
        cookies[cookie.substr(0, index)] = cookie.substr(index + 1)
      })
    }

    // 重新存储 cookies
    this._save()

    return cookies
  }

  /**
   * 序列化 cookie
   *
   * @returns {String}
   */
  serialize () {
    let { keys, cookies } = this

    if (keys.length === 0) {
      return keys.reduce((v, k) => v.concat(`${k}=${cookies[k]};`), []).join(' ')
    }

    return ''
  }

  /**
   * 存储 cookie 内容到本地
   *
   * @private
   *
   * @returns {void}
   */
  _save () {
    let { externalKey, keys, store } = this

    if (keys.length) {
      store.set(externalKey, this.cookies)
    } else {
      store.remove(externalKey)
    }
  }
}

export default CookieJar
