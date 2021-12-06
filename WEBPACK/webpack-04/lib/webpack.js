/*
 * @Author: 一尾流莺
 * @Description:手写简易版webpack
 * @Date: 2021-12-06 14:31:46
 * @LastEditTime: 2021-12-06 18:29:55
 * @FilePath: \webpack-04\lib\webpack.js
 */
const fs = require("fs")
const path = require("path")
const BabelParser = require('@babel/parser')
const traverse = require("@babel/traverse").default
const { transformFromAst } = require("@babel/core")

module.exports = class webpack {
  // 读取配置文件的信息
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modulesInfo = []
  }
  // 入口函数 执行模块编译
  run() {
    // 读取入口模块内容并编译入口模块
    const moduleParserInfo = this.parser(this.entry)
    // 把编译后的入口模块添加到 modulesInfo 中
    this.modulesInfo.push(moduleParserInfo)
    // 循环 modulesInfo , 判断是否有依赖
    for (let i = 0; i < this.modulesInfo.length; i++) {
      const element = this.modulesInfo[i];
      const { dependencies } = element
      if (dependencies) {
        for (const j in dependencies) {
          // 如果有依赖, 递归编译依赖
          if (Object.hasOwnProperty.call(dependencies, j)) {
            const dep = dependencies[j];
            this.modulesInfo.push(this.parser(dep))
          }
        }
      }
    }
    // 生成依赖图谱
    const obj = {}
    this.modulesInfo.forEach((item) => {
      obj[item.modulePath] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    // 生成 bundle 文件
    this.bundleFile(obj)
  }
  // 负责每个模块的编译工作 参数:接收一个模块的路径
  parser(modulePath) {
    // 1. 读取模块内容
    const content = fs.readFileSync(modulePath, "utf-8")
    // 2. 分析是否有依赖 提取依赖路径
    const ast = BabelParser.parse(content, { sourceType: "module" })
    // 保存依赖路径
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration: function({ node }) {
        // 将 ./other 加工为 ./src/other
        const newPath = `./` + path.join(path.dirname(modulePath), node.source.value).replace(/\\/g, '\/')
        dependencies[node.source.value] = newPath
      }
    })
    // 3. 编译模块生成chunk
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })
    return {
      modulePath,
      dependencies,
      code
    }
  }
  // 生成 bundle 文件
  bundleFile(obj) {
    const bundlePath = path.join(this.output.path, this.output.filename)
    const dependenciesInfo = JSON.stringify(obj)
    const content = `(function(modulesInfo){

      function require(modulePath){
         function newRequire(relativePath){
            return require(modulesInfo[modulePath].dependencies[relativePath])
         }
         const exports = {}
        (function(require,code){})(
          eval(code)
        )(newRequire,modulePath[modulePath].code)
        return exports
      }
      require("${this.entry}") // ./src/index.js
    })(${dependenciesInfo})`
    fs.writeFileSync(bundlePath, content, "utf-8")
  }
}