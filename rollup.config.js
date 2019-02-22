import { join } from 'path'

import camelCase from 'lodash/camelCase'

import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import clear from 'rollup-plugin-clear'
import { eslint } from 'rollup-plugin-eslint'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'

import {
  name,
  version,
  author,
  license,
  peerDependencies,
  optionalDependencies
} from './package.json'

process.env.NODE_ENV = 'production'

// 处理路径
const toPath = (...paths) => join(__dirname, ...paths)

// 默认对 js 进行压缩输出
// const isMinify = (v => v === undefined || v)(process.env.npm_config_minify)

const env = {
  __VERSION__: version,
  NODE_ENV: process.env.NODE_ENV
}

const banner =
`/**
 * ${name} v${version}
 *
 * (c) ${new Date().getFullYear()} ${author}
 *
 * @author ${author}
 * @license ${license}
 */`

const configs = {
  cjs: {
    input: 'src/index.js',
    output: `dist/lib.common.js`
  },
  es: {
    input: 'src/index.js',
    output: `dist/lib.esm.js`
  }
}

const depends = Object.keys(Object.assign({}, peerDependencies, optionalDependencies))

const genConfig = ({ input, output, plugins = [] }, format) => {
  return {
    input: toPath(input),
    output: {
      banner,
      name: camelCase(name.replace(/^@.+\//, '')),
      file: toPath(output),
      format
    },
    external (path) {
      return depends.some(name => {
        return path.indexOf(name) > -1
      })
    },
    plugins: [
      clear({
        targets: [
          'dist',
          'bundle-analyzer-report.html'
        ]
      }),
      progress({
        clearLine: false
      }),
      eslint(),
      replace(Object.keys(env).reduce((obj, key) => {
        obj[key] = JSON.stringify(env[key])
        return obj
      }, {})),
      resolve(),
      commonjs(),
      json(),
      buble(),
      filesize()
    ].concat(plugins || [])
  }
}

export default Object.keys(configs).map(key => {
  return genConfig(configs[key], key)
})
