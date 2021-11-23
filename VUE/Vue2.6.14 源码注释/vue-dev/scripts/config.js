
// 用到的模块
const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version
const weexVersion = process.env.WEEX_VERSION || require('../packages/weex-vue-framework/package.json').version
const featureFlags = require('./feature-flags')

// 局部变量 这个就是构建出来的文件的最上方,会添加下面的几行注释 包含版本,作者等信息
const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

  //
const weexFactoryPlugin = {
  intro () {
    return 'module.exports = function weexFactory (exports, document) {'
  },
  outro () {
    return '}'
  }
}

// 这里的aliases就相当于
/**
 * {
 *  vue: '/vue-dev/src/platforms/web/entry-runtime-with-compiler'
    compiler: '/vue-dev/src/compiler'
    core: '/vue-dev/src/core'
    shared: '/vue-dev/src/shared'
    web: '/vue-dev/src/platforms/web'
    weex: '/vue-dev/src/platforms/weex'
    server: '/vue-dev/src/server'
    sfc: '/vue-dev/src/sfc'
 * }
 */

const aliases = require('./alias')


// 用来处理路径的方法
const resolve = p => {
  // 接收一个参数 使用split方法 通过'/'进行分割  拿到第一个值作为base
  const base = p.split('/')[0]
  // 然后通过base取到目标路径
  if (aliases[base]) {
    // 如果取到了目标路径 返回拼接后的
    // 通过slice方法截取base的长度+1  +1是为了把'/'也包括在内  拿到文件名   然后通过path模块的resolve方法将目标路径和文件名拼接起来
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    //如果没有取到  直接返回当前路径的上一级(根目录)拼上传入的参数
    return path.resolve(__dirname, '../', p)
  }
}


/**
 * 拿下面第一个'web-runtime-cjs-dev'举例
 * entry的入口为: resolve('web/entry-runtime.js'), 也就是说p参数就是'web/entry-runtime.js'
 * 然后我们先通过split获取base  也就是'web'
 * 然后判断aliases[web]是否存在,很显然是存在的 也就是'/vue-dev/src/platforms/web' 这个目录
 * 然后通过slice拿到文件名'entry-runtime.js'
 * 最后再拼接上 返回的结果就是/vue-dev/src/platforms/web/entry-runtime.js
 * 可以根据这个路径查看一下文件在不在
 */

/**
 * 再拿下面第一个'web-runtime-cjs-dev'里面的dest举例
 * 很显然aliases[dist]是不存在的
 * 那么我们就走else分支 返回的是根目录拼接上p这个参数
 * 也就是/vue-dev/dist/vue.runtime.common.dev.js
 */


// 不同版本的Vue.js编译配置
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    // 入口
    entry: resolve('web/entry-runtime.js'),
    // 目标
    dest: resolve('dist/vue.runtime.common.dev.js'),
    // 构建出来的文件格式 cjs 表示构建出来的文件遵循 CommonJS 规范，es 表示构建出来的文件遵循 ES Module 规范。 umd 表示构建出来的文件遵循 UMD 规范。
    format: 'cjs',
    // 环境
    env: 'development',
    //
    banner
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.js'),
    format: 'es',
    transpile: false,
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.min.js'),
    format: 'es',
    transpile: false,
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // Web compiler (CommonJS).
  'web-compiler': {
    entry: resolve('web/entry-compiler.js'),
    dest: resolve('packages/vue-template-compiler/build.js'),
    format: 'cjs',
    external: Object.keys(require('../packages/vue-template-compiler/package.json').dependencies)
  },
  // Web compiler (UMD for in-browser use).
  'web-compiler-browser': {
    entry: resolve('web/entry-compiler.js'),
    dest: resolve('packages/vue-template-compiler/browser.js'),
    format: 'umd',
    env: 'development',
    moduleName: 'VueTemplateCompiler',
    plugins: [node(), cjs()]
  },
  // Web server renderer (CommonJS).
  'web-server-renderer-dev': {
    entry: resolve('web/entry-server-renderer.js'),
    dest: resolve('packages/vue-server-renderer/build.dev.js'),
    format: 'cjs',
    env: 'development',
    external: Object.keys(require('../packages/vue-server-renderer/package.json').dependencies)
  },
  'web-server-renderer-prod': {
    entry: resolve('web/entry-server-renderer.js'),
    dest: resolve('packages/vue-server-renderer/build.prod.js'),
    format: 'cjs',
    env: 'production',
    external: Object.keys(require('../packages/vue-server-renderer/package.json').dependencies)
  },
  'web-server-renderer-basic': {
    entry: resolve('web/entry-server-basic-renderer.js'),
    dest: resolve('packages/vue-server-renderer/basic.js'),
    format: 'umd',
    env: 'development',
    moduleName: 'renderVueComponentToString',
    plugins: [node(), cjs()]
  },
  'web-server-renderer-webpack-server-plugin': {
    entry: resolve('server/webpack-plugin/server.js'),
    dest: resolve('packages/vue-server-renderer/server-plugin.js'),
    format: 'cjs',
    external: Object.keys(require('../packages/vue-server-renderer/package.json').dependencies)
  },
  'web-server-renderer-webpack-client-plugin': {
    entry: resolve('server/webpack-plugin/client.js'),
    dest: resolve('packages/vue-server-renderer/client-plugin.js'),
    format: 'cjs',
    external: Object.keys(require('../packages/vue-server-renderer/package.json').dependencies)
  },
  // Weex runtime factory
  'weex-factory': {
    weex: true,
    entry: resolve('weex/entry-runtime-factory.js'),
    dest: resolve('packages/weex-vue-framework/factory.js'),
    format: 'cjs',
    plugins: [weexFactoryPlugin]
  },
  // Weex runtime framework (CommonJS).
  'weex-framework': {
    weex: true,
    entry: resolve('weex/entry-framework.js'),
    dest: resolve('packages/weex-vue-framework/index.js'),
    format: 'cjs'
  },
  // Weex compiler (CommonJS). Used by Weex's Webpack loader.
  'weex-compiler': {
    weex: true,
    entry: resolve('weex/entry-compiler.js'),
    dest: resolve('packages/weex-template-compiler/build.js'),
    format: 'cjs',
    external: Object.keys(require('../packages/weex-template-compiler/package.json').dependencies)
  }
}


// 获取真正的rollup配置对象
function genConfig (name) {
  //接收一个参数name 通过builds[name]拿到对应的对象
  const opts = builds[name]
  //然后构造出一个新的config对象,这个config对象才是真正rollup所需要的配置结构
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}



if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  /**
   * 通过Object.keys拿到builds的key数组,然后调用genConfig函数
   * 获取到的所有真实的rollup配置对象
   */
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}


// 它经过 Rollup 的构建打包后，最终会在 dist 目录下生成 vue.runtime.common.js。