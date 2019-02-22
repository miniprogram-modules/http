# miniprogram-plugin-http

[![JavaScript Style Guide][badge:standardjs]][standardjs]

小程序 http 请求插件，后期将兼容其他小程序环境

## 目录结构

```text
Project/
├── .babelrc                      语法兼容配置 - 仅用于单元测试
├── .eslintrc.js                  代码检查配置 - 仅用于构建
├── jsdoc.json                    api 文档配置
├── bundle-analyzer-report.html   构建后的包分析报告
├── rollup.config.js              构建配置
├── coverage/                     测试覆盖率报告
├── dist/                         源码构建目录
├── doc/                          文档构建目录
├── src/                          源码目录
└── test/
    ├── unit/                    单元测试目录
    └── .eslintrc                代码检查配置 - 仅用于测试（源码检查）
```

## 开发步骤

你需要安装 Node.js 的版本为 6+.

克隆此仓库后运行:

```bash
# 安装依赖
$ npm install

# 构建生产代码
$ npm run build

# 观察文件变化并且进行不压缩构建
$ npm run build --no-minify -- --watch

# 构建生产代码并且生成包分析报告
$ npm run build --report

# 生成 API 文档.
$ npm run doc
```

在 package.json 文件的 scripts 部分还有一些其他脚本可用.

## 运行单元测试

```bash
# 运行单元测试，已内置代码覆盖率的功能
$ npm test

# 生成测试覆盖率报告
$ npm run report
```

## 版本发布

```bash
# 更新版本，内置代码检查
$ npm version <newversion|major|minor|patch>

# 发布包，内置代码构建
$ npm publish
```

See [npm](https://docs.npmjs.com/) for more help.

## 更新日志

See [CHANGELOG.md](./CHANGELOG.md)

## 待办事项

See [TODO.md](./TODO.md)

[nodejs]: https://nodejs.org
[rollupjs]: https://rollupjs.org
[standardjs]: https://standardjs.com
[badge:standardjs]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
