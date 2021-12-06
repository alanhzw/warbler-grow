(function(modulesInfo){



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
      require("./src/index.js") // ./src/index.js
    })({"./src/index.js":{"dependencies":{"./other.js":"./src/other.js"},"code":"\"use strict\";\n\nvar _other = require(\"./other.js\");\n\nconsole.log(\"hello,webpack\".concat(_other.str));"},"./src/other.js":{"dependencies":{"b.js":"./src/b.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str = void 0;\n\nvar _b = require(\"b.js\");\n\n/*\n * @Author: 一尾流莺\n * @Description:\n * @Date: 2021-12-06 11:03:43\n * @LastEditTime: 2021-12-06 17:42:57\n * @FilePath: \\webpack-04\\src\\other.js\n */\nvar str = 'bundle'; // 1.是否有依赖 有依赖需要依赖的路径\n// 依赖路径是相对于入口的 而依赖图谱的路径是相对于根目录的\n// 2.编译模块 输出 chunk\n\nexports.str = str;"},"./src/b.js":{"dependencies":{"a.js":"./src/a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\n\nvar _a = require(\"a.js\");\n\n/*\n * @Author: 一尾流莺\n * @Description:\n * @Date: 2021-12-06 17:30:16\n * @LastEditTime: 2021-12-06 17:42:50\n * @FilePath: \\webpack-04\\src\\b.js\n */\nvar b = 'b';\nexports.b = b;"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\n\n/*\n * @Author: 一尾流莺\n * @Description:\n * @Date: 2021-12-06 17:30:11\n * @LastEditTime: 2021-12-06 17:30:12\n * @FilePath: \\webpack-04\\src\\a.js\n */\nvar a = 'a';\nexports.a = a;"}})