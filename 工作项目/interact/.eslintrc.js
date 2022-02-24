/*
 * @Description:
 * @Date: 2021-06-16 10:00:54
 * @LastEditTime: 2021-06-17 15:03:25
 * @FilePath: \interact\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //使用 JavaScript ES6，添加了一种新的语法，用于从数组索引或对象属性创建变量，称为解构。此规则强制使用解构而不是通过成员表达式访问属性。
    'prefer-destructuring': 'off',
    // 阴影是局部变量与其包含范围内的变量共享相同名称的过程
    'no-shadow': 'off',
    // 赋值给声明为函数参数的变量可能会引起误解，并导致混淆行为，因为修改函数参数也会使arguments对象变异。通常，对函数参数的赋值是意想不到的，并且指示错误或程序员错误。
    'no-param-reassign': 'off',
    //在 Node.js 中，使用该require()函数包含模块依赖关系，例如：
    //
    // var fs = require("fs");
    // 尽管require()可以在代码中的任何地方调用，但某些样式指南规定应该仅在模块的顶层调用它，以便更容易地识别依赖关系。例如，当它们深深嵌套在函数和其他语句中时，很难确定依赖关系：
    //
    // function foo() {
    //
    //     if (condition) {
    //         var fs = require("fs");
    //     }
    // }
    // 由于require()做了同步加载，因此在其他位置使用时可能会导致性能问题。
    //
    // 此外，ES6 模块强制要求import和export声明只能出现在模块主体的顶层。
    'global-require': 'off',
    // 组件导入的顺序，mix以后这个需要关闭
    'import/order': 'off',
    // 任何语言的非常长的代码行都很难阅读。为了提高可读性和可维护性，许多编码人员已经制定了将代码行限制为 X 个字符（传统上为80个字符）的约定
    'max-len': 'off',
    // 使用类型安全的相等运算符===而!==不是常规对==等运算符被认为是好的做法!=。
    // 这样做的原因是，==和!=做强制类型转换后面的相当晦涩抽象平等比较算法。
    eqeqeq: 'off',
    camelcase: 'off',
    radix: 'off',
    'prefer-promise-reject-errors': 'off',
    'no-plusplus': 'off',
    'no-useless-concat': 'off',
    'no-return-assign': 'off',
    'no-return-await': 'off',
    'no-restricted-syntax': 'off',
    'no-restricted-globals': 'off',
    'guard-for-in': 'off',
    'no-useless-escape': 'off',
    'consistent-return': 'off',
    'import/first': 'off',
    'no-mixed-operators': 'off',
    'import/extensions': 'off',
    'eol-last': "off",
    'no-empty-pattern': "off",
    'import/no-unresolved': "off",
    "space-before-function-paren": 0,
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
  },
};